<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      人物名称：
      <el-input v-model="params.name" style="width: 100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/test/page/add/'}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="this.list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      v-on:current-change="changePage"
      :current-page="this.params.page"
      :page-size="this.params.size"
      :total="this.total"
      style="float: right">
    </el-pagination>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms'
  export default {
    mounted(){
      // DOM元素渲染完成后调用
      this.query();
    },
    data() {
      return {
        siteList: [],
        list: [],
        total:0,
        params:{
          name:'',
          page:1,//页码
          size:10//每页显示个数
        }
      }
    },
    methods: {
      changePage: function (page) {
        let _this = this;
        _this.params.page = page;
        _this.query();
      },
      query: function () {
        let _this = this;
        cmsApi.page_list(_this.params.page, _this.params.size, _this.params).then((res)=>{
          _this.list = res.queryResult.list;
          _this.total = res.queryResult.total;
        })
      }
    }
  }
</script>
