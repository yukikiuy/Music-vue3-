import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentSong: null,
    playlist: [],
    playing: false,
    currentTime: 0
  }),

  actions: {
    playSong(song) {
      this.currentSong = song
      this.playing = true
    },

    togglePlay() {
      this.playing = !this.playing
    },

    updateCurrentTime(time) {
      this.currentTime = time
    },

    addToPlaylist(song) {
      this.playlist.push(song)
    },

    clearPlaylist() {
      this.playlist = []
      this.currentSong = null
      this.playing = false
      this.currentTime = 0
    }
  },

  getters: {
    currentSongInfo: (state) => state.currentSong,
    isPlaying: (state) => state.playing,
    playlistCount: (state) => state.playlist.length
  }
})
