<template>
	<div id="rightbar">
		<div id="recommends">
			<div class="breads">好文推荐</div>
			<div class="recommend" v-for='item in lists' :key='lists.id'>
				<div class="pic"><img :src="item.pic"></div>
				<div class="title">{{item.title}}</div>
			</div>
			<div class="spread">展开</div>
		</div>
		<div id="specialists">
			<div class="breads">博客专家</div>
			<div class="specialist" v-for='item in lists' :key='lists.id'>
				<div class="pic"><img :src="item.pic"></div>
				<div class="title">
					<p>{{item.title}}</p>
					<p>{{item.number}}篇</p>
				</div>
			</div>
			<div class="spread">展开</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../../dep/iconfont/iconfont.css";

#rightbar{
	#recommends{
		width: 206px;
		color:#929eaa;
		border-raduis: 5px;
		box-shadow: 0 0 8px #c2c2c2;
		.breads{
			height: 50px;
			line-height:50px;
			color:#fff;
			font-size: 16px;
			text-align: center;
			background: -webkit-gradient(linear, 0 0,0 100%,from(#16aeec),to(#6ec2f1));
			background: -moz-linear-gradient(top, #16aeec,#6ec2f1);
		}
		.recommend{
			display:flex;
			padding: 14px 17px 0 11px;
			.pic{
				img{
					width: 90px;
					height: 54px;
					padding-right: 11px;
				}
			}
			.title{
				font-size: 11px;
				line-height: 22px;
			}
		}
	}
	#specialists{
		width: 206px;
		margin: 20px auto;
		color:#929eaa;
		border-raduis: 5px;
		box-shadow: 0 0 8px #c2c2c2;
		.breads{
			height: 50px;
			line-height:50px;
			color:#fff;
			font-size: 16px;
			text-align: center;
			background: -webkit-gradient(linear, 0 0,0 100%,from(#16aeec),to(#6ec2f1));
			background: -moz-linear-gradient(top, #16aeec,#6ec2f1);
		}
		.specialist{
			display:flex;
			padding: 14px 17px 0 11px;
			.pic{
				img{
					width: 90px;
					height: 54px;
					padding-right: 11px;
				}
			}
			.title{
				font-size: 11px;
				line-height: 22px;
				p:nth-child(2){
					text-align: right;
				}
			}
		}
	}
	.spread{
		height: 50px;
		line-height:50px;
		font-size: 16px;
		text-align: center;
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
		&:hover{
			cursor: pointer;
            transform: scale(1.2);
            -webkit-transform: scale(1.2);
            -moz-transform: scale(1.2);
            -o-transform: scale(1.2);
            -ms-transform: scale(1.2);
		}
	}
}
</style>

<script>
// import $ from 'jquery';
// import fetchGet from '../../../../src/util/get';
import {get} from '../../../../src/util/fetchData';
export default {
    name: 'hots',
    data: () => ({
        goodsIntru: [],
        specialists: [],
        lists: [
            {
                id: '1',
                title: '这是推荐文章的标题',
                pic: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2338693105,1140444294&fm=58&bpow=512&bpoh=512',
                number: '123'
            },
            {
                id: '2',
                title: '这是推荐文章的标题',
                pic: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2338693105,1140444294&fm=58&bpow=512&bpoh=512',
                number: '233'
            }
        ]
    }),
    mounted() {
        this.getGoods();
    },
    methods: {
        getGoods: function() {
            // var that = this;
            // fetchGet.get('http://120.79.94.90:8080/page/comment/selectComment', {page: 1, commentType: 1, themeId: 1}, that.goodsIntru);
            // console.log(that.goodsIntru);
            // return fetchGet.get.fetch('http://120.79.94.90:8080/page/comment/selectComment', {page: 1, commentType: 1, themeId: 1})
            //     .then(json => {
            //         console.log(json);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
            get('http://120.79.94.90:8080/page/comment/selectComment?', {page: 1, commentType: 1, themeId: 1}).then((res) => {
                console.log(res);
                return res.json();
            }).then((json) => {
                console.log(json);
                this.setState({
                    goodsIntru: json.data
                });
                alert(json);
            }).catch(function(err) {
                // console.log(err);
                return err;
            });
        },
        getSpecialists: function() {}
    }
};
</script>