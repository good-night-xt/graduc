<template>
  <div class="person_info_container">
    <info><span slot="edit" class="icon iconfont" @click="editClick">&#xe621;</span></info>
    <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="90%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="用户名: ">
          <el-input v-model="userName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensureBtnClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Info from '../info/Info'
  import { getLoginData, editUser } from '@/network/loginAndRegister'

  export default {
    name: 'PersonInfo',
    components: {
      Info
    },
    data() {
      return {
        // 控制对话框的显示
        dialogVisible: false,
        // 修改后的用户名
        userName: ''
      }
    },
    methods: {
      // 编辑按钮的点击
      editClick() {
        this.dialogVisible = true
      },

      // 确定按钮的点击
      ensureBtnClick() {
        this.dialogVisible = false
        // 发送修改请求
        var obj = JSON.parse(window.localStorage.getItem('registerObj'));
        obj.name = this.userName
        editUser(obj).then(() => {
          this.userName = ''
          // 更新登录者信息
          getLoginData(obj).then((res) => {
            if (res.status === 200) {
              // 保存登录用户的个人信息
              this.$store.state.userObj = res.data.userData;
              // console.log(this.$store.state.userObj)
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
  .icon {
    margin-left: 20px;
    font-size: 18px;
    color: rgb(112, 112, 233);
  }
</style>