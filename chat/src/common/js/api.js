import axios from 'axios'
import Qs from 'qs'

export function GET (url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: data}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function POST (url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, Qs.stringify(data), {
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
