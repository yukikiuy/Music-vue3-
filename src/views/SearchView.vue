<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const searchResults = ref([])
const hotSearches = ref([
  '周杰伦', '林俊杰', '薛之谦', '邓紫棋',
  'Taylor Swift', '起风了', '花海', '夜曲'
])

const handleSearch = () => {
  // TODO: 实现搜索功能
  console.log('搜索关键词:', searchQuery.value)
}

const handleHotSearch = (keyword) => {
  searchQuery.value = keyword
  handleSearch()
}
</script>

<template>
  <div class="search-view page-container">
    <div class="search-header">
      <div class="search-input-wrapper">
        <i class="search-icon">🔍</i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索音乐、歌手、歌词、用户"
          @keyup.enter="handleSearch"
        >
      </div>
    </div>

    <div class="search-content">
      <template v-if="searchResults.length === 0">
        <div class="hot-searches">
          <h3 class="section-title">热门搜索</h3>
          <div class="hot-searches-list">
            <span
              v-for="keyword in hotSearches"
              :key="keyword"
              class="hot-search-item"
              @click="handleHotSearch(keyword)"
            >
              {{ keyword }}
            </span>
          </div>
        </div>
      </template>
      <div v-else class="search-results">
        <!-- 搜索结果将在这里显示 -->
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/styles/common.less';

.search-view {
  height: 650px;
  width: 90%;
  padding: 0;
  max-width: 900px;
  margin: 20px auto;
}

.search-header {
  margin-bottom: 30px;
}

.search-input-wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto;

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #999;
  }

  input {
    width: 100%;
    padding: 16px 16px 16px 50px;
    border: none;
    border-radius: 24px;
    font-size: 16px;
    background-color: #f5f5f5;
    transition: all 0.3s;

    &:focus {
      outline: none;
      background-color: #fff;
      box-shadow: 0 0 0 2px rgba(51, 94, 234, 0.2);
    }

    &::placeholder {
      color: #999;
    }
  }
}

.search-content {
  .section-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }
}

.hot-searches {
  .hot-searches-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .hot-searches-list span {
    margin-left: 10px;
    margin-right: 10px;
  }

  .hot-search-item {
    padding: 8px 16px;
    background-color: #f5f5f5;
    border-radius: 16px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #335eea;
      color: white;
    }
  }
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 40px 0;
}
</style>
