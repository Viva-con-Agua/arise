<template>
  <div
    :style="style"
    class="freak">
    <div
      class="body"
      v-html="require('../assets/svg/freak.svg')"/>
    <div class="sign">
      <div class="signBody" v-html="require('../assets/svg/schild.svg')"/>
      <span class="message">{{ msg }}</span>
    </div>
    <div
      class="eye"
      v-html="require('../assets/svg/auge.svg')"/>
  </div>
</template>

<script>
  export default {
    name: "Freak",
    props: {
      message: {
        required: false,
        type: String
      },
      fontsize: {
        default:"3vw",
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
      },
      msg () {
          var res = this.message
          if((typeof this.message === "undefined") || this.message === null) {
              res = this.$t("freak.default")
          }
          return res
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  @color: #0a6b91;
  @size: 1.5;

  .freak {
    position: relative;
    /*height: 90%;*/
    /*width: 50%;*/
    /*float: left;*/
  }
  .body {
    position: absolute;
    width: 10vw * @size;
    bottom: 0vw;

    & /deep/ svg #freakBody {
      fill: @color;
    }
  }
  .eye {
    position: absolute;
    left: 6vw * @size;
    width: 0.5vw * @size;
    bottom: 9.5vw * @size;
    transform: rotateX(0deg);
    transition: transform 1s;

    & /deep/ svg #eye {
      fill: @color;
    }
  }
  .sign {
    position: absolute;
    width: 7.5vw * @size;
    left: 6.5vw * @size;
    top: -19vw * @size;
    transform: translate(1.5vw * @size, -1vw * @size) rotate(7deg);
    transform-origin: 0 100%;

    .signBody {
      position: absolute;
      width: 7.5vw * @size;
      height: 5.5vw * @size;

      & /deep/ svg #sign {
        fill: @color;
      }
    }
    .message {
      position: absolute;
      z-index: 10;
      height:5.5vw * @size;
      width: 7.5vw * @size;
      top: 1.5vw * @size;
      text-align:center;
      color: @color;
      font-size: 1.5vw * @size;
    }
  }

  .freak:hover .sign {
    transition: transform 1s;
    transform: translate(0, -1vw * @size) rotate(0deg);
  }
  /*.freak:hover #eye {*/
    /*transform: rotateX(70deg);*/
  /*}*/
</style>