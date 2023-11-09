<template>
	Editando
	<h6>{{ place ? place.name : null }}</h6>
	<p>Horario de servicio: {{ place ? place.open : null}} </p>
</template>

<script setup>
	import { api } from 'boot/axios';
	import { ref } from 'vue';

	const placeValue = defineProps(['id'])
	const place = ref(null);

	api.get('/places/' + placeValue.id)
		.then(response => {
			place.value = response.data.place;
		})
		.catch(error => {

		});
</script>