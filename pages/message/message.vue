<template>
	<view class="container">
		<view class="header">
			<image src="../../static/avatar.jpg"></image>
			<view class="header_message">
				<view class="header_author">
					<text>1只念旧的兔子</text>
					<text class="grade">Lv 1 城市平民 </text>
				</view>
				<view class="header_attention">
					<text>0</text>
					<text class="grade1">排名 </text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="img">
				<view class="img1">
					<text style="font-size: 15px;" class="text">简阅钻余额</text>
					<text style="font-size: 20px;" class="text">10.000</text>
					<text style="font-size: 12px;" class="text">约等于人民币0元</text>
					<button class="btn">钻转贝</button>
				</view>
			</view>
			<view class="task">
			<navigator url="my_love" hover-class="navigator-hover">
				<view class="task1">
					<image src="../../static/task.png"></image>
					</br>
					<text class="text1">任务中心</text>
				</view>
				</navigator>
				
				<view class="task2">
					<image src="../../static/head.png"></image>
					<text class="text1">买会员送钻</text>
				</view>
				<view class="task3">
					<image src="../../static/toward.png" ></image>
					<text class="text1">排行榜</text>
				</view>
			</view>
			<view class="drill">
				<view class="drill_message">
					<text style="font-size: 15px; margin-top: 10px; ">你有10简书钻待领取</text>
					<text style="font-size: 10px; color: #8F8F94;">绑定手机号的微信号后可领取</text>
				</view>
				<view class="drill_btn">
					<button  class="btn1">去领取</button>
				</view>
			</view>
			<view class="bottom">
				<view class="bottom_message">
					<text>微信扫码添加小管家</text>
					<text>回复关键词[简书钻]立刻进群</text>
				</view>
				<view class="img2">
					<image src="../../static/erweima.jpg"></image>
				</view>
				<view class="bottom_message">
					<text style="color: #FF0000;font-size: 12px;">长按图片保存</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style scoped>
	.container{
		display: flex;
		flex-direction: column;
		height: 0 auto;
	}
	.header{
		display: flex;
		height: 100px;
	}
	.header image{
		flex: 1 1 15%;
		height: 50px;
		border-radius: 50%;
		margin-top: 35px;
		margin-left: 20px;
	}
	.header_message{
		display: flex;
		justify-content: space-between;
		flex: 1 1 80%;
		margin-top: 35px;
		margin-left:15px;
	}
	.header_author{
		display: flex;
		flex-direction: column;
	}
	.header_attention{
		display: flex;
		flex-direction: column;
	}
	.header_attention image{
		width: 5px;
		height: 10px;
	}
	.grade{
		margin-top: 5px;
		font-size: 11px;
		color: red;
		margin-left: 5px;
	}
	.grade1{
		margin-top: 5px;
		font-size: 11px;
		color: #8F8F94;
		margin-right: 20px;
	}
	.img{
		display: flex;
		width: auto;
		height: 160px;
		margin-top: 10px;
		margin-left: 20px;
	}
	.img1{
		width: 300px;
		background:rgb(234,119,105);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}
	.text{
		margin-left: 20px;
		line-height: 20px;
		color: #FFFFFF;
		margin-top: 10px;
	}
	.btn{
		margin-left: 20px;
		border-radius: 20px;
		color: rgb(234,119,105);
		width: 130px;
		height: 40px;
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 15px;
	}
	.task{
		display: flex;
		height: 100px;
		margin-top: 20px;
	}
	.task1{
		display: flex;
		flex-direction: column;
		flex: 1 1 20%;
		margin-left: 35px;
		margin-top: 10px;
	}
	.task1 image{
		width: 30px;
		height: 30px;
		margin-left: 10px;
	}
	.task2{
		display: flex;
		flex-direction: column;
		flex: 1 1 20%;
		margin-left: 25px;
		margin-top: 10px;
	}
	.task2 image{
		width: 30px;
		height: 30px;
		margin-left: 10px;
	}
	.task3{
		display: flex;
		flex-direction: column;
		flex: 1 1 20%;
		margin-left: 25px;
		margin-top: 10px;
	}
	.task3 image{
		width: 30px;
		height: 30px;
		margin-left: 10px;
	}
	.text1{
		margin-top: 15px;
		font-size: 13px;
		left: 25px;
	}
	.drill{
	     margin: auto;
		 width: 90%;
		 height:70px;
		background: rgb(250,250,250);
		 display: flex;
		 justify-content: space-between;
		 border-radius: 10px;
	}
	.drill_message{
		display: flex;
		flex-direction: column;
		line-height: 20px;
		margin-left: 15px;
	}
	.btn1{
		width: 80px;
		line-height: 30px;
		border-radius: 20px;
		color: white;
		background: rgb(234,119,105);
		margin-right: 10px;
		margin-top: 20px;
		font-size: 15px;
	}
	.bottom{
		display: flex;
		flex-direction: column;
		text-align: center;
		margin-top: 20px;
		width: 90%;
		margin: 0 auto;
	}
	.bottom_message{
		display: flex;
		flex-direction: column;
		line-height: 25px;
		font-size: 15px;
	}
	.img2{
		width: 150px;
		height: 150px;
		margin-left: 90px;
	}
	.img2 image{
		width: 100%;
		height: 100%;
		margin-left: -80px;
	}
</style>
