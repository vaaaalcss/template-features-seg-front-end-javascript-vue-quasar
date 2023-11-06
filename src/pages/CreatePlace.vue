<template>
	Nuevo lugar
	<input type="string" name="name" v-model="name" placeholder="Nombre">
	<input type="string" name="open" v-model="open" placeholder="Horario de atención">
	<button @click="savePlace()">Guardar</button>
</template>

<script setup>
	import { api } from 'boot/axios'
	import { ref } from 'vue'
	import { useRouter } from "vue-router";
	const $router = useRouter()

	const name = ref(null);
	const open = ref(null);

	function savePlace(){
		api.post('/places', { name: name.value, open: open.value })
			.then(response => {
				console.log(response);
				$router.push('/');
			})
			.catch(error => {
				console.log(error);
			});
	}
</script>