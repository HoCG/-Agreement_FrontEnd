import Vue from 'vue'
import VueRouter from 'vue-router'

const isAuthenticationMember = (to, from, next) => {
    if (localStorage.getItem('access_token') !== null) {
        next()
    } else {
        next('/no-auth');
    }
};

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        // 이곳에 router 를 등록할 것 입니다.
        /*
        {
            path: '/',
            component: () => import ('../views/StartViewer.vue')
        }, 
        */
        {
            path: '/UserPage',
            component: () => import ('../views/UserViewer.vue'),
            beforeEnter: (to, from, next) => isAuthenticationMember(to, from, next),
        }, {
            path: '/WriterPage/:document_name',
            component: () => import ('../views/WritersViewer.vue')
        }, {
            path: '/',
            component: () => import ('../views/LoginViewer.vue')
        }, {
            path: '/WriterLoginPage/:document_name',
            component: () => import ('../views/WritersLoginViewer.vue')
        }, {
            path: '/WritersPDF',
            component: () => import ('../views/WritersPDFViewer.vue')
        }
    ]
});

export {router}