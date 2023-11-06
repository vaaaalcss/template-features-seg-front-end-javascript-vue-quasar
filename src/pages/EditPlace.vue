<template>
	Editando
	{{ place }}
	<h6>{{ place ? place.name : null }}</h6>
	<p>Horario de servicio: {{ place ? place.open : null}} </p>
</template>

<script setup>
	import { api } from 'boot/axios'
	const placeValue = defineProps(['id'])

	let place = null;

	api.get('/places/' + placeValue.id)
		.then(response => {
			place = response.data.place;
		})
		.catch(error => {

		});
</script>