<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title @click="$router.push('/')" class="cursor-pointer">
          Template Front End
        </q-toolbar-title>

        <div>Quasar v.1.0.0</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
