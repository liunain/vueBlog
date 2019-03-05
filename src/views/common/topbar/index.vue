<template>
	<div id ="topbar" :class="isFixed==true ? 'fixed' :''">
		<div class="top">
			<topnav></topnav>
            <div>
                <div v-if='isLogin'>
                    <loginRegister></loginRegister>
                </div>
                <div v-else>
                    <isLogin></isLogin>
                </div> 
            </div>
		</div>
		<!-- <registerBox></registerBox> -->
	</div>
</template>

<style lang="scss" scoped>

#topbar{
    width: 100%;
	height:58px;
    top:0;
    position: fixed;
    z-index: 1000;
    font-size: 18px;
    background: #fff;
    display:flex;
	margin-bottom: 17px;
     box-sizing: border-box;
	box-shadow: 0px 0px 17px #ccc;
	.top{
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
        width: 80%;
        max-width: 970px;
        box-sizing: border-box;
        background: #fff;
	}
}
.fixed{
	position: fixed;
	z-index: 1000;
}
@media screen and (max-width: 850px) {
    #topbar {
        font-size: 13px;
    }
}
@media screen and (max-width: 650px) {
    #topbar {
        font-size: 11px;
    }
}   
</style>

<script>
import topnav from './topnav/index.vue';
import loginRegister from './login-register/index.vue';
import isLogin from './isLogin/index.vue';
// import registerBox from '../register/registerBox';
export default{
    name: 'topbar',
    data: () => ({
        isFixed: false,
        isLogin: false
    }),
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (document.querySelector('#topbar')) {
                var offsetTop = document.querySelector('#topbar').offsetTop;
                if (scrollTop > offsetTop) {
                    this.isFixed = true;
                } else {
                    this.isFixed = false;
                }
            }
        }
    },
    components: {
        topnav,
        loginRegister,
        isLogin
    }
};
</script>