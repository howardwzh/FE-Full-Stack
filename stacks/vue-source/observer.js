/****** base knowlegde ******/
// Object.keys, 获取所以keys
const obj = {
  aaa: 1,
  bbb: 2,
  ccc: 3
}
const keys = Object.keys(obj)
console.log(keys)
// slice, 深拷贝
const arr = [1, 2, 3]
const sliceClone = arr.slice()
sliceClone[0] = 'test'
console.log(sliceClone)
console.log(arr)