const toString = Object.prototype.toString
// TODO 注意这个返回值用类型保护，而不是用boolean，因为这样当参数传入isDate返回true的时候
// ts会知道传入的参数是个Date，如果返回boolean则不会
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
