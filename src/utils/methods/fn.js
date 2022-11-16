/**
 * @description 模拟实现Java的Thread.sleep()线程睡眠方法
 * @param { num: Number（睡眠次数）, seconds: Number（睡眠秒数） }
 * @author 王乐翔
 * @createDate 2022/11/05
 */
// export const sleep = (num = 1, seconds = 1000) => {
//   const sleepTime = timeout => new Promise(resolve => setTimeout(resolve, timeout))
//   let timer = async count => {
//     for (let i = 0; i < count; i++) {
//       console.warn('000')
//       await sleepTime(seconds)
//     }
//   }
//   timer(10)
// }

/**
 * @description 生成指定位数 字母数字 验证码 （去除了O、0、i等不好识别的数字和字母）
 * @param { num: Number }
 * @author 王乐翔
 * @createDate 2022/01/13
 * @lastEditDate 2022/03/08
 * @lastEditAuthor 王乐翔
 * @returns 
 */
export const randomCoding = num => {
  const arr = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'J', 'j', 'K', 'k', 'L', 'M', 'm', 'N', 'n', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', '2', '3', '4', '5', '6', '7', '8', '9']
  let verificationCode = ''
  let count = num ?? 4 // 默认返回四个
  for (let i = 0; i < count; i++) { verificationCode += arr[Math.floor(Math.random() * arr.length)] }
  return verificationCode
}