import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import { CursorFx } from '@luxdamore/vue-cursor-fx'
// import '@luxdamore/vue-cursor-fx/dist/CursorFx.css'

const app = createApp(App)
// app.component('cursor-fx', CursorFx)
app.use(router)

app.mount('#app')
