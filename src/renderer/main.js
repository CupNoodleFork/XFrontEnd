import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './components/App';
import router from './router';
import store from './store';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import './styles/common.scss';
import './styles/font.scss';
import './styles/icon.scss';

sync(store, router);

router.beforeEach((to, from, next) => {
    /*if (to.path.includes('/home')) {
        if (!store.state.account.profile.id) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }*/
    next();
});

Vue.use(VueMaterial);

Vue.material.registerTheme({
    app: {
        primary: 'blue',
        accent: 'white'
    },
    darkBlue: {
        primary: {
            color: 'blue',
            hue: 700,
            textColor: 'white'
        }
    },
    "light-blue": {
        primary: {
            color: 'light-blue',
            hue: 500,
            textColor: 'white'
        },
        warn: {
            color: 'light-blue',
            hue: 300,
            textColor: 'white'
        }
    },
    cyan: {
        primary: {
            color: 'cyan',
            hue: 500,
            textColor: 'white'
        },
        warn: {
            color: 'cyan',
            hue: 500,
            textColor: 'white'
        }
    }
});

Vue.material.setCurrentTheme('app');

const app = new Vue({
    router,
    store,
    ...App
});

app.$mount('#root');
