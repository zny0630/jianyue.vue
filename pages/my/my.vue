<template>
	<view class="container">
		<!-- 顶部头像和昵称区域，纵向排列 -->
		<view class="top">
			<view class="avatar-box">
				<image src="../../static/default.png" mode="scaleToFill" class="avatar" v-if="!storageData.login"></image>
				<image :src="avatar" mode="scaleToFill" class="avatar" v-if="storageData.login"></image>
			</view>
			<view class="info-box">
				<navigator url="../signin/signin" v-if="!storageData.login">点击登录</navigator>
				<text v-if="storageData.login">{{ nickname }}</text>
				<navigator url="../setting/setting" v-if="storageData.login"><text class="setting-txt">个人设置</text></navigator>
				
		<graceMaskView :show="show" bgcolor="#FFFFFF" v-on:close="closeBanner" >
			<view class="signIn" @click="showSignIn = true"><text class="setting-txt">签到</text></view>
		</graceMaskView>
				
			</view>
		</view>
		


		<!-- 中间文章数量、好友数量、消息数量等统计区域，横向排列 -->
		<view>
			<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
				<view
					v-for="(cate, index) in categories"
					:key="index"
					:data-cateid="cate.cateid"
					:data-index="index"
					:class="[cateCurrentIndex == index ? 'grace-tab-current' : '']"
					@tap="tabChange"
				>
					{{ cate.name }}
				</view>
			</scroll-view>
			<view class="demo-content">
				<!-- 文章部分 -->
				<view class="content" v-if="cateCurrentIndex === 0">
					<view class="list">
						<view class="list-item" v-for="(article, index) in articles" :key="index">
							<text @tap="gotoDetail(article.id)">{{ article.title }}</text>
						</view>
						
						
					</view>
				</view>
				<!-- 关注部分 -->
				<view class="content" v-if="cateCurrentIndex === 1">
					<view class="list">
						<view class="list-item" v-for="(follow, index) in follows" :key="index">
							<image :src="follow.avatar" class="avatar small"></image>
							<text style="margin-left: 20px;font-size: 10px;">{{ follow.nickname }}</text>
						</view>
					</view>
				</view>
				<!-- 喜欢部分 -->
				<view class="content" v-if="cateCurrentIndex === 2">
					<view class="list">
						<view class="list-item" v-for="(like, index) in likes" :key="index">
							<!-- <image :src="like.avatar" class="avatar1 small"></image> -->
							<text style="margin-left: 20px;" @tap="gotoDetail1(like.aId)">{{ like.title }}</text>
						</view>
					</view>
				</view>

				<!-- 粉丝部分 -->
				<view class="content" v-if="cateCurrentIndex === 3"><text>积分</text></view>
			</view>
		</view>
		
		<view class="popup-box" v-if="showSignIn" @click="showSignIn=false">
			<view class="popup-signIn">
				<image class="popup-image" src="../../static/signInSuccess.png" mode=""></image>
				<text class="popup-text">恭喜您获得{{point}}积分</text>
			</view>
		</view>
	</view>
</template>

<script>
var loginRes, _self;
export default {
	data() {
		
		return {
			storageData: {},
			avatar: '',
			nickname: '',
			//分类信息
			categories: [{ cateid: 0, name: '文章' }, { cateid: 1, name: '关注' }, { cateid: 2, name: '收藏' }, { cateid: 3, name: '积分' }],
			// 当前选择的分类
			cateCurrentIndex: 0,
			articles: [],
			follows: [],
			likes:[],
			showSignIn:false,
			point:10
		};
},

	onLoad: function() {},
	onShow: function() {
		var _this = this;
		const loginKey = uni.getStorageSync('login_key');
		if (loginKey) {
			this.storageData = {
				login: loginKey.login,
				nickname: loginKey.nickname,
				avatar: loginKey.avatar,
				userId: loginKey.userId
			};
			uni.request({
				url: this.apiServer + '/article/user',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.storageData.userId
				},
				success: res => {
					_this.articles = res.data.data;
				}
			});
			 uni.request({
				url: this.apiServer + '/follow/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.storageData.userId
				},
				success: res => {
					_this.follows = res.data.data;
				}
			});
			uni.request({
				url: this.apiServer + '/like/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					uId: this.storageData.userId
				},
				success: res => {
					_this.likes = res.data.data;
				}
			});
		} else {
			this.storageData = {
				login: false
			};
		}
		uni.request({
			url: 'http://172.20.10.6:8080/api/user/' + uni.getStorageSync('login_key').userId,
			method: 'GET',
			header: { 'content-type': 'application/json' },
			success: res => {
				if (res.data.code === 0) {
					console.log(res.data.data.avatar+'————————————');
					_this.avatar = res.data.data.avatar;
					_this.nickname = res.data.data.nickname;
				}
			}
		});

		
	},
	
	methods: {
// 		siginIn(){
// 			this.showSignIn = true
// 		},

		tabChange: function(e) {
			// 选中的索引
			var index = e.currentTarget.dataset.index;
			// 具体的分类id
			var cateid = e.currentTarget.dataset.cateid;
			this.cateCurrentIndex = index;
			// 动态替换内容
			this.content = this.categories[index].name;
		},
		gotoDetail: function(aId) {
			uni.navigateTo({
				url: '../article_detail/article_detail?aId=' + aId + '&uId=' + this.storageData.userId
			});
		},
		gotoDetail1: function(aId) {
			uni.navigateTo({
				url: '../article_detail/article_detail?aId=' + aId 
			});
		}
	}
};
</script>



<style scoped>
	.popup-box{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.4);
	}
	.popup-signIn{
		position: relative;
		width: 90%;
		margin: 50px auto;
		background: white;
	}
	.popup-image{
		width: 100%;
		height: 240px;
	}
	.popup-text{
		position: absolute;
		top: 180px;
		left: 85px;
		font-size: 16px;
	}
.signIn{
	width: 50px;
	height: 25px;
	color: #00C777;
	border-radius: 10px;
	margin-left: 8px;
	margin-top: 10px;
}
.top {
	display: flex;
	flex-direction: column;
	text-align: center;
	height: 100px;
	margin-top: 5px;
}
.avatar-box {
	flex: 1 1 30%;
}
.info-box {
	flex: 1 1 70%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.setting-txt {
	color: #00b26a;
	margin-left: 15px;
}
.center {
	display: flex;
	justify-content: center;
}
.info {
	flex: 1 1 25%;
	display: flex;
	flex-direction: column;
	text-align: center;
	border-right: 1px solid #eee;
}
.title {
	font-size: 14pt;
}
.content {
	margin-top: 20px;
}
.list image{
	width: 25px;
	height: 25px;
}
</style>
