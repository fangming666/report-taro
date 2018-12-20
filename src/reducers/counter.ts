import {CHANGE_EXAM, CHANGE_SUBJECT, CHANGE_REPORT, CHANGE_SHELTER} from '../actions/counter'
import {object} from "prop-types";

const INITIAL_STATE = {
  examList: [],//考试列表
  studentId: 91678,//学生ID
  coursesArr: [],//科目列表
  reportObj: object,//报告列表
  shelterSwitch: true,//当请求报告时候的遮挡开关
};
export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_EXAM:
      return {
        ...state,
        examList: action.examList
      };
    case CHANGE_SUBJECT:
      return {
        ...state,
        coursesArr: action.subjectArr
      };
    case CHANGE_REPORT:
      return {
        ...state,
        shelterSwitch: false,
        reportObj: action.reportObj
      };
    case CHANGE_SHELTER:
      return {
        ...state,
        shelterSwitch: action.result
      };
    default:
      return state
  }
}
