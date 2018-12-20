/**
 * 重新组装数组
 * */
let assemble = (reqArray: any[], condition: any): any => {
  if (reqArray && reqArray.length) {
    let resultArr: string[] = [];
    for (let val of reqArray) {
      resultArr = [...resultArr, val[condition]]
    }
    return resultArr;
  }
}
export {assemble}
