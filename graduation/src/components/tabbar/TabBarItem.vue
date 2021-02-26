<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-show="!isActive">
      <slot name="img"></slot>
    </div>
    <div v-show="isActive">
      <slot name="imgActive"></slot>
    </div>
    <div :class="{active: isActive}">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: {
        type: String,
        default: '/home'
      }
    },
    computed: {
      isActive: {
        get: function () {
          return this.$route.path.indexOf(this.path) != -1
        },
        set: function (v) {
          this.a = v
        }
      }
    },
    methods: {
      itemClick() {
        this.isActive = !this.isActive;
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    margin: 0 auto;
    text-align: center;
  }

  .active {
    color: red;
  }
</style>