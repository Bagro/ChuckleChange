import {defineStore} from "pinia";
import { useLocalStorage } from "@vueuse/core"
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import router from "@/router";

const baseUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: useLocalStorage('user', null),
        refreshTokenTimeout: null,
    }),
    actions: {
        async login(email, password) {
            this.user = await fetchWrapper.post(`${baseUrl}/auth/login`, {email, password}, {credentials: 'include'});
            this.startRefreshTokenTimer();
        },
        logout() {
            this.user = null;
            this.stopRefreshTokenTimer();
            router.push('/login');
        },
        async refreshToken() {
            this.user = await fetchWrapper.post(`${baseUrl}/auth/refresh`, { "refreshToken": this.user.refreshToken}, {credentials: 'include'});
            this.startRefreshTokenTimer();
        },
        startRefreshTokenTimer() {
            const expires = new Date(this.user.expiresIn * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },
        stopRefreshTokenTimer() {
            clearTimeout(this.refreshTokenTimeout);
        }
    }
})