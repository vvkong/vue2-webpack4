<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="test-prefix">
      <p>我就测试一下，看看而已，我是红色哦</p>
    </div>
    <img
      src="../assets/images/logo.png"
      width="50px"
      height="50px"
    />
    <div class="bg">
      我在背景图上
    </div>
    <button v-bind:click="onClickButton">
      测试ES6语法
    </button>
    <div v-for="(item, idx) in list" :key="idx">
      <p>{{item}}{{}}</p>
    </div>
  </div>
</template>
<script>
class Echo {
  constructor (msg) {
    this.msg = msg
  }
  print () {
    console.log(this.msg)
  }
  getMsg () {
    return this.msg
  }
}
export default {
  data () {
    return {
      title: 'Hello vue2&&webpack4....3',
      list: ['test1', 'test2', 'test3']
    }
  },
  methods: {
    onClickButton (e) {
      let echo = new Echo('我是ES6语法class构建的对象哦')
      echo.print()
      alert(echo.getMsg())
      let sum = 2 ** 10
      alert(`求幂运算符（2 ** 10）= ${sum}`)
    },
    async getA () {
      return new Promise(new function (resolve, rejuect) {
        console.log('====== getA')
        setTimeout(function () {
          resolve(`It's timeout.`)
        }, 3000)
      }())
    },
    $test () {

    }
  }
}
</script>
<style scoped>
    .bg {
        width: 500px;
        height: 200px;
        background-image: url('../assets/images/bg.jpg');
    }
    /*   新增  */
    .test-prefix{
        display: flex;
        user-select: none;
        color: red;
    }
</style>
