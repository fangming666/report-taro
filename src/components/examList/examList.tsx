import {ComponentClass} from 'react'
import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import connect from "../../containers/counter"

import './examList.scss'

type PageStateProps = {
  counter: {}
}

type PageDispatchProps = {}

type PageOwnProps = {
  examKey: number,
  examIndex: number,
  examItem: any
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface ExamList {
  props: IProps;
  state: PageState
}

@connect
class ExamList extends Component implements ExamList {
  //跳转到报考页面
  toReport(examId: number, examName: any) {
    Taro.navigateTo({url: `/pages/report/report?exam_id=${examId}&exam_name=${encodeURI(examName)}`})
  }


  render() {
    let examDom: any = null;
    let latelyDom: any = null;
    if (!this.props.examIndex) {
      examDom =
        <View className={'text-center '}>
          <Text className={'exam-item-title'}>
            {this.props.examItem.exam_name}
          </Text>
          <View className={'exam-item-my-score'}>
            {this.props.examItem.level_desc}
          </View>

        </View>;
      latelyDom = <Text className={'exam-item-lately'}>
        最近一次考试
      </Text>
    } else {
      examDom = <View>
        <Text className={'exam-item-title'}>
          {this.props.examItem.exam_name}
        </Text>
      </View>;
    }
    return (
      <View className={'exam-item'} key={this.props.examKey}>
        <View className={'exam-item-head'}>
          {this.props.examItem.pay_status || this.props.examItem.report_free ?
            <Text className={'exam-item-pay-yes'}>
              已开通个性化服务
            </Text> :
            <Text className={'exam-item-pay-no'}>未开通个性化服务</Text>}
          {latelyDom}
          <Text className={'exam-item-time'}>
            {this.props.examItem.exam_date}
          </Text>
        </View>
        {examDom}
        <View className={'exam-item-btn-group'}>
          <Text onClick={this.toReport.bind(this, this.props.examItem.exam_id, this.props.examItem.exam_name)}>
            查看报告
          </Text>
          <Text>
            成绩穿越
          </Text>
        </View>
      </View>
    )
  }
}

export default ExamList as ComponentClass<PageOwnProps, PageState>
