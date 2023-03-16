import { isDate, isObject } from './util'

function encode(val: string): string {
  // 将字符进行编译，但是一些特殊字符不使用编译后的内容
  return encodeURIComponent(val)
    .replace(/%40/g, '@') // 将编译后的@换回@
    .replace(/%3A/gi, ':') // 将编译后的:换回:
    .replace(/%24/g, '$') // 将编译后的$换回$
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') // 将编译后的空格换成+
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 将要传的参数拼接到url上，注意规则：
 *
 * @param url url
 * @param params url的参数
 * @returns
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  // 这个存储转换后要拼接到url的string数组
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 先将要上传的参数的值同一成数组的形式，方便后面的处理
    let values = []
    // 如果是数组，那么key就要加上[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      // key和value都要进行编译
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  // 丢弃url中的hash值 ，既原本url是/base/get#hash改成/base/get
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    url = url.slice(0, markIndex)
  }
  url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  return url
}
