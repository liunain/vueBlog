<template>
	<div id="isLogin">
		<span @click='toWriteBlog'>写博客</span>
		<span @click='toUpload'>传资源</span>
	    <el-dropdown>
		      <span class="el-dropdown-link">
		        <img src="https://coding.net/static/project_icon/scenery-5.png">
		        <i></i>
		      </span>
		      <el-dropdown-menu slot="dropdown" class='dropdown'>
			        <el-dropdown-item>
			        	<router-link to='/personalCenter'>个人中心</router-link>
			        </el-dropdown-item>
			        <el-dropdown-item>
			        	<router-link to='/article'>我的博客</router-link>
			        </el-dropdown-item>
			        <el-dropdown-item>
			        	<router-link to='/'>权限申请</router-link>
			        </el-dropdown-item>
			        <el-dropdown-item>消息</el-dropdown-item>
			        <el-dropdown-item>账号设置</el-dropdown-item>
			        <el-dropdown-item>
			        	<router-link to='/'>退出登录</router-link>
			        </el-dropdown-item>
		      </el-dropdown-menu>
	    </el-dropdown>
	<!-- 	<ul>
			<li><router-link to=''>个人中心</router-link></li>
			<li><router-link to=''>我的博客</router-link></li>
			<li><router-link to=''>权限申请</router-link></li>
			<li><router-link to=''>消息</router-link></li>
			<li><router-link to=''>账号设置</router-link></li>
			<li><router-link to=''>退出登录</router-link></li>
		</ul> -->
	</div>
</template>

<style lang="scss" scoped>
#isLogin{
	display: flex;
	span{
		line-height: 58px;
		padding: 0 5px;
		color: #5383b2;
		img{
			width: 40px;
			height: 40px;
			border-radius: 20px;
			margin-top: 10px;
		}
		&:hover{
			cursor: pointer;
		}
	}
	ul{
		position: relative;
		margin-top: 78px;
	}
}
.el-dropdown-menu{
	width: 10%;
	right:10%;

	.el-dropdown-menu__item{
		a{
			color: #606266;
		}
	}
}
</style>

<script>
// import registerBox from '../../register/registerBox';

export default {
    name: 'isLogin',
    data: () => ({}),
    components: {
        // registerBox
    },
    methods: {
        toWriteBlog: function() {
            this.$router.push('./write');
        },
        toUpload: function() {
            // this.$router.push('./')
        }
    }
};
</script>