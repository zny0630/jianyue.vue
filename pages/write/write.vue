<template>
	<view class="container">
		
		<view class="write">
			<!-- 文章标题输入框，和title变量绑定 -->
			<textarea v-model="title" placeholder="请输入标题" class="write-title"/>
			<!-- 选择图片的按钮，点击触发chooseImg方法 -->
			<image src="../../static/tupian.png" @tap="chooseImg" class="add-btn"></image>
		</view>
		<!-- 文章内容输入的多行文本域，绑定content变量 -->
		<textarea placeholder="请输入内容" v-model="content" class="content" />
		<text>预览</text>
		<!-- 使用graceUI的富文本解析功能，来预览文章内容 -->
		<view class="grace-text">
				<rich-text :nodes="content" bindtap="tap"></rich-text>
		</view>
		<button class="green-btn" @tap="postArticle">发布文章</button>
	</view>
</template>

<script>
	export default {
	data() {
		      return {
			title: '',
			content: '',
			userId: uni.getStorageSync('login_key').userId,
			imgs: []
		};

	},
	onLoad() {
	},
	methods: {
		chooseImg: function() {
			var _this = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths));
					uni.uploadFile({
						url: _this.apiServer + '/upload',
						filePath: res.tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							//图片上传成功，回显图片地址
							console.log(uploadFileRes.data);
							//将图片地址加入imgs数组
							_this.imgs.push(uploadFileRes.data);
							//将图片地址拼接HTML标签，加入文章内容
							_this.content += '<img src="' + uploadFileRes.data + '" width = "100%"/>';
						}
					});
				}
			});
		},
		postArticle: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/article/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					uId: this.userId,
					title: this.title,
					content: '<div>' + this.content + '</div>'
				},
				success: res => {
					if (res.data.code === 0) {
						//获得发布文章成功返回的文章id
						var aId = res.data.data;
						console.log(aId);
						uni.showToast({
							title: '发布成功'
						});
						//将文章id和文章对应的图片地址数组传到后台，存入数据库
						uni.request({
							url: this.apiServer + '/img/add',
							method: 'POST',
							header: { 'content-type': 'application/x-www-form-urlencoded' },
							data: {
								aId: aId,
								imgs: JSON.stringify(_this.imgs)  //序列化imgs数组
							},
							success: res => {
								if (res.data.code === 0) {
									console.log('文章图片地址已写入数据库');
								}
							}
						});
						uni.switchTab({
							url: '../index/index'
						});
					}
				}
			});
		}
	}
};
</script>

<style scoped>
	.write{
		width: 95%;
		margin: auto;
		display: flex;
		justify-content: space-between;
	}
	.write-title{
		flex: 1 1 80%;
		padding-top: 10px;
		border-bottom: 1px dotted #C1C1C1;
		height: auto;
	}
	.add-btn{
		width: 50px;
		height: 55px;
		margin-right: 5px;
		color: #CCCCCC;
	}
	
	.content{
		height: 100px;
		width: 95%;
		margin: auto;
		padding: 10px;
	}
	.grace-text{
		margin-top: 10px;
	}
	.green-btn{
		margin-top: 20px;
		width: 60%;
		background: linear-gradient(40deg, #ffd86f, #fc6262);
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>
