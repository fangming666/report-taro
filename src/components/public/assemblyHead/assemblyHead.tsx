/**
 * 展示的组件的头部信息
 * */
import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import './assemblyHead.scss'

type PageStateProps = {
  counter: {}
}

type PageDispatchProps = {}

type PageOwnProps = {
  assemblyTitle: String,
  assemblyClass?: String
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface AssemblyHead {
  props: IProps;
  state: PageState
}

@connect
class AssemblyHead extends Component implements AssemblyHead {
  static defaultProps = {
    assemblyTitle: 'title',
    assemblyClass: ''
  };

  render() {
    return (
      <View className={`assembly-head text-center ${this.props.assemblyClass}`}>
        {this.props.assemblyTitle}
      </View>
    )
  }
}

export default AssemblyHead as ComponentClass<PageOwnProps, PageState>
