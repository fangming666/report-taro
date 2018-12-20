import {ComponentClass} from 'react'
import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../containers/counter"

import Subject from './../../components/report/subject/subject' //科目列表
import AggregateAnalysis from './../../components/report/aggregateAnalysis/aggregateAnalysis'//综合分析
import SingleAnalysis from './../../components/report/singleAnalysis/singleAnalysis'//单科分析
import ReportFoot from '../../components/public/reportFoot/reportFoot'
import './report.scss'

type PageStateProps = {
  counter: {
    coursesArr: any[],
    studentId: number,
    reportObj: any,
    shelterSwitch: boolean
  }
}

type PageDispatchProps = {
  gainSubject(any): () => any
  gainReport(any): () => any
}

type PageOwnProps = {}

type PageState = {
  course_id: number | string,
  exam_name: string,

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface report {
  props: IProps;
  state: PageState
}

@connect
class report extends Component implements report {

  constructor() {
    super(...arguments);
    this.state = {
      course_id: 0,
      exam_name: "",
    }
  }

  async componentDidMount() {
    this.props.gainSubject({'student_id': this.props.counter.studentId, 'exam_id': this.$router.params.exam_id});
    await this.props.gainReport({
      'student_id': this.props.counter.studentId,
      'exam_id': this.$router.params.exam_id,
      "course_id": this.state.course_id
    });
    this.setState({
      exam_name: this.$router.params.exam_name,
    })
  }

  ChangeReport(...data) {
    let [course_id] = data;
    this.setState({
      course_id
    });
    this.props.gainReport({
      'student_id': this.props.counter.studentId,
      'exam_id': this.$router.params.exam_id,
      "course_id": course_id
    });
  }

  render() {
    let reportDom: any = null;
    if (this.state.course_id) {
      //单科分析的时候
      reportDom = <SingleAnalysis>
      </SingleAnalysis>
    } else {
      //综合分析的时候
      reportDom = <AggregateAnalysis examName={this.state.exam_name}>
      </AggregateAnalysis>
    }

    return (
      <View className={'report-warp'}>
        <Subject coursesArr={this.props.counter.coursesArr} onChangeReport={this.ChangeReport.bind(this)}>
        </Subject>
        {this.props.counter.shelterSwitch ?
          <View className={'shelter-warp'}>
          </View>
          : reportDom}
        {this.props.counter.shelterSwitch ?
          <View className={'shelter-warp'}>
          </View>
          : <ReportFoot>
          </ReportFoot>}
      </View>
    )
  }
}

export default report as ComponentClass<PageOwnProps, PageState>
