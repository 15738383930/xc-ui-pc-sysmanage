<template>
  <div>
    <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
    <el-form-item label="人物名称" prop="name">
      <el-input type="text" v-model="userForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="userForm.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="resetForm('userForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
    <script>
      import * as userApi from '../api/cms';
      export default {
        created: function () {
          this.id = this.$route.params.id;
          //根据主键查询页面信息
          userApi.user_get(this.id).then((res) => {
            if (res) {
              this.userForm = res;
            }
          });
        },
        data() {
          let checkAge = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
              if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
              } else {
                if (value < 18) {
                  callback(new Error('必须年满18岁'));
                } else {
                  callback();
                }
              }
            }, 1000);
          };
          let checkName = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入人物名称'));
            } else {
              callback();
            }
          };
          return {

            // 人物id
            id: 0,

            userForm: {
              name: '',
              age: ''
            },
            rules: {
              name: [
                { validator: checkName, trigger: 'blur' }
              ],
              age: [
                { validator: checkAge, trigger: 'blur' }
              ]
            }
          };
        },
        methods: {
          submitForm() {
            this.$refs.userForm.validate((valid) => {
              if (valid) {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                  this.addLoading = true;
                  userApi.user_edit(this.id, this.userForm).then((res) => {
                    if(res.success){
                      this.addLoading = false;
                      this.$message({
                        message: '提交成功',
                        type: 'success'
                      });
                      //返回
                      this.go_back();

                    }else if(res.message){
                      this.addLoading = false;
                      this.$message.error(res.message);
                    }else{
                      this.addLoading = false;
                      this.$message.error('提交失败');
                    }
                  });
                });
              }
            });

          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          go_back() {
            this.$router.push({
              path: '/test/page/list', query: {
                page: this.$route.query.page
              }
            })
          }
        }
      }
    </script>
