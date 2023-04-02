import { extend } from '../../../课程资料/资料(更多IT教程 微信q1963029669)/资料/ts-axios-master/ts-axios/src/helpers/util'
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'head'
  | 'HEAD'
// axios请求传入的配置
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  responseType?: XMLHttpRequestResponseType
  headers?: any
  timeout?: number
}

// axios返回值的类型
export interface AxiosResponse {
  data: any
  status: number
  statusText: String
  headers: any
  // 请求配置
  config: AxiosRequestConfig
  request: any
}

// TODO Promise的泛型是指定了resolve的参数，也就是当它落入fullfiled的时候，得到的内容就是AxiosResponse
export interface AxiosPromise extends Promise<AxiosResponse> {}

// 增强Error，以便提供更多信息
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 这个Axios接口是个类，它描述了axios下的一堆公用方法
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

// AxiosInstance 是一个方法，但是它又继承了Axios类，因此，它也可以使用Axios下的公共方法
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
