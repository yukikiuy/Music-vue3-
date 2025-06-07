<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const playerStore = usePlayerStore()
const userStore = useUserStore()

// 歌单信息
const playlist = ref({
  id: 1,
  title: '华语流行音乐精选',
  cover: './src/assets/images/default.png',
  description: '精选华语流行音乐，带你感受中文音乐的魅力。收录了近年来最受欢迎的华语流行音乐，包括流行、民谣、摇滚等多种风格。',
  creator: '音乐编辑',
  createTime: '2024-01-01',
  playCount: 25000,
  songCount: 50,
  tags: ['华语', '流行', '精选']
})

// 歌曲列表
const songs = ref([
  {
    id: 1,
    title: '起风了',
    artist: '买辣椒也用券',
    album: '起风了',
    duration: '05:11'
  },
  {
    id: 2,
    title: '我和我的祖国',
    artist: '王菲',
    album: '我和我的祖国',
    duration: '03:35'
  },
  {
    id: 3,
    title: 'Believer',
    artist: 'Imagine Dragons',
    album: 'Evolve',
    duration: '03:24'
  },
  {
    id: 4,
    title: '海阔天空',
    artist: 'Beyond',
    album: '海阔天空',
    duration: '05:26'
  },
  {
    id: 5,
    title: '青花瓷',
    artist: '周杰伦',
    album: '我很忙',
    duration: '03:35'
  }
])

// 格式化播放次数
const formatPlayCount = (count) => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count
}

// 格式化时间
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

// 播放歌曲
const playSong = (song) => {
  playerStore.playSong(song)
}

// 播放全部
const playAll = () => {
  if (songs.value.length > 0) {
    playerStore.clearPlaylist()
    songs.value.forEach(song => {
      playerStore.addToPlaylist(song)
    })
    playerStore.playSong(songs.value[0])
  }
}

// 收藏歌单
const isCollected = ref(false)
const toggleCollect = () => {
  if (!userStore.isAuthenticated) {
    // TODO: 显示登录提示
    return
  }
  isCollected.value = !isCollected.value
  // TODO: 调用收藏/取消收藏接口
}

onMounted(() => {
  const playlistId = route.params.id
  // TODO: 根据 ID 获取歌单详情
  console.log('获取歌单详情：', playlistId)
})
</script>

<template>
  <div class="playlist-detail">
    <!-- 歌单信息 -->
    <div class="playlist-header">
      <div class="playlist-cover">
        <img :src="playlist.cover" :alt="playlist.title">
      </div>
      <div class="playlist-info">
        <div class="title-section">
          <h1>{{ playlist.title }}</h1>
          <div class="playlist-stats">
            <span class="creator">
              <img src="./src/assets/images/default.png" alt="creator" class="creator-avatar">
              {{ playlist.creator }}
            </span>
            <span class="create-time">创建于 {{ formatDate(playlist.createTime) }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button class="primary-btn" @click="playAll">
            <i class="iconfont icon-play"></i>
            播放全部
          </button>
          <button class="collect-btn" :class="{ active: isCollected }" @click="toggleCollect">
            <i class="iconfont icon-heart"></i>
            {{ isCollected ? '已收藏' : '收藏' }}
          </button>
        </div>

        <div class="tags">
          <span v-for="tag in playlist.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <div class="description">
          <p>{{ playlist.description }}</p>
        </div>

        <div class="stats">
          <span class="stat-item">
            <i class="iconfont icon-play"></i>
            {{ formatPlayCount(playlist.playCount) }}
          </span>
          <span class="stat-item">
            <i class="iconfont icon-music"></i>
            {{ playlist.songCount }}首歌曲
          </span>
        </div>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <div class="song-list">
      <div class="list-header">
        <div class="song-index">#</div>
        <div class="song-title">标题</div>
        <div class="song-artist">歌手</div>
        <div class="song-album">专辑</div>
        <div class="song-duration">时长</div>
      </div>
      <div
        v-for="(song, index) in songs"
        :key="song.id"
        class="song-item"
        @click="playSong(song)"
      >
        <div class="song-index">{{ index + 1 }}</div>
        <div class="song-title">{{ song.title }}</div>
        <div class="song-artist">{{ song.artist }}</div>
        <div class="song-album">{{ song.album }}</div>
        <div class="song-duration">{{ song.duration }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.playlist-detail {
  padding: 20px;
}

.playlist-header {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .playlist-cover {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .playlist-info {
    flex: 1;

    .title-section {
      margin-bottom: 20px;

      h1 {
        font-size: 24px;
        color: #333;
        margin: 0 0 12px;
      }

      .playlist-stats {
        display: flex;
        align-items: center;
        gap: 20px;
        color: #666;
        font-size: 14px;

        .creator {
          display: flex;
          align-items: center;
          gap: 8px;

          .creator-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;

      button {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 24px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;

        i {
          font-size: 16px;
        }
      }

      .primary-btn {
        background: #409EFF;
        color: white;

        &:hover {
          background: #66b1ff;
        }
      }

      .collect-btn {
        background: #f5f5f5;
        color: #666;

        &:hover {
          background: #e4e4e4;
        }

        &.active {
          color: #ff4757;
        }
      }
    }

    .tags {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;

      .tag {
        padding: 4px 12px;
        background: #f5f5f5;
        border-radius: 12px;
        font-size: 12px;
        color: #666;
      }
    }

    .description {
      margin-bottom: 16px;
      color: #666;
      font-size: 14px;
      line-height: 1.6;
    }

    .stats {
      display: flex;
      gap: 20px;
      color: #999;
      font-size: 12px;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 4px;

        i {
          font-size: 14px;
        }
      }
    }
  }
}

.song-list {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .list-header {
    display: grid;
    grid-template-columns: 60px 3fr 2fr 2fr 100px;
    padding: 12px 20px;
    border-bottom: 1px solid #f5f5f5;
    color: #999;
    font-size: 12px;
  }

  .song-item {
    display: grid;
    grid-template-columns: 60px 3fr 2fr 2fr 100px;
    padding: 12px 20px;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
    color: #333;
    font-size: 14px;

    &:hover {
      background-color: #f5f5f5;
    }

    .song-index {
      color: #999;
    }

    .song-title {
      font-weight: 500;
    }

    .song-artist,
    .song-album {
      color: #666;
    }

    .song-duration {
      color: #999;
      text-align: right;
    }
  }
}
</style>
