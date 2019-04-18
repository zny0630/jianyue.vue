<template>
	<view class="container">
		<view class="sign-box">
			<input
				class="uni-input top"
				type="number"
				placeholder="输入手机号"
				v-model="mobile"
				required="required"
			/>
			<button v-show="show" class="btn" @click="getCode"  @tap="getVerifyCode">获取验证码</button>
			<button v-show="!show" class="count">{{ count }}</button>
		</view>
		<input
			class="uni-input bottom"
			type="number"
			placeholder="输入验证码"
			v-model="verifyCode"
			required="required"
		/>
		<button @tap="checkCode" class="green-btn">下一步</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mobile: '',
			verifyCode: '',
			show: true,
			count: '',
			timer: null
		};
	},
	onLoad() {},
	methods: {
		getCode() {
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.show = false;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						this.show = true;
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000);
			}
		},
		getVerifyCode: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/user/verify',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					mobile: _this.mobile
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '验证码已发送'
						});
						_this.disabled = true;
						console.log(_this.disabled);
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.msg
						});
					}
				}
			});
		},
		checkCode: function() {
			var _this = this;
			console.log(_this.verifyCode);
			uni.request({
				url: this.apiServer + '/user/check',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					mobile: _this.mobile,
					verifyCode: _this.verifyCode
				},
				success: res => {
					console.log(res.data);
					if (res.data.code === 0) {
						uni.navigateTo({
							url: '../password/password?mobile=' + _this.mobile
						});
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.msg
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.sign-box {
	display: flex;
	align-items: center;
}
.green-btn{
	color: #FFFFFF;
	margin-top: 15px;
	text-align: center;
	background: linear-gradient(40deg, #ffd86f, #fc6262);
	}
.uni-input{
	border-bottom: 1px solid #EEEEEE;
	font-size: 18px;
	height: 50px;
}
.btn{
	width: 160px;
	float: right;
	height: 40px;
	background: rgb(65,168,99);
	color: #FFFFFF;
	text-align: center;
}


</style>