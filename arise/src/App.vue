<template>
  <div id="app">
    <sui-menu 
      :widths="3" 
      :color="blue">
      <sui-menu-item >
        <h2>Viva con Agua Pool²</h2>
      </sui-menu-item>
      <sui-menu-item>
        <!--<sui-image src=""></sui-image>-->
      </sui-menu-item>
      <sui-menu-item>
        <sui-button-group color="blue">
          <sui-button 
            attached="left" 
            content="SIGN UP" 
            icon="edit" 
            label-position="left" /><a href="drops/auth/login"/>
          <sui-button 
            attached="right" 
            content="SIGN IN" 
            icon="sign in alternate" 
            label-position="right"/><a href="drops/auth/login"/>
        </sui-button-group>
      </sui-menu-item>
    </sui-menu>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css";

  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
