<template>
	<view class="container">
		<text class="article-title">{{ article.title }}</text>
		<view class="article-info">
			<image :src="article.avatar" class="avatar small"></image>
			<text class="nickname1">{{ article.nickname }}</text>
			<text class="info-text">{{ handleTime(article.createTime) }}</text>
			<!-- 登录用户和文章作者不是同一个人，就显示关注或取消关注按钮 -->
			<button v-if="userId != article.uId && !followed" class="green-btn follow-btn" @tap="follow">关注</button>
			<button v-if="userId != article.uId && followed" class="green-btn follow-btn cancel" @tap="cancelFollow">取消</button>
		</view>
                     
		<view class="grace-text" style="margin-top: 10px;"><rich-text :nodes="article.content" bindtap="tap"></rich-text></view>
		<button v-if="userId != article.uId && !liked" class="like-btn" @tap="like">收藏 </button>
		<button  v-if="userId != article.uId && liked" class="like-btn" @tap="cancelLike">取消</button>

		
		<text class="info-text">评论{{ comments.length }}</text>
		<view class="comment-item" v-for="(comment, index) in comments" :key="index">
			<view class="left"><image :src="comment.avatar" class="avatar small"></image></view>
			<view class="right">
				<text class="nickname">{{ comment.nickname }}</text>
                </br>
				<text>{{ comment.content }}</text>
				<view>
					<text style="margin-right: 10px;">{{ comments.length - index }}楼</text>
					</br>
					<text>{{comment.commentTime}}</text>
				</view>
			</view>
		</view>
		<input class="uni-input comment-box" type="text" placeholder="写下你的评论" v-model="content" required="required" />
		<button class="green-btn" @tap="send">提交</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			article: {
				aId: 0,
				uId: 0,
				title: '',
				content: '',
				avatar: '',
				nickname: '',
				createTime: ''
			},
			comments: [],
			content: '',
			userId: uni.getStorageSync('login_key').userId,
			followed: false,
			liked:false,
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.article.aId = option.aId;
	},
	onShow: function() {
		this.getArticle();
	},
	onPullDownRefresh: function() {
		this.getArticle();
	},
	methods: {
		getArticle: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/article/' + this.article.aId,
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.userId
				},
				success: res => {
					// console.log(res.data.data.article);
					_this.article.aId = res.data.data.article.id;
					_this.article.uId = res.data.data.article.uid;
					_this.article.title = res.data.data.article.title;
					_this.article.content = res.data.data.article.content;
					_this.article.nickname = res.data.data.article.nickname;
					_this.article.avatar = res.data.data.article.avatar;
					_this.article.createTime = res.data.data.article.createTime;
					_this.comments = res.data.data.comments;
					if (res.data.data.followed === '已关注') {
						_this.followed = true;
					}
					if(re.data.data.liked==='已喜欢'){
						_this.liked=true;
					}
					
				},
				complete: function() {
					uni.stopPullDownRefresh();
				}
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
		send: function() {
			console.log('评论人编号：' + this.userId + ',文章编号：' + this.article.aId + '，评论内容：' + this.content);
			uni.request({
				url: this.apiServer + '/comment/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					aId: this.article.aId,
					uId: this.userId,
					content: this.content
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '评论成功'
						});
						this.getArticle();
						this.content = '';
					}
				}
			});
		},
		follow:function(){
			uni.request({
				url: this.apiServer + '/follow/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.userId,
					toUId: this.article.uId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '关注成功'
						});
						this.followed = true;
					}
				}
			});
			
			
		},
		like: function() {
				uni.request({
					url: this.apiServer + '/like/add',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						uId: this.userId,
						aId: this.article.aId
					},
					success: res => {
						if (res.data.code === 0) {
							uni.showToast({
								title: '收藏成功'
							});
							this.liked = true;
						}
					}
				});
			},
			cancelFollow: function() {
				uni.request({
					url: this.apiServer + '/follow/cancel',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						fromUId: this.userId,
						toUId: this.article.uId
					},
					success: res => {
						if (res.data.code === 0) {
							uni.showToast({
								title: '已取消关注'
							});
							this.followed = false;
						}
					}
				});
			},
			cancelLike: function() {
				uni.request({
					url: this.apiServer + '/like/cancel',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						uId: this.userId,
						aId: this.article.aId
					},
					success: res => {
						if (res.data.code === 0) {
							uni.showToast({
								title: '已取消收藏'
							});
							this.liked = false;
						}
					}
				});
			}
		}
	};

</script>

<style>
	.container {
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.article-title {
		font-weight: bold;
		text-align: center;
		font-size: 15px;
	}

	.article-info {
		color: grey;
		display: flex;
		justify-content: space-between;
		margin-top: 5px;
	}

	.avatar {
		border-radius: 50%;
		width: 75upx;
		height: 75upx;
	}

	.comment-item {
		display: flex;
		margin-top: 15upx;
	}

	.comment-box {
		margin-top: 20px;
	}

	.left {
		margin-top: 50upx;
	}

	.right {
		margin-left: 40upx;
		color: grey;
	}

	.info-text {
		margin-left: 5px;
		color: #000000;
	}

	.green-btn {
		border-radius: 10px;
		margin-top: 20px;
        background: linear-gradient(40deg, #ffd86f, #fc6262);
		color: #EEEEEE;
		width: 95%;
	}
	.like-btn {
		width:10px;
		height: 40px;
		border-radius: 10px;
		margin-top: 20px;
	    background: linear-gradient(40deg, #ffd86f, #fc6262);
		color: #EEEEEE;
		width: 95%;
	}
	

	.article-nickname {
		margin-left: 10px;
		color: #000000;
	}

	.follow-btn {
		height: 33px;
		width: 80px;
		font-size: 12pt;
		text-align: center;
		padding-bottom: 20px;
		margin-right: 0px;
	}

	.comment-content {
		color: black;
	}
	.nickname{
		color:#000000;
		font-family: 楷体;
		font-size: 15px;
	}
	.nickname1{
		color:#000000;
		font-family: 黑体;
		font-size: 15px;
		margin-right: 20%;
	}

</style>
