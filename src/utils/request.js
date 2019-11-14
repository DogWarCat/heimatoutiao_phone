import Vue from 'vue'
import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'

const instance = axios.create({
  baseUrl: 'http://ttapi.research.itcast.cn/',
  transformRequest: [function (data) {
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
}, err => Promise.reject(err))
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
  instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
