<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// 控制显示登录还是注册表单
const isLogin = ref(true)

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 注册表单数据
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
})

// 表单验证状态
const formErrors = reactive({
  login: {
    username: '',
    password: ''
  },
  register: {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  }
})

// 处理登录
const handleLogin = () => {
  // 重置错误信息
  formErrors.login.username = ''
  formErrors.login.password = ''

  // 表单验证
  if (!loginForm.username) {
    formErrors.login.username = '请输入用户名'
    return
  }
  if (!loginForm.password) {
    formErrors.login.password = '请输入密码'
    return
  }

  // 调用 store 的登录方法
  userStore.login({
    username: loginForm.username,
    password: loginForm.password
  })

  // 登录成功后跳转到首页
  router.push('/')
}

// 处理注册
const handleRegister = () => {
  // 重置错误信息
  Object.keys(formErrors.register).forEach(key => {
    formErrors.register[key] = ''
  })

  // 表单验证
  if (!registerForm.username) {
    formErrors.register.username = '请输入用户名'
    return
  }
  if (!registerForm.password) {
    formErrors.register.password = '请输入密码'
    return
  }
  if (registerForm.password.length < 6) {
    formErrors.register.password = '密码长度不能少于6位'
    return
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    formErrors.register.confirmPassword = '两次输入的密码不一致'
    return
  }
  if (!registerForm.email) {
    formErrors.register.email = '请输入邮箱'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
    formErrors.register.email = '请输入有效的邮箱地址'
    return
  }

  // TODO: 实现注册逻辑
  console.log('注册信息：', registerForm)

  // 注册成功后切换到登录表单
  isLogin.value = true
}

// 切换登录/注册表单
const toggleForm = () => {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div class="login-view page-container">
    <div class="form-container">
      <div class="form-header">
        <h2>{{ isLogin ? '欢迎回来' : '创建新账号' }}</h2>
        <p class="toggle-text">
          {{ isLogin ? '还没有账号？' : '已有账号？' }}
          <a href="#" @click.prevent="toggleForm">
            {{ isLogin ? '立即注册' : '立即登录' }}
          </a>
        </p>
      </div>

      <!-- 登录表单 -->
      <form v-if="isLogin" @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <input
            id="login-username"
            v-model="loginForm.username"
            type="text"
            placeholder="用户名"
          >
          <span class="error-message" v-if="formErrors.login.username">
            {{ formErrors.login.username }}
          </span>
        </div>

        <div class="form-group">
          <input
            id="login-password"
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
          >
          <span class="error-message" v-if="formErrors.login.password">
            {{ formErrors.login.password }}
          </span>
        </div>

        <button type="submit" class="submit-btn">登录</button>
      </form>

      <!-- 注册表单 -->
      <form v-else @submit.prevent="handleRegister" class="form">
        <div class="form-group">
          <input
            id="register-username"
            v-model="registerForm.username"
            type="text"
            placeholder="用户名"
          >
          <span class="error-message" v-if="formErrors.register.username">
            {{ formErrors.register.username }}
          </span>
        </div>

        <div class="form-group">
          <input
            id="register-email"
            v-model="registerForm.email"
            type="email"
            placeholder="邮箱"
          >
          <span class="error-message" v-if="formErrors.register.email">
            {{ formErrors.register.email }}
          </span>
        </div>

        <div class="form-group">
          <input
            id="register-password"
            v-model="registerForm.password"
            type="password"
            placeholder="密码"
          >
          <span class="error-message" v-if="formErrors.register.password">
            {{ formErrors.register.password }}
          </span>
        </div>

        <div class="form-group">
          <input
            id="register-confirm-password"
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="确认密码"
          >
          <span class="error-message" v-if="formErrors.register.confirmPassword">
            {{ formErrors.register.confirmPassword }}
          </span>
        </div>

        <button type="submit" class="submit-btn">注册</button>
      </form>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/styles/common.less';

.login-view {
  width: 500px;
  height: 650px;
  padding: 0;
  margin: 40px auto;
}

.form-container {
  padding: 40px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;

  h2 {
    font-size: 28px;
    color: #333;
    margin-bottom: 12px;
  }

  .toggle-text {
    color: #666;
    font-size: 14px;

    a {
      color: #335eea;
      text-decoration: none;
      font-weight: 500;
      margin-left: 4px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.form {
  .form-group {
    margin-bottom: 20px;
    display: flex;
    input {
      width: 100%;
      padding: 14px;
      border: 2px solid #f0f0f0;
      border-radius: 8px;
      font-size: 15px;
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: #335eea;
      }

      &::placeholder {
        color: #999;
      }
    }

    .error-message {
      color: #ff4d4f;
      font-size: 13px;
      margin-top: 6px;
      display: block;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #335eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #2c50c7;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
