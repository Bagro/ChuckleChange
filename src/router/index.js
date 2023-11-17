import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'features' },
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/features',
          name: 'features',
          component: () => import('../components/FeaturesComponent.vue'),
        },
        {
          path: '/feature/:id',
          name: 'featureEdit',
          component: () => import('../components/FeatureEditComponent.vue'),
          props: true
        },
        {
          path: '/environments',
          name: 'environments',
          component: () => import('../components/EnvironmentsComponent.vue')
        },
        {
          path: '/environment/:id',
          name: 'environmentEdit',
          component: () => import('../components/EnvironmentEditComponent.vue'),
          props: true
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    }
  ],
  linkActiveClass: 'underline decoration-double'
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user.refreshToken) {
    return {
      path: '/login',
      query: { redirect: to.path },
    }
  }
})

export default router
