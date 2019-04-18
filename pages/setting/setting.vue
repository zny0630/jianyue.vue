<template>
	<view class="container">
		<view class="list">
			<view class="list-item"><text>文章推送</text></view>
			<view class="list-item"><text>新消息推送</text></view>
			<view class="list-item">
				<navigator url="../info/info">个人资料</navigator>
			</view>
		</view>
		<button  @tap="logout" class="green-btn">退出当前账号</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '设置'
		});
	},
	methods: {
		logout: function() {
			console.log('log out');
			uni.removeStorageSync('login_key');
			uni.showToast({
				title: '已经退出当前账号'
			});
			uni.navigateBack();
		}
	}
};
</script>

<style>
	.huiyuan{
		margin-left: 30upx;
		width: 120upx;
		height: 120upx;
		border-radius: 5px;
	}
	.list-item{
		align-content: center;
		padding-top: 20px;
		/* margin-top: 10px; */
	}
	.green-btn{
		background: linear-gradient(40deg, #ffd86f, #fc6262);
	}
</style>