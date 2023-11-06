<template>
  <q-page class="flex flex-center">
    <button @click="$router.push('/nuevo-lugar')">Nuevo lugar</button>
    <ul>
      <li v-for="place in places" :key="place.id">
        {{place.name}}
        <br>
        {{ place.open }}
        <button @click="$router.push('/editar-lugar/' + place.id)">Ver</button>
        <button @click="$router.push('/editar-lugar/' + place.id)">Editar</button>
        <button @click="$router.push('/editar-lugar/' + place.id)">Eliminar</button>
      </li>
    </ul>
  </q-page>
</template>

<script setup>
import { api } from 'boot/axios'

let places = [];

api.get('/places')
  .then(response => {
    places = response.data.places;
  })
  .catch(error => {
    console.log(error);
  });

</script>
