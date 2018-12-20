/*
* 单科分析的时候
* **/
import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import './singleAnalysis.scss'


import AnalysisNotice from './../analysisNotice/analysisNotice' //展示面板
import PercentRank from './../percentRank/percentRank' //战胜率以及排名
import SchoolPercent from './../schoolPercent/schoolPercent'//学校战胜率的组件
import DifficultTopic from '../difficultTopic/difficultTopic'//难易题目得分率双折线图组件
import RingDiagram from '../../public/ringDiagram/ringDiagram'//环形图的组件

type PageStateProps = {
  counter: {
    reportObj: any
  }
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface SingleAnalysis {
  props: IProps;
  state: PageState
}

@connect
class SingleAnalysis extends Component implements SingleAnalysis {
  render() {
    return (
      <View>
        <AnalysisNotice level={this.props.counter.reportObj.level}
                        ChildGradeSwitch={true}
                        level_prop={this.props.counter.reportObj.level_prop}
        >
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
        <SchoolPercent>
        </SchoolPercent>
        <DifficultTopic>
        </DifficultTopic>
        {/*失分较多知识点环行图*/}
        <RingDiagram assemblyTitleText={'失分较多知识点'}
                     chartId={'know-chart'}
                     ringDiagramTitle={'知识点'}
                     ringDiagramProp={this.props.counter.reportObj.knowData}>
        </RingDiagram>
        {/**/}
        <RingDiagram assemblyTitleText={'待提高能力'}
                     chartId={'skill-chart'}
                     ringDiagramTitle={'能力'}
                     ringDiagramProp={this.props.counter.reportObj.skillData}>
        </RingDiagram>
      </View>
    )
  }
}

export default SingleAnalysis as ComponentClass<PageOwnProps, PageState>
