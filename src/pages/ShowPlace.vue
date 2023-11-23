<template>
	<q-page class="flex flex-center">
		<q-card style="max-width: 600px;" flat bordered>
			<q-card-section>
			<div class="text-h6">{{ place ? place.name : null }}</div>
			</q-card-section>

			<q-card-section class="q-pt-none">
				<p>Horario de servicio: {{ place ? place.open : null}} </p>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script setup>
	import { api } from 'boot/axios';
	import { ref } from 'vue';

	const placeValue = defineProps(['hash'])
	const place = ref(null);

	api.get('/places/' + placeValue.hash)
		.then(response => {
			place.value = response.data.place;
		})
		.catch(error => {

		});
</script>