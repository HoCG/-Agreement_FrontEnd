import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import store from './store/store';

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
      // 이곳에 router 를 등록할 것 입니다.
    {
        path: '/',
        component: () => import ('./views/StartViewer.vue')
    }, {
        path: '/UserPage',
        component: () => import ('./views/DragAndDropFile.vue')
    }, {
      path: '/WriterPage',
      component: () => import ('./views/WritersViewer.vue')
  }
]

const router = new VueRouter({routes});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
