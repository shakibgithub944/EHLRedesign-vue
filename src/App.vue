<template>
  <div id="app">
    <!-- Navigation -->
    <Navigation />
    
    <!-- Router View -->
    <router-view />
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from './components/layout/Navigation.vue'
import Footer from './components/layout/Footer.vue'
</script>

<style>
@import './style.css';

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>