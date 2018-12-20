/**
 *层次排名柱状图组件
 * */
import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import './hierarchicalRanking.scss'

//加载hightChasrts
import * as Highcharts from 'highcharts';
import AssemblyHead from './../../public/assemblyHead/assemblyHead'


import {assemble} from '../../../utils/assembleArr'

type PageStateProps = {
  counter: {
    reportObj: any
  }
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface HierarchicalRanking {
  props: IProps;
  state: PageState
}

@connect
class HierarchicalRanking extends Component implements HierarchicalRanking {
  componentDidMount() {
    if (this.props.counter.reportObj.partWhole) {
      let xData: string[] = assemble(this.props.counter.reportObj.partWhole.data, 'cutStandard');
      let seriesData: any[] = this.hierarchicalAssemble(this.props.counter.reportObj.partWhole.data);
      Highcharts.chart('containerHierarchical', {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false,
        },
        subtitle: {
          text: ''
        },
        legend: {
          enabled: false
        },
        xAxis: {
          categories: xData,
          title: {
            text: '分数',
            aline: 'high',
            rotation: 0,
            x: 160,
            offset: 10,
            style: {
              "color": " #9DAEBF",
              "fontSize": "9px",
            }
          },
          labels: {
            style: {
              "color": " #9DAEBF",
              "fontSize": "9px",
            }
          },
          crosshair: true
        },
        yAxis: {
          min: 0,
          tickPosition: "inside",
          offset: -13,
          title: {
            offset: 0,
            text: '人数',
            rotation: 0,
            y: 2,
            x: -28,
            align: 'high',
            style: {
              "color": " #9DAEBF",
              "fontSize": "9px",
            }
          },
          allowDecimals: false,
          tickPixelInterval: 40,
          lineColor: '#DDE9F0',
          minRange: 30,
          gridLineWidth: 0,
          alternateGridColor: '#F4FBFF',
          labels: {
            style: {
              "color": " #9DAEBF",
              "fontSize": "9px",
            }
          }
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        //@ts-ignore
        series: [{
          data: seriesData
        }]
      });
    }
  }

  private hierarchicalAssemble(reqArr: any[]) {
    return reqArr.reduce((initArr, item) => {
      initArr = [...initArr, {y: item.num, color: item.isMyPart ? '#FAC102' : '#32BEF2'}];
      return initArr
    }, [])
  }

  render() {
    return (
      <View className={'hierarchical-ranking'}>
        <AssemblyHead assemblyTitle={'层次排名'}>
        </AssemblyHead>
        <View id={'containerHierarchical'} className={'container'}>

        </View>
      </View>
    )
  }
}

export default HierarchicalRanking as ComponentClass<PageOwnProps, PageState>
