import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    favorites: [],
    isLoggedIn: false
  }),

  actions: {
    login(credentials) {
      // 模拟登录
      this.userInfo = {
        id: 1,
        username: credentials.username,
        avatar: 'default-avatar.jpg'
      }
      this.isLoggedIn = true
    },

    logout() {
      this.userInfo = null
      this.favorites = []
      this.isLoggedIn = false
    },

    toggleFavorite(songId) {
      const index = this.favorites.indexOf(songId)
      if (index === -1) {
        this.favorites.push(songId)
      } else {
        this.favorites.splice(index, 1)
      }
    }
  },

  getters: {
    userProfile: (state) => state.userInfo,
    favoritesList: (state) => state.favorites,
    isAuthenticated: (state) => state.isLoggedIn
  }
})
