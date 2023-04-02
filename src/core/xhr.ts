import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    //指定响应中包含的数据类
    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url!, true)
    // 设置请求体头,必须要放在open后面
    /**
     * MDN的描述：
     * XMLHttpRequest.setRequestHeader() 是设置 HTTP 请求头部的方法。
     * 此方法必须在 open() 方法和 send() 之间调用。
     * 如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
     */
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    // 捕获并处理XMLHttpRequest的异常事件，一般网络出现异常（如网络不同），会触发这个错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    // 设置超时处理
    if (timeout) {
      // console.log('设置了超时时间为：'+ timeout)
      request.timeout = timeout
    }
    request.ontimeout = function handleTimeout() {
      // console.log('超时啦')
      // reject(new Error(`Timeout of ${timeout} ms exceeded`))
      reject(
        createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
    }

    // 监听状态改变函数，当返回时进行处理封装
    request.onreadystatechange = function handleLoad() {
      /**
       * 状态码：
          0	UNSENT	代理被创建，但尚未调用 open() 方法。
          1	OPENED	open() 方法已经被调用。
          2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
          3	LOADING	下载中；responseText 属性已经包含部分数据。
          4	DONE	下载操作已完成，既已返回
        */
      if (request.readyState !== 4) {
        return
      }
      // 当超时的时候，仍然会调用这个方法，这里退出，将promise状态改变的方法给handleTimeout
      if (request.status === 0) {
        return
      }

      /**
       * getAllResponseHeaders这是获取全部的响应头部分，是一个字符串，类似于：
          connection: keep-alive
          x-powered-by: Express
          content-type: application/json; charset=utf-8
          每一行都是以回车符和换行符 \r\n 结束，要把它解析为一个对象
        */
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      // 封装AxiosResponse
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      // resolve(response)
      handleResponse(response)

      function handleResponse(response: AxiosResponse) {
        // 如果响应状态码不是2xx和3xx
        if (response.status >= 200 && response.status < 300) {
          resolve(response)
        } else {
          reject(
            createError(
              `Request failed with status code ${response.status}`,
              config,
              null,
              request,
              response
            )
          )
        }
      }
    }
    request.send(data)
  })
}
