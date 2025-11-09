import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/toast-custom.css'


const app = createApp(App)
app.use(router)
app.use(Toast, {
  position: 'top-center',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
})

app.mount('#app')
