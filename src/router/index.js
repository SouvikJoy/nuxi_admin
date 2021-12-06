import { createRouter, createWebHistory } from 'vue-router';

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
  },
  {
    path: '/products',
    name: 'Products',
    component: loadPage("Products"),
  },
  {
    path: '/categories',
    name: 'Categories',
    component: loadPage("Categories"),
  },
  {
    path: '/services',
    name: 'Services',
    component: loadPage("Services"),
  },
  {
    path: '/subscribers',
    name: 'Subscribers',
    component: loadPage("Subscribers"),
  },
  {
    path: '/test',
    name: 'Test',
    component: loadPage("Test"),
  },
  {
    path: '/site-infos',
    name: 'SiteInfo',
    component: loadPage("SiteInfo"),
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: loadPage("SignUp")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
