<template>
	<q-page class="flex flex-center">
		<q-card style="max-width: 600px;" flat bordered>
			<q-card-section>
			<div class="text-h6">Nuevo lugar</div>
			</q-card-section>

			<q-card-section class="q-pt-none">
				<q-form class="q-gutter-md">
					<q-input
						v-my-only-alphanumeric
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
						v-if="!placeValue.id" />
					<q-btn
						color="primary"
						label="Actualizar"
						@click="updatePlace()"
						v-if="placeValue.id"/>
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
	const placeValue = defineProps(['id'])

	const name = ref(null);
	const open = ref(null);
	const postalCode = ref(null);

	if( placeValue.id ){
		getPlaceInfo(placeValue.id);
	}

	function getPlaceInfo(id){
		api.get('/places/' + placeValue.id)
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
			api.post('/places', { name: name.value, open: open.value, postalCode: postalCode.value })
				.then(response => {
					$router.push('/');
				})
				.catch(error => {
				});
		}
	}

	function updatePlace()
	{
		api.put('/places/' + placeValue.id, { name: name.value, open: open.value})
			.then(response => {
				$router.push('/');
			})
			.catch(error => {

			});

	}
</script>