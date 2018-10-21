<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-danger fixed-top">
  <a class="navbar-brand" href="#">MUFC API</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link"><router-link to="/">Home</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link"><router-link to="/ShowPlayers">Players</router-link></a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
     export default {
        name: 'navbar',
        data() {
            return {
                
            }
        }
     }
</script>

<style>
nav {
  font-family: 'Poppins', sans-serif;
}

nav .navbar-nav li a{
  color: white !important;
  font-weight: 500;
  text-decoration: none;
  }
</style>
