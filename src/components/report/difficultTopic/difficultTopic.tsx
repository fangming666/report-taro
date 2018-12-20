/**
 *难易题目得分率双折线图组件
 * */
import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import './difficultTopic.scss'

//加载hightChasrts
import * as Highcharts from 'highcharts';

import AssemblyHead from './../../public/assemblyHead/assemblyHead'
import {arrMIn} from "../../../utils/arrMin";

type PageStateProps = {
  counter: {
    reportObj: any
  }
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface DifficultTopic {
  props: IProps;
  state: PageState
}

@connect
class DifficultTopic extends Component implements DifficultTopic {
  componentDidMount() {
    if (this.props.counter.reportObj.diffData) {
      Highcharts.chart('difficultTopic', {
        title: {
          text: ''
        },

        yAxis: {
          title: {
            text: null
          },
          allowDecimals: false,
          tickPixelInterval: 40,
          lineColor: '#DDE9F0',
          minRange: 30,
          gridLineWidth: 0,
          alternateGridColor: '#F4FBFF',
          min: arrMIn([arrMIn(this.props.counter.reportObj.diffData.myRates), arrMIn(this.props.counter.reportObj.diffData.schoolRates)]),
          max: 100,
          labels: {
            style: {
              "color": "#888",
              "fontSize": "9px",
            },
            formatter: function () {
              return this.value + '%'
            }
          }
        },
        xAxis: {
          lineColor: '#DDE9F0',
          tickWidth: 0,
          labels: {
            style: {
              "color": "#888",
              "fontSize": "9px",
            }
          },
          categories: this.props.counter.reportObj.diffData.xData
        },
        credits: {
          enabled: false,
        },
        //@ts-ignore
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 0
          }
        },
        colors: ['#3EBEEB','#9F60F3 '],
        //@ts-ignore
        series: [{
          name: '我的得分率',
          data: this.props.counter.reportObj.diffData.myRates,
          shadow: "0 6px 4px 0 rgba(73,161,192,0.27)"
        },
          {
            name: '学校得分率',
            data: this.props.counter.reportObj.diffData.schoolRates,
            shadow: "0 6px 4px 0 rgba(73,161,192,0.27)"
          }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      });
    }
  }

  render() {
    return (
      <View className={'difficult-topic'}>
        <AssemblyHead assemblyTitle={'难易题目得分率'}>
        </AssemblyHead>
        <View id={'difficultTopic'} className={'difficult-topic-chart'}>

        </View>
      </View>
    )
  }
}

export default DifficultTopic as ComponentClass<PageOwnProps, PageState>
