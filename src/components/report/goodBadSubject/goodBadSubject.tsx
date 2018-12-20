import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View,Text} from '@tarojs/components'
import connect from "../../../containers/counter"

import './goodBadSubject.scss'

//加载hightChasrts
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);
import AssemblyHead from './../../public/assemblyHead/assemblyHead'


import {arrMIn} from '../../../utils/arrMin'

type PageStateProps = {
  counter: {
    reportObj: any
  }
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface GoodBadSubject {
  props: IProps;
  state: PageState
}

@connect
class GoodBadSubject extends Component implements GoodBadSubject {
  componentDidMount() {
    if (this.props.counter.reportObj.courseStatus) {
      Highcharts.chart('containerGood', {
          chart: {
            polar: true,
            type: 'area',
            backgroundColor: '#F7FCFF',
          }
          ,
          title: {
            text: "",
          }
          ,
          colors: ['#41BDE7'],
          pane:
            {
              startAngle: 0,
              endAngle: 360
            }
          ,
          exporting: {
            enabled: true
          }
          ,
          credits: {
            enabled: false
          }
          ,
          xAxis: {
            categories: this.props.counter.reportObj.courseStatus.x_data,
            tickmarkPlacement: 'on',
            lineWidth:
              0,
            gridLineColor:
              '#96C2DE',
            gridLineWidth:
              0.5,
            labels:
              {
                format: '{value}',
              }
            ,
          }
          ,
          plotOptions: {
            series: {
              marker: {
                radius: 2,  //曲线点半径，默认是4
                symbol:
                  'diamond' //曲线点类型："circle", "square", "diamond", "triangle","triangle-down"，默认是"circle"
              }
              ,
              lineWidth: 1,
            }
            ,
            column: {
              colorByPoint: true
            }
          }
          ,
          yAxis: {
            lineWidth: 0,
            min: arrMIn(this.props.counter.reportObj.courseStatus.y_data),
            labels:
              {
                format: '{value}%',
              },
            gridLineWidth:
              0.7,
            gridLineColor:
              '#96C2DE',
            tickAmount:
              5,
          }
          ,
          tooltip: {
            enabled: false
          }
          ,
          legend: {
            enabled: false
          },
          //@ts-ignore
          series: [{
            data: this.props.counter.reportObj.courseStatus.y_data,
            pointPlacement: 'on'
          }]
        }
      );
    }
  }

  render() {
    return (
      <View className={'good-bad-subject'}>
        <AssemblyHead assemblyTitle={'优劣学科'}>
        </AssemblyHead>
          <View id={'containerGood'} className={'container-good'}>
          </View>


        <View className={'good-bad-subject-info-warp'}>
          <View className={'good-bad-subject-info'}>
            <Text className={'good-bad-subject-info-normal'}>优势学科：</Text>
            {this.props.counter.reportObj.courseStatus&&this.props.counter.reportObj.courseStatus.odds.map(item =>{
              return <Text>{item}、</Text>
            })}
          </View>
          <View className={'good-bad-subject-info'}>
            <Text className={'good-bad-subject-info-normal'}>劣势学科：</Text>
            {this.props.counter.reportObj.courseStatus&&this.props.counter.reportObj.courseStatus.inferior.map(item =>{
              return <Text>{item}、</Text>
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default GoodBadSubject as ComponentClass<PageOwnProps, PageState>
