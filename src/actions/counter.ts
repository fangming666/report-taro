export const CHANGE_EXAM = 'CHANGE_EXAM';
export const CHANGE_SUBJECT: string = 'CHANGE_SUBJECT';
export const CHANGE_REPORT: string = `CHANGE_REPORT`;
export const CHANGE_SHELTER: string = `CHANGE_SHELTER`;
import {Server} from "../utils/server";
import {examApi, coursesApi, reportApi} from "../utils/api";


//改变考试列表
export const changeExam = (examList: any[]) => {
  return {
    type: CHANGE_EXAM,
    examList
  }
};

//获取考试列表
export function gainExam(obj: any) {
  return async dispatch => {
    try {
      let result: any = await Server({
        url: examApi,
        data: obj
      });
      dispatch(changeExam(result.data.data))
    } catch (err) {
      throw err
    }
  }
}

//改变考试科目列表
export function changeSubject(arr: any[]) {
  let subjectArr: any[] = [{course_id: 0, course_name: "综合分析"}, ...arr];
  return {
    type: CHANGE_SUBJECT,
    subjectArr
  }
}



//获取科目列表
export function gainSubject(obj: any) {
  return async dispatch => {

    try {
      let result: any = await Server({
        url: coursesApi,
        data: obj
      });
      dispatch(changeSubject(result.data.data))
    } catch (err) {
      throw err
    }
  }
}


//修改报告列表
export function changeReport(reportObj: object) {
  return {
    type: CHANGE_REPORT,
    reportObj
  }
}

//改变遮挡开关
export function changeShelter(result: boolean) {
  return {
    type: CHANGE_SHELTER,
    result
  }
}

//获取报告列表
export function gainReport(obj: any) {
  return async dispatch => {
    try {
      dispatch(changeShelter(true));
      let result: any = await Server({
        url: reportApi,
        data: obj
      });
      dispatch(changeReport(result.data.data))
    } catch (err) {
      throw err
    }
  }
}


