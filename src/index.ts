import { AxiosRequestConfig } from './types'
import xhr from './xhr'
function axios(config) {
  xhr(config)
}

export default axios
