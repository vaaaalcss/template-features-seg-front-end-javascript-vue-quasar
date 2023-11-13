<template>
  <q-layout view="lHh Lpr lFf">
    <q-header unelevated class="bg-indigo-10">
      <q-toolbar>
        <q-toolbar-title @click="$router.push('/')" class="cursor-pointer">
          Template Front End
        </q-toolbar-title>

        <div>v.1.0.0</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
