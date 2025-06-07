<script setup>
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useUserStore } from '@/stores/user'

const playerStore = usePlayerStore()
const userStore = useUserStore()

const currentSong = computed(() => playerStore.currentSongInfo)
const isPlaying = computed(() => playerStore.isPlaying)
const isFavorite = computed(() => {
  if (!currentSong.value || !userStore.isAuthenticated) return false
  return userStore.favoritesList.includes(currentSong.value.id)
})

const handlePlayPause = () => {
  playerStore.togglePlay()
}

const handlePrevious = () => {
  // 实现切换到上一首歌的逻辑
  console.log('Previous song')
}

const handleNext = () => {
  // 实现切换到下一首歌的逻辑
  console.log('Next song')
}

const toggleFavorite = () => {
  if (!currentSong.value || !userStore.isAuthenticated) return
  userStore.toggleFavorite(currentSong.value.id)
}
</script>

<template>
  <div class="music-player">
    <!-- 歌曲信息 -->
    <div class="song-info">
      <img
        :src="currentSong?.cover || '/default-cover.jpg'"
        :alt="currentSong?.title"
        class="cover-image"
      >
      <div class="song-details">
        <h3 class="song-title">{{ currentSong?.title || '未播放' }}</h3>
        <p class="artist">{{ currentSong?.artist || '-' }}</p>
      </div>
    </div>

    <!-- 播放控制 -->
    <div class="player-controls">
      <button class="control-btn" @click="handlePrevious">
        <i class="iconfont icon-previous"></i>
      </button>
      <div class="container">
  <label>
    <!-- 复选框用于控制播放状态 -->
    <input class="play-btn" type="checkbox" @change="handlePlayPause" :checked="isPlaying">

    <!-- 动态显示播放或暂停图标 -->
    <div class="play-icon" v-if="!isPlaying">
      <i class="iconfont icon-play"></i>
    </div>
    <div class="pause-icon" v-if="isPlaying">
      <i class="iconfont icon-pause"></i>
    </div>
  </label>
</div>

      <button class="control-btn" @click="handleNext">
        <i class="iconfont icon-next"></i>
      </button>
    </div>

    <!-- 收藏按钮 -->
    <div class="extra-controls">
      <button
        class="favorite-btn"
        :class="{ active: isFavorite }"
        @click="toggleFavorite"
      >
        <i class="iconfont icon-heart"></i>
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.music-player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
  background: #fff;

  .song-info {
    display: flex;
    align-items: center;
    width: 300px;

    .cover-image {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      margin-right: 12px;
      object-fit: cover;
    }

    .song-details {
      .song-title {
        font-size: 14px;
        margin: 0;
        color: #333;
      }

      .artist {
        font-size: 12px;
        color: #666;
        margin: 4px 0 0;
      }
    }
  }

  .player-controls {
    display: flex;
    align-items: center;
    gap: 20px;

    .control-btn {
      background: none;
      border: none;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s;

      &:hover {
        background: #f5f5f5;
      }

      &.play-btn {
        width: 40px;
        height: 40px;
        background: #409EFF;
        color: white;

        &:hover {
          background: #66b1ff;
        }
      }

      i {
        font-size: 20px;
      }
    }
  }

  .extra-controls {
    width: 300px;
    display: flex;
    justify-content: flex-end;

    .favorite-btn {
      background: none;
      border: none;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      transition: all 0.3s;

      &:hover, &.active {
        color: #ff4757;
      }

      i {
        font-size: 20px;
      }
    }
  }
}
/* From Uiverse.io by csemszepp */
.container {
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 50%;
}

.play-btn {
  position: absolute;
  appearance: none;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(#ff6347, #ff6347);
  cursor: pointer;
  outline: none;
}

.play-btn::before {
  content: "";
  position: absolute;
  width: 93%;
  height: 93%;
  background-color: #000;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.play-btn:checked {
  animation: borderAnimate 700ms ease-in-out 1;
  animation-fill-mode: forwards;
}

@keyframes borderAnimate {
  0% {
    transform: rotate(0);
    background: conic-gradient(#66b1ff, transparent 20%);
  }

  80% {
    background: conic-gradient(#66b1ff, transparent 90%);
  }

  100% {
    transform: rotate(360deg);
    background: conic-gradient(#66b1ff, #66b1ff);
  }
}

.play-icon {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 60%;
  top: 50%;
  background-color: #66b1ff;
  transform: translate(-60%, -50%) rotate(90deg);
  clip-path: polygon(50% 15%, 0% 100%, 100% 100%);
  transition: all 400ms ease-in-out;
  cursor: pointer;
}

.play-btn:checked + .play-icon {
  clip-path: polygon(0 100%, 0% 100%, 100% 100%);
}

.pause-icon {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.pause-icon::before {
  content: "";
  position: absolute;
  width: 0%;
  height: 100%;
  background-color: #66b1ff;
  left: 0;
}

.pause-icon::after {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  background-color: #66b1ff;
  right: 0;
}

.play-btn:checked ~ .pause-icon::before {
  animation: reveal 300ms ease-in-out 350ms 1;
  animation-fill-mode: forwards;
}

.play-btn:checked ~ .pause-icon::after {
  animation: reveal 300ms ease-in-out 600ms 1;
  animation-fill-mode: forwards;
}

@keyframes reveal {
  0% {
    width: 0;
  }

  100% {
    width: 35%;
  }
}
</style>
