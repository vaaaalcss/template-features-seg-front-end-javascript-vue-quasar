<template>
  <q-page class="flex flex-center">
    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>
        Lugares
        <q-btn flat color="primary" label="Agregar" @click="$router.push('/nuevo-lugar')"/>
      </q-item-label>

      <q-item v-for="place in places" :key="place.id">

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{place.name}}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            {{place.open}}
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="visibility" @click="$router.push('/ver-lugar/' + place.hash)"/>
            <q-btn size="12px" flat dense round icon="edit" @click="$router.push('/editar-lugar/' + place.hash)" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="deletePlace(place.hash)"/>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { api } from 'boot/axios'
import { ref } from 'vue'
import CryptoJS from 'crypto-js';

const places = ref([]);

function getPlaces(){
  api.get('/places')
    .then(response => {
      places.value = response.data.places;
    })
    .catch(error => {
      console.log(error);
    });
}

function deletePlace(hash){
  api.delete(`/places/${hash}`)
    .then(response => {
      getPlaces();
    })
    .catch(error => {

    });
}

getPlaces();

</script>
