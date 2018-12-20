import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import './percentRank.scss'

type PageStateProps = {
  counter: {}
}

type PageDispatchProps = {}

type PageOwnProps = {
  class_percent?: number, //班级战胜率
  class_rank?: number,//班级排名
  group_percent?: number,//区战胜率
  group_rank?: number,//区排名
  school_percent?: number,//校战胜率
  school_rank?: number//校排名
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface PercentRank {
  props: IProps;
  state: PageState
}

@connect
class PercentRank extends Component implements PercentRank {
  public static defaultProps = {
    class_percent: 0,
    class_rank: 0,
    group_percent: 0,
    group_rank: 0,
    school_percent: 0,
    school_rank: 0
  };

  render() {
    return (
      <View className={'percent-rank-warp'}>
        <View className={'percent-rank'}>
          <View className={'percent-rank-item'}>
            <p>班级排名:{this.props.class_rank}名</p>
            <p>班级战胜率:{this.props.class_percent}%</p>
          </View>
          <View className={'percent-rank-item'}>
            <p>学校排名:{this.props.school_rank}名</p>
            <p>学校战胜率:{this.props.school_percent}%</p>
          </View>
          <View className={'percent-rank-item'}>
            <p>区排名:{this.props.group_rank}名</p>
            <p>区战胜率:{this.props.group_percent}%</p>
          </View>
        </View>
      </View>
    )
  }
}


export default PercentRank as ComponentClass<PageOwnProps, PageState>
