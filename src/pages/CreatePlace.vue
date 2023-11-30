<template>
	<q-page class="flex flex-center">
		<q-card style="max-width: 600px;" flat bordered>
			<q-card-section>
			<div class="text-h6">Nuevo lugar</div>
			</q-card-section>

			<q-card-section class="q-pt-none">
				<q-form class="q-gutter-md">
					<q-input
						
						square
						outlined
						v-model="name"
						label="Nombre"
						:rules="[
							val => !!val || 'Este campo es requerido',
							val => !(val >= 255) || 'El máximo de caracteres es 2'
						]" />
					<q-input
						v-my-only-letters
						square
						outlined
						v-model="open"
						label="Horario de atención"
						:rules="[val => !!val || 'Este campo es requerido']" />
					<q-input
						v-my-only-numbers
						square
						outlined
						v-model="postalCode"
						label="Código postal"
						:rules="[val => !!val || 'Este campo es requerido']" />
					<q-btn
						unelevated
						color="primary"
						label="Guardar"
						@click="savePlace()"
						v-if="!placeValue.hash" />
					<q-btn
						unelevated
						color="primary"
						label="Actualizar"
						@click="updatePlace()"
						v-if="placeValue.hash"/>
				</q-form>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script setup>
	import { api } from 'boot/axios'
	import { ref } from 'vue'
	import { useRouter } from "vue-router";
	const $router = useRouter()
	const placeValue = defineProps(['hash'])
	import CryptoJS from 'crypto-js';

	const name = ref(null);
	const open = ref(null);
	const postalCode = ref(null);

	if( placeValue.hash ){
		getPlaceInfo(placeValue.hash);
	}

	function getPlaceInfo(id){
		api.get('/places/' + placeValue.hash)
			.then(response => {
				name.value = response.data.place.name;
				open.value = response.data.place.open;
				postalCode.value = response.data.place.postalCode;
			})
			.catch(error => {

			});
	}

	function savePlace(){
		if( name.value != null && open.value != null ){
			let data = {
				name: name.value,
				open: open.value,
				postalCode: postalCode.value
			};

			api.post('/places', data)
				.then(response => {
					$router.push('/');
				})
				.catch(error => {
				});
		}
	}

	function updatePlace()
	{
		let data = {
			name: name.value,
			open: open.value,
			postalCode: postalCode.value
		};

		api.put('/places/' + placeValue.hash, data)
			.then(response => {
				$router.push('/');
			})
			.catch(error => {

			});

	}
</script>