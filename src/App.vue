<template>
  <div class="container" id="app">
    <Navbar />
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
}
</script>

<style>
html, body {
  font-family: 'Poppins', sans-serif!important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
  margin-top: 100px;
  margin-bottom: 60px;
}

.nav-link a {
  color: fff!important;
}
</style>
