<!-- <template>
	<view class="container">
		<view class="list-item list-item-heigher">
			<view class="left">昵称</view>
			<input type="text" placeholder="{{nickname}}" v-model="this.nickname"/>
		    </view>
			<button @click="addCourse(course)" class="btn">修改</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nickname:''
			};
		},
		onLoad() {
			},
			onShow:function() {
					var _this = this;
				const loginKey = uni.getStorageSync('login_key');
				
				if (loginKey) {
					// console.log(loginKey);
					this.storageData = {
						login: loginKey.login,
						nickname: loginKey.nickname,
						avatar: loginKey.avatar
					};
				}else{
					this.storageData ={
						login: false
					};
				}
				uni.request({
					url: 'http://localhost:8080/api/user/' + uni.getStorageSync('login_key').userId,
					method: 'GET',
					header: { 'content-type': 'application/json' },
					success: res => {
						if (res.data.code === 0) {
							
							_this.nickname = res.data.data.nickname;
						}
					}
				});
				
			},
			updateName: function(user) {
				var _this = this;
				user.nickname = this.nickname;
				this.$http({
					method: 'post',
					url: 'http://localhost:8080/api/user',
					data: {
						nickname:'this.nickname'
					}
				})
			}
				
		
	}
</script>

<style>
</style>
 -->
 <template>
		<view class="uni-flex uni-column container">
		<input
			class="uni-input"
			type="text"
			value=""
			placeholder="请修改"
			v-model="renickname"
			required="required"
		/>
		<button class="green-btn" @tap="changeNickname(renickname)">确认修改</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			renickname:'',
		};
	},
	onLoad() {
	},
	methods: {
		changeNickname: function(renickname) {
			
			var _this = this;
           
			uni.request({
				url:  this.apiServer+'/user/nickname?id='+uni.getStorageSync('login_key').userId,
				method: 'put',
				data:renickname,
				header: { 'content-type': 'application/json' },
				success: res => {
					uni.navigateBack();
				}
			});
		}
	}
};
</script>

<style>
input {
	height: 50px;
	border-bottom: 1px solid #eee;
	margin-bottom: 5px;
}
</style>