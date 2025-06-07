<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 歌单分类
const categories = ref([
  { id: 'all', name: '全部' },
  { id: 'chinese', name: '华语' },
  { id: 'western', name: '欧美' },
  { id: 'japanese', name: '日语' },
  { id: 'korean', name: '韩语' },
  { id: 'classical', name: '古典' },
  { id: 'jazz', name: '爵士' },
  { id: 'rock', name: '摇滚' }
])

// 当前选中的分类
const currentCategory = ref('all')

// 模拟歌单数据
const playlists = ref([
  {
    id: 1,
    title: '华语流行音乐精选',
    cover: './src/assets/images/default.png',
    description: '精选华语流行音乐，带你感受中文音乐的魅力',
    creator: '音乐编辑',
    playCount: 25000,
    songCount: 50
  },
  {
    id: 2,
    title: '轻音乐放松时刻',
    cover: './src/assets/images/default.png',
    description: '轻柔的音乐，让心灵得到放松',
    creator: '心灵音乐',
    playCount: 18000,
    songCount: 30
  },
  {
    id: 3,
    title: '经典怀旧金曲',
    cover: './src/assets/images/default.png',
    description: '那些年我们一起听过的歌',
    creator: '怀旧频道',
    playCount: 35000,
    songCount: 40
  },
  {
    id: 4,
    title: '欧美流行热榜',
    cover: './src/assets/images/default.png',
    description: '最新欧美流行音乐精选',
    creator: '全球音乐',
    playCount: 42000,
    songCount: 45
  },
  {
    id: 5,
    title: '爵士咖啡馆',
    cover: './src/assets/images/default.png',
    description: '慵懒午后，来杯爵士咖啡',
    creator: 'JazzLover',
    playCount: 15000,
    songCount: 35
  },
  {
    id: 6,
    title: '电音派对',
    cover: './src/assets/images/default.png',
    description: '让我们一起嗨起来',
    creator: 'EDM Master',
    playCount: 28000,
    songCount: 38
  }
])

// 切换分类
const changeCategory = (category) => {
  currentCategory.value = category
  // TODO: 根据分类获取歌单列表
}

// 格式化播放次数
const formatPlayCount = (count) => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count
}

// 跳转到歌单详情页
const goToPlaylistDetail = (id) => {
  router.push(`/playlist/${id}`)
}
</script>

<template>
  <div class="playlist-page">
    <!-- 分类导航 -->
    <div class="category-nav">
      <div class="category-list">
        <button
          v-for="category in categories"
          :key="category.id"
          class="category-item"
          :class="{ active: currentCategory === category.id }"
          @click="changeCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- 歌单列表 -->
    <div class="playlist-grid">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="playlist-card"
        @click="goToPlaylistDetail(playlist.id)"
      >
        <div class="playlist-cover">
          <img :src="playlist.cover" :alt="playlist.title">
          <div class="playlist-info">
            <span class="play-count">
              <i class="iconfont icon-play"></i>
              {{ formatPlayCount(playlist.playCount) }}
            </span>
          </div>
        </div>
        <div class="playlist-content">
          <h3 class="playlist-title">{{ playlist.title }}</h3>
          <p class="playlist-desc">{{ playlist.description }}</p>
          <div class="playlist-meta">
            <span class="creator">by {{ playlist.creator }}</span>
            <span class="song-count">{{ playlist.songCount }}首</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.playlist-page {
  padding: 20px;
}

.category-nav {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .category-item {
      padding: 6px 16px;
      border: 1px solid #e4e4e4;
      border-radius: 20px;
      background: none;
      color: #666;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 14px;

      &:hover {
        color: #409EFF;
        border-color: #409EFF;
      }

      &.active {
        background: #409EFF;
        color: white;
        border-color: #409EFF;
      }
    }
  }
}

.playlist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  .playlist-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .playlist-cover {
      position: relative;
      padding-top: 100%;

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
        top: 0;
        left: 0;
        right: 0;
        padding: 10px;
        background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent);
        color: white;

        .play-count {
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;

          i {
            font-size: 14px;
          }
        }
      }
    }

    .playlist-content {
      padding: 12px;

      .playlist-title {
        font-size: 14px;
        color: #333;
        margin: 0 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .playlist-desc {
        font-size: 12px;
        color: #666;
        margin: 0 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 32px;
      }

      .playlist-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #999;

        .creator {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 70%;
        }
      }
    }
  }
}
</style>
