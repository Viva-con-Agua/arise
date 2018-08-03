<template>
  <div id="arise">
    <!--<el-menu
      :widths="3">
      <el-menu-item>
        <h2>Viva con Agua Pool²</h2>
      </el-menu-item>
      <el-menu-item>
        &lt;!&ndash;<sui-image src=""></sui-image>&ndash;&gt;
      </el-menu-item>
      <el-menu-item>
        <el-button-group color="blue">
          <el-button
            attached="left" 
            content="SIGN UP" 
            icon="edit" 
            label-position="left" /><a href="drops/auth/login"/>
          <el-button
            attached="right" 
            content="SIGN IN" 
            icon="sign in alternate" 
            label-position="right"/><a href="drops/auth/login"/>
        </el-button-group>
      </el-menu-item>
    </el-menu>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Arise',
  components: {}
}
</script>

<style>
    #arise {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
