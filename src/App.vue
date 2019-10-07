<template>
	<div id="app">
    <img src="./assets/logo.png" height="15%" width="15%">
    <br />
    <div class="buttons has-addons is-centered">
      <span :class="[mode == 'Pearson CC' ? 'button is-info is-selected' : 'button']" @click="changeMode('Pearson CC')">Pearson CC</span>
      <span :class="[mode == 'K-Means' ? 'button is-info is-selected' : 'button']" @click="changeMode('K-Means')">K-Means</span>
    </div>
    <br />
    <cc v-if="mode == 'Pearson CC'" />
    <kmeans v-else-if="mode == 'K-Means'" />
	</div>
</template>

<script>

export default {
  name: "app",
  data: function() {
    return {
      mode: 'Pearson CC'
    }
  },
  methods: {
    changeMode(value){
      this.mode = value;
    }
  }
};
</script>

<style>
@import './../node_modules/bulma/css/bulma.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html{
  background: #F5F5DC;
}
</style>
