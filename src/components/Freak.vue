<template>
  <div
    :style="style"
    class="freak">
    <span id="message">{{ message }}</span>
    <div
      id="freak"
      v-html="require('../assets/svg/freak.svg')"/>
    <div
      id="sign"
      v-html="require('../assets/svg/schild.svg')"/>
    <div
      id="eye"
      v-html="require('../assets/svg/auge.svg')"/>
  </div>
</template>

<script>
  export default {
    name: "Freak",
    props: {
      message: {
        default: "UPS!",
        type: String
      },
      fontsize: {
        default:"4vw",
        type: String
      },
      fontstyle: {
        default: "normal",
        type: String
      },
      fontweight: {
        default: "normal",
        type: String
      }
    },
    computed: {
      style () {
        return 'font-size:' + this.fontsize;
        'font-style:' + this.fontstyle;
        'font-weight' + this.fontweight;
      }}
  }
</script>

<style scoped>
  .freak {
    position: relative;
    height: 100%;
    width: 50%;
    float: left;
  }
  #freak {
    position: absolute;
    width: 25vw;
    bottom: 0vw;
  }
  #sign {
    position: absolute;
    width: 20vw;
    left: 18vw;
    bottom: 5vw;
    transform: rotate(5deg);
  }
  #eye {
    position: absolute;
    left: 15vw;
    width: 1.5vw;
    bottom: 24vw;
    transform: rotateX(0deg);
    transition: transform 1s;
  }
  #message {
    position: absolute;
    left: 21vw;
    height:11vw;
    width: 16vw;
    top: -41vw;
    text-align:center;
    transform: rotate(5deg);
  }
  .freak:hover #sign {
    transition: transform 1s;
    transform: translate(-1vw,-3vw);
  }
  .freak:hover #message {
    transition: transform 1s;
    transform: translate(-2vw,-3vw);
  }
  .freak:hover #eye {
    transform: rotateX(70deg);
  }
</style>