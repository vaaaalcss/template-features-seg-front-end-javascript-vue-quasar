<template>
  <v-idle @idle="onIdle" :duration="10 * 60" v-show="false" />
  <router-view />
</template>

<script>
  import { api } from 'src/boot/axios'

  export default {
    data() {
      return {
        idleActive: false
      }
    },
    methods: {
      onIdle(){
        const sessionToken = sessionStorage.getItem("security-token");

        if ( sessionToken && this.idleActive === false ) {
          this.idleActive = true;
          this.logout();
        }
      },
      logout (){
        api.get('/logout')
           .then(response => {
              this.idleActive = false;
              sessionStorage.removeItem('security-token');
              this.$router.push('/ingresar')
           })
           .catch(error => {

           });
      }
    }
  }
</script>