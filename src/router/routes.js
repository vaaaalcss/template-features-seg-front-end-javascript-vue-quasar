
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'nuevo-lugar', component: () => import('pages/CreatePlace.vue') },
      { path: 'ver-lugar/:id', props: true, component: () => import('pages/ShowPlace.vue') },
      { path: 'editar-lugar/:id', props: true, component: () => import('pages/CreatePlace.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
