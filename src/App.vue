<template>
   <MenuComponent />
   <router-view/>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue'

export default {
  name: 'App',
  components: {
    MenuComponent
  }
}
</script>
<style>
  body{
    color: #303952;
    background-image: url('../src/assets/fondo.jpg') !important ;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}
</style>