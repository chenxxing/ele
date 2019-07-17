<template>
  <div id="app">
    <transition name="router-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .5s;
	}
	.router-fade-enter, .router-fade-leave-to {
	  	opacity: 0;
	}
</style>
