/**
 *学校战胜率变化组件
 * */
import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"
//加载hightChasrts
import * as Highcharts from 'highcharts';

import AssemblyHead from './../../public/assemblyHead/assemblyHead'
import './schoolPercent.scss'

//加载方法
import {arrMIn} from '../../../utils/arrMin'
import {assemble} from '../../../utils/assembleArr'

type PageStateProps = {
  counter: {
    reportObj: any
  }
}

type PageDispatchProps = {}

type PageOwnProps = {
  table_switch?: boolean
}

type PageState = {
  SchoolPercentXDate: string[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface SchoolPercent {
  props: IProps;
  state: PageState
}

@connect
class SchoolPercent extends Component implements SchoolPercent {
  public static defaultProps = {
    table_switch: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.counter.reportObj.trendData) {
      let xDataArr: any[] = assemble(this.props.counter.reportObj.trendData.data, 'exam_date');
      let seriesData: any[] = assemble(this.props.counter.reportObj.trendData.data, 'school_percent');
      Highcharts.chart('container', {
        title: {
          text: ''
        },
        colors: ['#3EBEEB'],
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
          min: arrMIn(seriesData),
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
          categories: xDataArr
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
        //@ts-ignore
        series: [{
          data: seriesData,
          shadow: "0 6px 4px 0 rgba(73,161,192,0.27)"
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                enabled: false,
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
      <View className={'school-percent'}>
        <AssemblyHead assemblyTitle={'校战胜率变化'}>
        </AssemblyHead>
        <View
          id="container"
          className="container">
        </View>
        {this.props.table_switch ?
          <table className={'exam-paper-table school-percent-table'}
                 cellPadding="0"
                 cellSpacing="0">
            <thead>
            <tr>
              <th>考试时间</th>
              <th>考试名称</th>
              <th>战胜率</th>
            </tr>
            </thead>
            <tbody>
            {JSON.stringify(this.props.counter.reportObj.trendData) !== undefined ?
              this.props.counter.reportObj.trendData.data.map(item => {
                return <tr>
                  <td>{item.exam_date}</td>
                  <td>{item.exam_name}</td>
                  <td>{item.school_percent}%</td>
                </tr>
              })
              : null}

            </tbody>
          </table> : null}
        {/*提分建议*/}
        <View className={'school-percent-info'}>
          <View>
            {JSON.stringify(this.props.counter.reportObj.trendData) !== undefined ? this.props.counter.reportObj.trendData.promp_desc : null}
          </View>
          <View>
            {JSON.stringify(this.props.counter.reportObj.trendData) !== undefined ? this.props.counter.reportObj.trendData.promp_supp_desc : null}
          </View>
        </View>
      </View>
    )
  }
}

export default SchoolPercent as ComponentClass<PageOwnProps, PageState>
