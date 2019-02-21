<template>
  <div class="hello">
    <el-container>
      <el-header>豆瓣电影</el-header>
      <el-main>
        <el-tabs v-model="activeName2" @tab-click="handleClick">
          <el-tab-pane label="正在热映" name="hotshow">
          </el-tab-pane>
          <el-tab-pane label="Top250" name="Top250">
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      activeName2: 'first'
    }
  },
  methods:{
    handleClick(tab, event) {
      this.$router.push('/'+tab.name)
    }
  }
}
</script>
<style scoped>
  .el-header{
    background-color:#41B883;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->

