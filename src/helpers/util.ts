const toString = Object.prototype.toString
// TODO 注意这个返回值用类型保护，而不是用boolean，因为这样当参数传入isDate返回true的时候
// ts会知道传入的参数是个Date，如果返回boolean则不会
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 判断是否为普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // console.log(key)
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
