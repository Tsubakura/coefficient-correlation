<template>
	<div id="app">
    <img src="./assets/logo.png" height="15%" width="15%">
    <br />
    <text-reader @load="parseCSV($event)"></text-reader>
    <br>
    <table v-if="columns.length > 0 && loaded && !error" class="table is-bordered" align="center">
      <thead>
        <tr>
          <th></th>
          <th v-for="(entry) in columns" :key="entry">{{entry}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entryX) in columns" :key="entryX">
          <th>{{entryX}}</th>
          <td v-for="(entryY) in columns" :key="entryY" :style="{ background: gradientRedYellowGreen(calculate(entryX, entryY)) }">{{calculate(entryX, entryY)}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th v-for="(entry) in columns" :key="entry">{{entry}}</th>
        </tr>
      </tfoot>
    </table>
    <h1 v-if="error"><strong>MY BRAIN JUST EXPLODED!</strong></h1>
	</div>
</template>

<script>
import TextReader from "./TextReader";
const papa = require('papaparse')
const correlation = require('node-correlation')
const {getGradients} = require('color-gradients')
getGradients({values: [-1, 0, 1]})

export default {
  name: "app",
  components: {
    TextReader
  },
  data: function() {
    return {
      columns: [],
      data: {},
      loaded: false,
      error: false
    }
  },
  methods: {
    parseCSV(value){
      try{
        this.loaded = false;
        this.error = false;
        let dataset = papa.parse(value, {skipEmptyLines: true});
        if(dataset.errors.length > 0){
          console.log("MY BRAIN JUST EXPLODED!")
          this.error = true;
        }
        else{
          this.columns = dataset.data[0];
          for(const x of this.columns){
            this.data[x] = [];
          }
          for(const x in dataset.data){
            if(x == 0) continue;
            for(const y in dataset.data[x]){
              let result = Number(dataset.data[x][y]);
              if(isNaN(result)){
                this.data[this.columns[y]] = "NaN";
                continue;
              }
              else{
                if(this.data[this.columns[y]] == "NaN") continue;
                this.data[this.columns[y]].push(result)
              }
            }
          }
        }
        this.loaded = true;
      }
      catch(err){
        console.log("MY BRAIN JUST EXPLODED!")
        console.log(err);
        this.error = true;
      }
    },
    calculate(a, b){
      return (this.data[a] == "NaN" || this.data[b] == "NaN") ? "N/A" : Math.floor(correlation.calc(this.data[a], this.data[b])*100)/100;
    },
    gradientRedYellowGreen(value){
      let total = 255;

      let red = 255;
      let green = 255;
      let blue = 0;
      if(value > 0){
        //Reduce red
        red -= (total*value)
      }
      else if(value < 0){
        //Reduce green
        green -= (total*Math.abs(value))
      }
      return (value == "N/A") ? `rgb(128,128,128)` :`rgb(${red},${green},${blue})`;
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
#value{
  text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000;
}
</style>
