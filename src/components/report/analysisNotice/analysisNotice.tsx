/**
 * 报告的面板展示
 * **/
import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import './analysisNotice.scss'


import ChildGrade from '../childGrade/childGrade'

type PageStateProps = {
  counter: {}
}

type PageDispatchProps = {}

type PageOwnProps = {
  children: any,
  level: string,
  ChildGradeSwitch?: boolean,
  level_prop?: number
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface AnalysisNotice {
  props: IProps;
  state: PageState
}

@connect
class AnalysisNotice extends Component implements AnalysisNotice {
  public static defaultProps = {
    ChildGradeSwitch: false
  };

  render() {
    return (
      <View className={'analysis-notice'}>
        {this.props.children}
        <View className={'analysis-notice-level text-center'}>
          {this.props.level}
        </View>
        {this.props.ChildGradeSwitch ? <ChildGrade level_prop={this.props.level_prop}>
        </ChildGrade> : null}
      </View>
    )
  }
}

export default AnalysisNotice as ComponentClass<PageOwnProps, PageState>
