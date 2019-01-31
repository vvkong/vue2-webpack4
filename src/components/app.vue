<template>
    <div>
        <h2>{{title}}</h2>
        <!-- 新增 -->
        <div class="test-prefix">
            <p>我就测试一下，看看而已</p>
        </div>
        <img src="../assets/images/logo.png" width="50px" height="50px"/>
        <div class="bg">
            我在背景图上
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: 'Hello vue2&&webpack4....3'
        }
    }
}
</script>
<style scoped>
    @import url('../styles/global.css');
    .bg {
        width: 500px;
        height: 200px;
        background-image: url('../assets/images/bg.jpg');
    }
    /*   新增  */
    .test-prefix{
        display: flex;
        user-select: none;
    }
</style>
