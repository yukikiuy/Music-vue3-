<script setup>
import { ref } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// 模拟数据
const recommendedPlaylists = ref([
  {
    id: 1,
    title: '华语流行音乐精选',
    cover: './src/assets/images/default.png',
    songCount: 50
  },
  {
    id: 2,
    title: '轻音乐放松时刻',
    cover: './src/assets/images/default.png',
    songCount: 30
  },
  {
    id: 3,
    title: '经典怀旧金曲',
    cover: './src/assets/images/default.png',
    songCount: 40
  },
  {
    id: 4,
    title: '欧美流行热榜',
    cover: './src/assets/images/default.png',
    songCount: 45
  }
])

const hotSongs = ref([
  {
    id: 1,
    title: '起风了',
    artist: '买辣椒也用券',
    cover: './src/assets/images/default.png',
    duration: '05:11'
  },
  {
    id: 2,
    title: '我和我的祖国',
    artist: '王菲',
    cover: './src/assets/images/default.png',
    duration: '03:35'
  },
  {
    id: 3,
    title: 'Believer',
    artist: 'Imagine Dragons',
    cover: './src/assets/images/default.png',
    duration: '03:24'
  },
  {
    id: 4,
    title: '海阔天空',
    artist: 'Beyond',
    cover: './src/assets/images/default.png',
    duration: '05:26'
  },
  {
    id: 5,
    title: '青花瓷',
    artist: '周杰伦',
    cover: './src/assets/images/default.png',
    duration: '03:35'
  }
])

const playSong = (song) => {
  playerStore.playSong(song)
}
</script>

<template>
  <div class="home page-container">
    <!-- 轮播图区域 -->
    <section class="banner">
      <h2>音乐，让生活更美好</h2>
    </section>

    <!-- 推荐歌单 -->
    <section class="section">
      <div class="section-header">
        <h2>推荐歌单</h2>
        <router-link to="/playlist" class="more-link">更多 ></router-link>
      </div>
      <div class="playlist-grid">
        <div v-for="playlist in recommendedPlaylists"
             :key="playlist.id"
             class="playlist-card">
          <div class="playlist-cover">
            <img :src="playlist.cover" :alt="playlist.title">
            <div class="playlist-info">
              <span class="song-count">{{ playlist.songCount }}首</span>
            </div>
          </div>
          <h3 class="playlist-title">{{ playlist.title }}</h3>
        </div>
      </div>
    </section>

    <!-- 热门歌曲 -->
    <section class="section">
      <div class="section-header">
        <h2>热门歌曲</h2>
        <a href="#" class="more-link">更多 ></a>
      </div>
      <div class="song-list">
        <div v-for="song in hotSongs"
             :key="song.id"
             class="song-item"
             @click="playSong(song)">
          <div class="song-info">
            <img :src="song.cover" :alt="song.title" class="song-cover">
            <div class="song-details">
              <h3 class="song-title">{{ song.title }}</h3>
              <p class="song-artist">{{ song.artist }}</p>
            </div>
          </div>
          <span class="song-duration">{{ song.duration }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/styles/common.less';

.home {
  padding: 0;
}

.banner {
  height: 300px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  color: white;
  text-align: center;

  h2 {
    font-size: 2.5em;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
}

.section {
  margin-bottom: 40px;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }

    .more-link {
      color: #666;
      text-decoration: none;
      font-size: 14px;

      &:hover {
        color: #409EFF;
      }
    }
  }
}

.playlist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  .playlist-card {
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    .playlist-cover {
      position: relative;
      padding-top: 100%;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 8px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .playlist-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
        color: white;
      }
    }

    .playlist-title {
      font-size: 14px;
      color: #333;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.song-list {
  .song-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }

    .song-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .song-cover {
        width: 50px;
        height: 50px;
        border-radius: 4px;
        object-fit: cover;
      }

      .song-details {
        .song-title {
          font-size: 16px;
          color: #333;
          margin: 0 0 4px;
        }

        .song-artist {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
      }
    }

    .song-duration {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
