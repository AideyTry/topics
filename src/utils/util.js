export const deepClone = (target, hash = new WeakMap()) => {
    // 非object类型，直接返回
    if(typeof target !== 'object') return target
    // 如果是日期和正则对象值，则直接返回
    if(target instanceof Date) return new Date(target)
    if(target instanceof RegExp) return new RegExp(target)
    // 用hash记录是否将本身对象添加给某个属性了，如果添加对象本身，则直接返回。
    if(hash.get(target)) return hash.get(target)
    const result = Object.prototype.toString.call(target) === '[object Array]' ? [] : {}
    // 这样设置result因为是引用类型，下面result值改变后上面的result值也会跟着改变
    hash.set(target, result)
    for(let key in target){
        if(target.hasOwnProperty(key)){
            result[key] = deepClone(target[key], hash)
        }
    }
    return result
}