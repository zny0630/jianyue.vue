<template>
	<view class="container">
		<view class="article-box">
			<view class="article" v-for="(article,index) in articles" :key="index">
				<!-- 标题 -->
				<text class="article-title" @tap="gotoDetail(article.id)">{{article.title}}</text>
				<!-- 大于等于三张图片的显示方式 -->
				<view class="" v-if="article.imgs.length >= 3">
					<view class="thumbnail-box">
						<view class="thumbnail-item" v-for="(item,index1) in article.imgs" :key="index1" v-if="index1<3">
							<image :src="item.imgUrl"></image>
						</view>
					</view>
				</view>
				<!-- 小于三张图片的显示方式 -->
				<view class="" v-else-if="article.imgs.length >= 1">
					<view class="text-img-box">
						<view class="left">
							<text>{{handleContent(article.content)}}</text>
						</view>
						<view class="right">
							<image :src="article.imgs[article.imgs.length - 1].imgUrl"></image>
						</view>
					</view>
				</view>
				<!-- 没有图片的显示方式 -->
				<view class="text-box" v-else>
					<text>{{handleContent(article.content)}}</text>
				</view>
				<!-- 文章作者等信息 -->
				<view class="article-info">
					<image :src="article.avatar" class="avatar small"></image>
					<text class="info-nickname">{{article.nickname}}</text>
					</br>
					<text class="info-text">{{article.createTime}}</text>
				</view>
			</view>
		</view>
		
		<!-- <view>这里还什么都没有哦~</view>
		<view>点击右下角按钮写第一篇文章~</view> -->
		<navigator url="../write/write" hover-class="navigator-hover">
			<button class="circle-btn"><text class="icon-text">+</text></button>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articles: []
			};
		},
		onLoad: function() {
			this.getArticles();
		},
		onShow: function() {},
		onPullDownRefresh: function() {
			this.getArticles();
		},
		methods: {
			getArticles: function() {
				var _this = this;
				uni.request({
					url: this.apiServer + '/article/list',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						_this.articles = res.data.data;
					},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},
			gotoDetail: function(aId) {
				uni.navigateTo({
					url: '../article_detail/article_detail?aId=' + aId
				});
			},
			handleTime: function(date) {
				var d = new Date(date);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
				var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
				var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
				var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			},
			handleContent:function(content){
				content=content.replace(/(\n)/g, "");
				content=content.replace(/(\t)/g, "");
				content=content.replace(/(\r)/g, "");
				content=content.replace(/<\/?[^>]*>/g, "");
				content=content.replace(/\s*/g, "");
				return content.substring(0,20);
				
			}
		}
	};
</script>

<style scoped>
.article{
		display: flex;
		flex-direction: column;
		border-bottom: 2px solid #EEEEEE;
		margin-top: 15px;
		padding-bottom: 15px;
	}
	.avatar-box{
		display: flex;
		flex-direction: row;
	}
	.article-title{
		font-weight: 900;
		margin-bottom: 5px;
	}
	.text-img-box{
		display: flex;
		flex-direction: row;
	}
	.thumbnail-box{
		display: flex;
		flex-direction: row;
	}
	.thumbnail-item image{
		width: 250upx;
		height: 240upx;
		margin-left: 7px;
	}
	.left{
		flex: 1 1 60%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		overflow: hidden;
	}
	.right{
		flex: 1 1 100%;
		width: 100%;
		height: 100%;
	}
	.right image{
		width: 100%;
		height: 250upx;
	}
	.article-info{
		color: grey;
		width: 100%;
		margin-left: 10upx;
		margin-top: 10px;
	}
	.avatar{
		width: 75upx;
		height: 75upx;
		border-radius: 50%;
		
	}
	.info-text{
		margin-left: 10px;
	}
.circle-btn {
		position: fixed;
		width: 45px;
		height:45px;
		right: 10px;
		bottom: 20px;
		border-radius: 50%;
		background-color: #de533a;
		background: linear-gradient(40deg, #ffd86f, #fc6262);
		box-shadow: 2px 5px 10px #D1D1D1;
		cursor: pointer;
		border: none;
		outline: none;
		display: flex;
		justify-content: center;
		align-items: center;

	}
.icon-text {
		font-size: 20pt;
		color: #fff;
	}


</style>
