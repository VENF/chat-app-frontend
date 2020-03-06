<template>
  <v-app id="app">
    <v-content id="container-app">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style>
*{
  font-family: 'Nunito', sans-serif ;
}
</style>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
