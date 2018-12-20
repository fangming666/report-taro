/**
 *单科里面孩子等级的展示
 * */
import {ComponentClass} from 'react'
import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import connect from "../../../containers/counter"

import './childGrade.scss'

type PageStateProps = {
  counter: {}
}

type PageDispatchProps = {}

type PageOwnProps = {
  level_prop?: number
}

type PageState = {
  childGradeArr: string[],
  gradePositionWidth: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface ChildGrade {
  props: IProps;
  state: PageState
}

@connect
class ChildGrade extends Component implements ChildGrade {
  constructor(props) {
    super(props);
    this.state = ({
      childGradeArr: ["A", "B", "C", "D", "E"],
      gradePositionWidth: 0
    })
  }

  componentDidMount() {
    Taro.createSelectorQuery().select('#childGradePosition')
      .boundingClientRect(rect => {
        this.setState({
          gradePositionWidth: rect['width']
        })
      })
      .exec()
  }

  render() {
    return (
      <View className={'child-grade'}>
        {this.state.childGradeArr.map(item => {
          return <Text className={'child-grade-item'}>
            {item}
          </Text>
        })}
        <View id={'childGradePosition'} className={'child-grade-position'}
              style={{'left': `calc(${this.props.level_prop}% - ${this.state.gradePositionWidth / 2 + 1}px)`}}>
          孩子的位置
        </View>
      </View>
    )
  }
}

export default ChildGrade as ComponentClass<PageOwnProps, PageState>
