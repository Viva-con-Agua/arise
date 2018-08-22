<template>
  <div id="index">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item
        index="3"
        disabled>Info</el-menu-item>
      <el-menu-item
        index="4">
        <a
          href="https://www.gottemeyer.ms"
          target="_blank">Orders</a>
      </el-menu-item>
    </el-menu>
    <el-carousel>
      <el-carousel-item
        v-for="item in 4"
        :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <h1> Willkommen zurück, Freddy</h1>
    <h3> Deine kommenden Konzerte</h3>
    <el-row>
      <el-col
        v-for="(o, index) in 2"
        :span="8"
        :key="o"
        :offset="index > 0 ? 2 : 0">
        <el-card
          :body-style="{ padding: '0px' }">
          <img
            src="http://lorempixel.com/100/100/food"
            class="image">
            <div style="padding: 14px;">
            <span>Yummy hamburger</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button
                type="text"
                class="button">Operating button</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import {
    Alert,
    Button,
    Card,
    Carousel,
    CarouselItem,
    Col,
    Menu,
    MenuItem,
    Row,
    Submenu

  } from 'element-ui'

  Vue.use(VueAxios, axios);
  Vue.use(Alert);
  Vue.use(Button);
  Vue.use(Card);
  Vue.use(Carousel);
  Vue.use(CarouselItem);
  Vue.use(Col);
  Vue.use(Menu);
  Vue.use(MenuItem);
  Vue.use(Submenu);
  Vue.use(Row);

  export default {
    name: "Index",

    data() {
      return {
        show: false,
        activeIndex: '1',
        activeIndex2: '1',
        currentDate: new Date()

      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 80%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>