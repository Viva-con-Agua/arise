<template>
  <div class="body">
    <div class="left">
      <span id="message">UPS!</span>
      <div
        id="freak"
        v-html="require('@/assets/svg/freak.svg')"/>
      <div
        id="sign"
        v-html="require('@/assets/svg/schild.svg')"/>
      <div
        id="eye"
        v-html="require('@/assets/svg/auge.svg')"/>
      <!--  <img id="sign" src="./schild.svg">
        <img id="freak" src="./freak.svg">
        <img id="eye" src="./auge.svg">
      --></div>
    <div class="right">
      <h1>Ups!</h1>
      <h3>Wir können die Seite nicht finden, die du suchst.</h3>
      <h6>Fehlercode: 404</h6>
      Hier sind stattdessen vielleicht hilfreiche Links:
      <ul>vivaconagua.org</ul>
      <ul>Login</ul>
      <ul>Test</ul>
    </div>
  </div>
</template>

<script>
  var Freak = require('svg-inline-loader?classPrefix!@/assets/svg/freak.svg');

  export default {
    name: "404"
  }
</script>

<style scoped>
  .body {
    display: flex;
    position: absolute;
    height: 100%;
    background-color: #fff
  }
  .left {
    position: relative;
    height: 100%;
    width: 50%;
    float: left;
  }
  .right {
    position: relative;
    left: 35vw;
    float: right;
  }
  #freak {
    position: absolute;
    /*left: 0px;
    bottom: 0px;
    width: 140%;*/
    width: 25vw;
    /*height: 46vh;*/
    bottom: 0vw;
  }
  #sign {
    position: absolute;
    /*width: 130%;
    left: 99%;
    bottom: 3%;*/
    width: 20vw;
    left: 18vw;
    bottom: 5vw;
    transform: rotate(5deg);
  }
  #eye {
    position: absolute;
    /*left: 83%;
    bottom: 27%;
    width: 8%;*/
    left: 15vw;
    height: 1.5vw;
    width: 1.5vw;
    bottom: 24.5vw;
    transform: rotateX(0deg);
    transition: transform 1s;
  }
  #message {
    position: absolute;
    /*left:115%;
    bottom: 36%;*/
    left: 20vw;
    height: 33vw;
    bottom: 6vw;
    font-weight: bold;
    font-size: 6vw;
    transform: rotate(5deg);
  }
  .left:hover #sign {
    transition: transform 1s;
    transform: translate(-1%,-3%);
  }

  .left:hover #message {
    transition: transform 1s;
    transform: translate(-1%,-3%);
  }

  .left:hover #eye {
    transform: rotateX(70deg);
  }
</style>