import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

/**
 * createInstance 返回的其实是Axios.prototype.request的这个函数,然后这个函数空间下通过extend方法定义了那一系列的方法。
 * @returns
 */
function createInstance(): AxiosInstance {
  const context = new Axios()
  // 这里的bind梆定上下文，感觉没啥用
  const instance = Axios.prototype.request.bind(context)
  // const instance = Axios.prototype.request
  // console.log('instance',instance)

  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
