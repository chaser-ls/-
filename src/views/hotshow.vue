<template>
    <div class="hotshow">
       <el-row>
            <el-col :span="11" v-for="eachMovie in hotshowMovieMessage" :key="eachMovie.index" class="">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="eachMovie.movieImg" class="image">
                    <div style="padding: 14px;">
                        <span>{{eachMovie.movieName}}</span>
                        <div class="block">
                            <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                        </div>
                        <div class="bottom clearfix">
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'hotshow',
    data(){
        return{
            value: 7.3/2,
            hotshowMovieMessage:[]
        }
    },
    created(){
        // this.$axios.get('/api/v2/movie/in_theaters',{
        //         params:{
        //             count:10,
        //             start:0
        //         }
        //     })
        //     .then(res =>{
        //         console.log(res)
        //     })
        this.requestHotShowData('/api/v2/movie/in_theaters',10,0)
    },
    methods:{
        requestHotShowData(url,count,start){ 
            this.$axios.get(url,{
                params:{
                    count:count,
                    start:start
                }
            })
            .then(res =>{
                // console.log(res.data)
                // console.log(res.data.subjects)
                this.dealRequestHotShowData(res)
            })
        },
        dealRequestHotShowData(res){
            for(var i=0;i<res.data.subjects.length;i++){
                var hotShowDatas={
                    movieName:res.data.subjects[i].title,
                    movieImg:res.data.subjects[i].images.small,
                    moiveRate:res.data.subjects[i].rating.average
                } 
                this.hotshowMovieMessage.push(hotShowDatas)
            }
            // console.log(this.hotshowMovieMessage)
        }
    }
}
</script>
<style scoped>
.time {
    font-size: 13px;
    color: #999;
  }
  
.bottom {
margin-top: 13px;
line-height: 12px;
}

.button {
padding: 0;
float: right;
}

.image {
width: 100%;
display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.col-11-marginRight{
    margin-right:15px
}
</style>
<style>
.hotshow .el-rate__icon{
    font-size:5px
}
</style>
