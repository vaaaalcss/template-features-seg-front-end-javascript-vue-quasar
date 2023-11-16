<template>
	<q-page class="flex flex-center">
		<q-card style="max-width: 600px;" flat bordered>
			<q-card-section>
				<q-form class="q-gutter-md">
					<q-input
						square
						outlined
						v-model="username"
						label="Usuario"
						:rules="[
							val => !!val || 'Este campo es requerido'
						]" />
					<q-input
						type="password"
						square
						outlined
						v-model="password"
						label="Contraseña"
						:rules="[val => !!val || 'Este campo es requerido']" />
					<q-btn
						unelevated
						color="primary"
						label="Ingresar"
						@click="login()" />
				</q-form>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script setup>
	import { ref } from 'vue'
	import { api } from 'boot/axios'
	import { useRouter } from "vue-router";
	const $router = useRouter()

	const username = ref(null)
	const password = ref(null)

	function login(){
		api.post('login', { username: username.value, password: password.value } )
			.then(response => {
				if( response.data.token ){
					sessionStorage.setItem('security-token', response.data.token);
					$router.push('/')
				}
			})
			.catch(error => {

			});
	}
</script>