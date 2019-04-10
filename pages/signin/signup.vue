<template>
	<view class=" container">
		<!-- <text class="mobilenum">请输入手机号:</text> -->
		<view class="call-num">
			<input class="uni-input" 
			type="number" 
			placeholder="输入手机号" 
			v-model="mobile" 
			required="required" />
			</view>

		<!-- <view class="mobile-input">
			<text>请输入手机验证码:</text>
			<button class="message" @tap="getVerifyCode">获取验证码</button>
		</view> -->
		<view class="auth-code">
			<view class="left"><input class="uni-input" type="text" placeholder="输入验证码" v-model="verifyCode" required="required" /></view>
			<view class="right">
				<button v-show="show" class="message" @tap="getVerifyCode">获取验证码</button>
				<button v-show="!show" class="message">{{ count }}s后重新获取</button>
			</view>
		</view>

		<button type="primary" @tap="checkCode">下一步</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: true,
			count: '',
			timer:null,

			mobile: '',
			verifyCode: ''
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '新用户注册'
		});
	},
	methods: {
		getVerifyCode: function() {
			const TIME_COUNT = 60;

			var _this = this;
			uni.request({
				url: this.apiServer + '/user/verify',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
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
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					mobile: _this.mobile,
					verifyCode: _this.verifyCode
				},
				success: res => {
					console.log(res.data);
					if (res.data.code === 0) {
						uni.navigateTo({
							url: '../signin/password?mobile=' + _this.mobile
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

<style scoped>
input {
	height: 50px;
	border-bottom: 1px solid #eee;
	margin-bottom: 5px;
}

.mobile-input {
	display: flex;
	height: 50px;
	border-bottom: 1px solid #eee;
}

.message {
	width: 150px;
	background-color: rgb(26, 160, 52);
	height: 47px;
	color: #ffffff;
	outline: none;
}
.auth-code{
	display: flex;
	justify-content: center;
}


</style>
