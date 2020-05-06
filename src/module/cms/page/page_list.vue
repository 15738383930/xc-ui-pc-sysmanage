<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',
        query: {page: this.params.page, siteId: this.params.siteId}
      }">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table :data="list" width="100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.pageId)">删除</el-button>
          <el-button @click="preview(page.row.pageId)" type="text" size="small">页面预览</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="this.params.size"
      v-on:current-change="changePage"
      :total="total"
      :current-page="this.params.page"
      style="float: right">
    </el-pagination>
  </div>
</template>
<script>
    import * as cmsApi from '../api/cms'

    export default {
        created() {
            let _this = this;
            _this.params.page = Number.parseInt(this.$route.query.page || 1);
            _this.params.siteId = this.$route.query.siteId || '';
        },
        mounted() {
            // DOM元素渲染完成后调用
            this.query();
            this.site();
        },
        data() {
            return {
                siteList: [],
                list: [],
                total: 0,
                params: {
                    siteId: '',
                    pageAliase: '',
                    page: 1,//页码
                    size: 10//每页显示个数
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
                cmsApi.page_list(_this.params.page, _this.params.size, _this.params).then((res) => {
                    _this.list = res.queryResult.list;
                    _this.total = res.queryResult.total;
                })
            },
            site: function () {
                let _this = this;
                cmsApi.site_all().then((res) => {
                    _this.siteList = res.queryResult.list;
                })
            },
            edit: function (id) {
                let _this = this;
                _this.$router.push({
                    path: '/cms/page/edit/' + id
                })
            },
            del: function (id) {
                let _this = this;
                _this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    cmsApi.page_del(id).then((res) => {
                        if (res.success) {
                            _this.$message.success('删除成功');
                            this.query();
                        } else {
                            _this.$message.error('删除失败');
                        }
                    });
                });
            },
            //页面预览
            preview(pageId){
                window.open("http://www.zhou.com/cms/preview/" + pageId);
            }
        }
    }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
