/**
 * 综合分析的各科学校战胜率，排名的表格
 * */
import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import './examPaperData.scss'

type PageStateProps = {
  counter: {}
}

type PageDispatchProps = {}

type PageOwnProps = {
  examPaperData: any[]
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface examPaperData {
  props: IProps;
  state: PageState
}

@connect
class examPaperData extends Component implements examPaperData {
  static defaultProps = {
    examPaperData: []
  };


  render() {
    return (
      <View>
        <table className={'exam-paper-table'}
               cellPadding="0"
               cellSpacing="0">
          <thead>
          <tr>
            <th>科目</th>
            <th>战胜率</th>
            <th>等级</th>
          </tr>
          </thead>
          <tbody>
          {this.props.examPaperData.length ? this.props.examPaperData.map((item) => {
            return <tr>
              <td>
                {item.name}
              </td>
              <td>
                {item.percent}%
              </td>
              <td>
                {item.level}
              </td>
            </tr>
          }) : null}
          </tbody>
        </table>
      </View>
    )
  }
}

export default examPaperData as ComponentClass<PageOwnProps, PageState>
