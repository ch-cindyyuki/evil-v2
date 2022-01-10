<template>
  <div id="app">
    <Home />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "packages";
import Home from "./views/Home.vue";

@Component({
  components: {
    Home,
  },
})
export default class App extends Vue {
  created() {
    console.log(this);
  }
}
</script>
