<template>
  <q-layout view="lHh Lpr lFf">
    <q-header unelevated class="bg-indigo-10">
      <q-toolbar>
        <q-toolbar-title @click="$router.push('/')" class="cursor-pointer">
          TCSFEVQ v.1.0.0
        </q-toolbar-title>

        <div>
          <q-btn
            flat
            dense
            no-wrap
            color="white"
            no-caps
            label="Salir"
            @click="logout()" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { api } from 'boot/axios'
  import { useRouter } from "vue-router";
  const $router = useRouter()

  function logout(){
    api.get('logout')
      .then(response => {
        sessionStorage.removeItem('security-token');
        $router.push('/ingresar');
      })
      .catch(error => {

      });
  }
</script>
