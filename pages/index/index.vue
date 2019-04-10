<template>
	<view class="content">
		<scroll-view class="tab-title " scroll-x="true" id="tab-title">
			<view v-for="(tab, index) in tabs" :key="index"
				:class="[tabCurrentIndex == index ? 'tab-current' : 'tabpage']"
				:id="'tabTag-' + index"
				@tap="tabChange"
			>
				{{ tab.name }}
			</view>
		</scroll-view>
		
		<view class="article-box">
			<view class="article" v-for="(article,index1) in articles" :key="index1">
				<text class="article-title" @tap="gotoDetail(article.id)">{{article.title}}</text>
				<!-- 大于三张 -->
				<view class="" v-if="article.imgs.length >=3">
					<view class="thumbnail-box">
						<view class="thumbnail-item" v-for="(item,index) in article.imgs" :key="index" >
							<image :src="item.imgUrl">
							</image>
						</view>
					</view>
				</view>
				<!-- 小于三张 -->
				<view class="" v-else-if="article.imgs.length <=3">
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
					<text>{{article.title}}</text>
				</view>
				<!-- 文章作者等信息 -->
				<view class="article-info">
					<image :src="article.avatar" class="avatar small"></image>
					<text class="info-text">{{article.nickname}}</text>
					<text class="info-text">{{ handleTime(article.createTime) }}</text>
				</view>
				<hr>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				titleShowId: 'tabTag-0',
				tabHeight: 300,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{ name: '推荐', id: 'pwd1', loadingType: 0, page: 1 },
					{ name: '转载', id: 'pwd2', loadingType: 0, page: 1 },
					{ name: '个人', id: 'pwd3', loadingType: 0, page: 1 }
				],
				showKeyboard: false,
				articles: []
			}
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
						'content-type': 'application/x-www.form-urlencoded'
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
			handleTime: function(datetime) {
				let date = new Date(datetime);
				let Y = date.getFullYear() + '-';
				let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
				let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
				let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
				let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
				let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				return Y + M + D + h + m + s;
			},
			handleContent: function(msg) {
				let description = msg;
				description = description.replace(/(\n)/g, "");
				description = description.replace(/(\t)/g, "");
				description = description.replace(/(\r)/g, "");
				description = description.replace(/<\/?[^>]*>/g, "");
				description = description.replace(/\s*/g, "");
				return description;
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		
	}
	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	.add-title {
		/* float: right; */
		width: 15%;
		position: absolute;
		right: 0px;
		bottom: 0px;
	}
	hr{
		
	}
	.article{
		display: flex;
		flex-direction: column;
		border-bottom: 1upx solid #EEEEEE;
		margin-top: 15px;
		padding-bottom: 15px;
		
	}
	.article-title{
		font-weight:bold;
		margin-right: 85%;
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
		width: 220upx;
		height: 220upx;
		margin-left: 25upx;
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
		width: 80%;
		height: 80%;
	}
	.right image{
		width: 90%;
		height: 200upx;
	}
	.article-info{
		color: grey;
		width: 100%;
		margin-left: -180upx;
		margin-top: 10px;
	}
	.avatar{
	width: 75upx;
	height: 75upx;
	border-radius: 50%;
		
	}
	
	/* 选项卡 */
	.tab{padding:0;}
	/* 导航栏整体设置 */
	.tab-title {white-space:nowrap; /* text-align:center; */}
	/* 导航栏文字梳理 */
	.tab-title view{width:auto; padding:0 8px; margin:0 8px; line-height:42px; display: inline-block; text-align:center;font-size:40upx;}
	/* .tab-title view:first-child{margin-left: 0;}
	.tab-title view:last-child{margin-right: 0;} */
	/* 导航栏底部下划线设置 */
	
</style>
