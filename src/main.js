import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from "@/stores/auth.store";

const app = createApp(App)

app.use(createPinia())
app.use(router)

try {
    const authStore = useAuthStore();
    await authStore.refreshToken();
} catch {
    // ignore
}

app.mount('#app')
