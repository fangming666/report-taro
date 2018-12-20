import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import connect from "../../../containers/counter"

import './subject.scss'

type PageStateProps = {
  counter: {}
}

type PageDispatchProps = {}

type PageOwnProps = {
  coursesArr: any[],
  onChangeReport: (any) => any
}

type PageState = {
  activeNum: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface Subject {
  props: IProps;
  state: PageState
}

@connect
class Subject extends Component implements Subject {
  constructor(props) {
    super(props);
    this.state = {
      activeNum: 0
    }
  }

  changeReport(...data) {
    let [index, course_id] = data;
    this.setState({
      activeNum: index
    });
    this.props.onChangeReport(course_id);
  }

  render() {
    return (
      <ScrollView
        className={'subject-warp'}
        scrollX
        scrollWithAnimation>
        {this.props.coursesArr.map((item, index) => {
          return <View
            className={`report-item ${this.state.activeNum === index ? 'report-item-active' : ''}`}
            onClick={this.changeReport.bind(this, index, item.course_id)}
          >{item.course_name}</View>
        })}
      </ScrollView>
    )
  }
}

export default Subject as ComponentClass<PageOwnProps, PageState>
