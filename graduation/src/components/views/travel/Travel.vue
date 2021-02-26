<template>
  <div class="travel_container">
    <!-- header -->
    <header>站车服务</header>
    <!-- 遗失物品上报 -->
    <div class="appear_lost">
      <div class="hint">遗失物品上报</div>
      <div>
        <el-input placeholder="请输入需上报的遗失物品" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 遗失物品查询 -->
    <div class="search_lost">
      <div class="hint">遗失物品查询</div>
      <div>
        <el-input placeholder="请输入需查询的遗失物品" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Travel'
  }
</script>

<style scoped>

  .travel_container {
    height: calc(100vh - 50px);
    background-color: azure;
  }

  header {
    padding-top: 10px;
    font-size: 24px;
    font-weight: 800;
    text-align: center;
  }

  .appear_lost,
  .search_lost {
    width: 95vw;
    margin: 150px auto;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .appear_lost,
  .search_lost {
    text-align: center;
  }

  .hint {
    width: 95vw;
    margin: 0 auto;
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: 900;
    text-align: center;
    color: rgb(136, 136, 199);
  }

</style>