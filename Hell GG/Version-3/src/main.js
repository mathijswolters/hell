import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import toaster from './toaster'
import './assets/main.css'
import KillFeed from './killFeed.js'
import Domination_feed from './Domination_feed'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(toaster)
app.use(KillFeed)
app.use(Domination_feed)
app.use(VueLazyLoad)

app.mount('#app')
