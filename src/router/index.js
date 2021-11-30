import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/supabase';

function loadPage(view) {
  return () =>
    import(
     `@/views/${view}.vue`
    );
}

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: loadPage("Dashboard"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: loadPage("Products"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: loadPage("Categories"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: loadPage("Services"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/subscribers',
    name: 'Subscribers',
    component: loadPage("Subscribers"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: loadPage("Test"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/site-infos',
    name: 'SiteInfo',
    component: loadPage("SiteInfo"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: loadPage("SignUp")
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: loadPage("SignIn")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = supabase.auth.user();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('sign-in');
  else if(!requiresAuth && currentUser) next("/");
  else next();
})

export default router
