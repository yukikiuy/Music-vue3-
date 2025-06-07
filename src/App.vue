<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import MusicPlayer from './components/player/MusicPlayer.vue'

const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
}
</script>

<template>
  <div class="app-container">
    <!-- 背景 -->
    <div class="app-bg"></div>

    <!-- 顶部导航 -->
    <header class="header">
      <nav class="nav-menu">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/playlist">歌单</RouterLink>
        <RouterLink to="/search">搜索</RouterLink>
      </nav>
      <div class="user-menu">
        <template v-if="userStore.isAuthenticated">
          <RouterLink to="/profile" class="user-profile">
            <span>{{ userStore.userProfile?.username }}</span>
          </RouterLink>
          <a href="#" @click.prevent="handleLogout" class="logout-btn">退出</a>
        </template>
        <RouterLink v-else to="/login">登录</RouterLink>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- 底部播放器 -->
    <footer class="player-bar">
      <MusicPlayer />
    </footer>
  </div>
</template>

<style lang="less" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.app-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/images/thumb.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(20px);
  z-index: -1;
  transform: scale(1.1); // 避免边缘出现白边
}

.header {
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(228, 228, 228, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  .nav-menu {
    a {
      margin-right: 20px;
      text-decoration: none;
      color: #333;
      font-size: 16px;

      &.router-link-active {
        color: #335eea;
      }
    }
  }

  .user-menu {
    display: flex;
    align-items: center;
    gap: 20px;

    a {
      text-decoration: none;
      color: #333;
      font-size: 14px;

      &:hover {
        color: #335eea;
      }
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 8px;

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .logout-btn {
      color: #666;

      &:hover {
        color: #f56c6c;
      }
    }
  }
}

.main-content {
  flex: 1;
  margin-top: 60px;
  margin-bottom: 70px;
  position: relative;
  z-index: 1;
}

.player-bar {
  height: 70px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(228, 228, 228, 0.2);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
