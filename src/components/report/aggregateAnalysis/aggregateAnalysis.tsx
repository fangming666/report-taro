/*
* 综合分析
* */
import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import {makeArray} from '../../../utils/makeArray'

import AnalysisNotice from './../analysisNotice/analysisNotice' //展示面板
import PercentRank from './../percentRank/percentRank' //战胜率以及排名
import ExamPaperData from './../examPaperData/examPaperData'//各个科目的数据
import SchoolPercent from './../schoolPercent/schoolPercent'//学校战胜率的组件
import HierarchicalRanking from './../hierarchicalRanking/hierarchicalRanking'//层次排名的组件
import GoodBadSubject from './../goodBadSubject/goodBadSubject'//优劣学科的组件
import './aggregateAnalysis.scss'

type PageStateProps = {
  counter: {
    reportObj: any
  }
}

type PageDispatchProps = {}

type PageOwnProps = {
  examName: string
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface AggregateAnalysis {
  props: IProps;
  state: PageState
}

@connect
class AggregateAnalysis extends Component implements AggregateAnalysis {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View>
        <AnalysisNotice level={this.props.counter.reportObj.level}>
          <View className={'analysis-exam-name text-center'}>
            {this.props.examName}
          </View>
        </AnalysisNotice>
        <PercentRank
          class_percent={this.props.counter.reportObj.class_percent}
          class_rank={this.props.counter.reportObj.class_rank}
          group_percent={this.props.counter.reportObj.group_percent}
          group_rank={this.props.counter.reportObj.group_rank}
          school_percent={this.props.counter.reportObj.school_percent}
          school_rank={this.props.counter.reportObj.school_rank}
        >
        </PercentRank>
        <ExamPaperData
          examPaperData={makeArray(this.props.counter.reportObj.exam_paper_data)}>
        </ExamPaperData>
        <SchoolPercent table_switch={true}>
        </SchoolPercent>
        <HierarchicalRanking>
        </HierarchicalRanking>
        <GoodBadSubject>
        </GoodBadSubject>
      </View>
    )
  }
}

export default AggregateAnalysis as ComponentClass<PageOwnProps, PageState>
