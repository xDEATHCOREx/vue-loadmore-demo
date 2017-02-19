<template>
	<div>
	<router-link  class="button" @click.native="previous" :to="{ name: 'list', params: { pageNum: page-1 }}">RETURN<span>当前页:{{page}}</span></router-link>
	<div id="list">
		<ol>
			<li v-for="news of list">
				<p class="title">{{news.title}}</p>
				<p class="date">{{news.create_at}}</p>
				<p class="author">By:{{news.author.loginname}}</p>
			</li>
		</ol>
	</div>
	<router-link  class="button" @click.native="next" :to="{ name: 'list', params: { pageNum: page+1 }}">GO NEXT<span>当前页:{{page}}</span></router-link>
	<transition :name="up? 'up-start':'down-start'">
		<div id="loader" v-show="!finish">
			<span>Loading Page:{{page}}</span>
		</div>
	</transition>
</template>
<script type="text/javascript">
import news from '../api/news'
console.log('Into List.vue')
export default {
  data () {
    return { 
   		list: [],
   		page: 1,
   		finish:true,
   		up: false,
   		limit: 10
    }
  },
  /*props: {
  	page: {
  		type: Number,
  		default: 1
  	}
  },*/
  //这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一般可以在created函数中调用ajax获取页面初始化所需的数据。
  created(){
  	this.get()
  },
  watch:{
  	page(val){
  		console.log('page changed'+val)
  		this.get()
  	}
  },
  methods: {
  	previous(){
  		if(this.page===1){
  			alert('已是第一页')
  		} else{
  			this.page--
  			this.up = true
      		this.finish = false
  		  	console.log('previous clicked')
  		}
  	},
  	get(){
  		console.log('getnews')
  		news.getList({
  			page:this.page,
  			limit:this.limit},(err,list)=>{
  				if(err){
  					console.log(err)
  				} else{
  					list.data.forEach((data)=>{
  						const d = new Date(data.create_at) //未格式化
  						data.create_at =`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`//格式化时间
  						
  					})
  					console.log("formated")
  					console.log(list.data)
  				}
  				// 常规loadmore
				// this.list = this.list.concat(list.data)
				// 分页
				this.list = list.data
				  setTimeout(() => {
            this.finish = true
          }, 1050)
  			})
  	},
    next () {
    	//this.$route.params.pageNum++
    	console.log("pageNum:"+this.$route.params.pageNum)
      this.page++
      this.up = false
      this.finish = false
      console.log('next clicked')
    }
  }
}
</script>

<style type="text/css" scoped>
ol {
    margin-left: 2rem;
    list-style: outside decimal; /*列表旁的数字标记*/
  }
  li {
    line-height: 1.5;
    padding: 1rem;
    border-bottom: 1px solid #b6b6b6;
  }
  .title {
    font-weight: bold;
    font-size: 1.3rem;
  }
  .date {
    font-size: .8rem;
    color: #d6d6d6;
  }
	 html, body {
    height: 100%;
  }
  .button {
    display: block;
    width: 100%;
    background: #212121;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 1em;
    cursor: pointer;
    text-decoration: none;
  }
  .button span {
    margin-left: 2em;
    font-size: .5rem;
    color: #d6d6d6;
  }
  #loader {
    width: 100%;
    height: 100%;
   min-height: 3em;
    position: fixed;
    left: 0;
    background: #212121;
    color: #fff;
    bottom: 0;
     
  }
  #loader span {
    display: block;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    margin-top: -0.5em;

  }
  .test-enter{
  	opacity: 0
  }
  .test-enter-active{
  	transition: opacity 1.5s
  }

	
  .down-start-enter-active {
  	 bottom: 0;
    animation: expand 0.5s 1 cubic-bezier(0, 1, 0, 1) both;
  }

  .down-start-leave-active {
  	top: 0;
    animation: collapse 1.5s 1 cubic-bezier(0, 1, 0, 1) both;
  }
/*  */

  .up-start-transition {
    top: 0;
    height: 100%;
  }
  .up-start-enter-active {
  	top:0;
    animation: expand .5s 1 cubic-bezier(0, 1, 0, 1) both;
  }
  .up-start-leave-active {
    animation: collapse .5s 1 cubic-bezier(0, 1, 0, 1) both;
    bottom: 0;
  }
  @keyframes expand {
    0% {
      height: 3em;
      transform: translate3d(0, 0, 0);
    }
    100% {
      height: 100%;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes collapse {
    0% {
      height: 100%;
      transform: translate3d(0, 0, 0);
    }
    100% {
      height: 3em;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
