import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [(data) => {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})
// 设置请求拦截器设置token
instance.interceptors.request.use(config => {
  // 获取token（Vuex中的state中user中token）
  if (store.state.user.token) {
    config.headers.Authorization = `Bearers${store.state.user.token}`
  }
  return config
}, err => Promise.reject(err)
)
// 响应拦截器
instance.interceptors.response.use(res => {
  try {
    return res.data.data
  } catch (error) {
    return res
  }
}, async err => {
  if (err.response && err.response.status === 401) {
    const loginConfig = { path: '/login', query: { returnUrl: router.currentRoute.path } }
    const user = store.state.user
    // 检查是否登录，没有登录则跳回登录页同时带上回调url
    if (!user || !user.token || !user.refresh_token) {
      return router.push(loginConfig)
    }
    try {
      // 新建一个axios，而不用之前设置的，因为之前的里面的配置是token不是refresh_token
      const { data: { data } } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer${user.refresh_token}`
        }
      })
      // 改公用的state里面的user信息
      // 改本地存储中的user信息
      // 直接调用mutations里面的setUser方法就可以了
      store.commit('setUser', {
        token: data.token,
        refresh_token: user.refresh_token
      })
      // err函数中 返回一个promise(axios请求) 执行当前的promise
      // 继续发送之前失败的请求，instance({之前失败的请求配置})
      // 请求失败的请求配置参数 err.config
      return instance(err.config)
    } catch (error) {
      // token刷新不成功
      store.commit('delUser')
      return router.push(loginConfig)
    }
  }
  return Promise.reject(err)
})
// 导出调用接口（接口地址，请求方式，传参）
// 导出代码相当于下面注释中的调用方法
// axios(config)
// // Send a POST request
// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// })
export default (url, method, data) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
