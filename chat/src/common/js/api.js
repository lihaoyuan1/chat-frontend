import axios from 'axios'
import Qs from 'qs'

const DEV_HOST = '10.1.39.33:8082'
const PROD_HOST = '129.204.34.155:8082'
export const host = process.env.NODE_ENV === 'development' ? DEV_HOST : PROD_HOST

export function GET (url, data) {
  return new Promise((resolve, reject) => {
    axios.get('http://' + host + url, {params: data}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function POST (url, data) {
  return new Promise((resolve, reject) => {
    axios.post('http://' + host + url, Qs.stringify(data), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 表示返回数据成功
export const ERR_OK = 0
