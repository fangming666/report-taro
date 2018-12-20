/**
 * 环形图
 * */
import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import './ringDiagram.scss'

//加载hightChasrts
import * as Highcharts from 'highcharts';

import AssemblyHead from './../../public/assemblyHead/assemblyHead'

type PageStateProps = {
  counter: {
    reportObj: any
  }
}

type PageDispatchProps = {}

type PageOwnProps = {
  assemblyTitleText: string,
  chartId: string,
  ringDiagramProp: any,
  ringDiagramTitle?: string,
  propJudge?: boolean
}

type PageState = {
  ringDiagramArr: any[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface RingDiagram {
  props: IProps;
  state: PageState
}

@connect
class RingDiagram extends Component implements RingDiagram {
  static defaultProps = {
    assemblyTitleText: 'title',
    chartId: 'test',
    ringDiagramTitle: '知识点',
    ringDiagramProp: {},
    propJudge: false
  };

  constructor(props) {
    super(props);
    this.state = ({
      ringDiagramArr: []
    })
  }
  componentWillReceiveProps(prevProp,nextProp){
    if(prevProp !== nextProp){
      this.setState({
        ringDiagramArr:[]
      });
    }
  }

  componentDidMount(){
    if (this.props.counter.reportObj) {
      let ringDiagramArr: any[] = this.reformArr(this.props.ringDiagramProp.y_data, false, this.props.propJudge);
      let seriesArr: any[] = this.reformArr(this.props.ringDiagramProp.y_data, true, this.props.propJudge);
      if (!this.state.ringDiagramArr.length) {
        this.setState({
          ringDiagramArr
        });
      }
      Highcharts.chart(this.props.chartId, {
        chart: {
          spacing: [40, 0, 40, 0],
          backgroundColor: '#FAFAFA'
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        //@ts-ignore
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            size: 150,
            colors: ["#F768A3", "#EBC44F", "#9BCB0A", "#06C4EC", "#673AB7", "#AFCDE0"],
            dataLabels: {
              enabled: false,
              softConnector: false,
            }
          }
        },
        //@ts-ignore
        series: [{
          type: 'pie',
          innerSize: '70%',
          data: seriesArr
        }]
      });
    }
  }

  private reformArr(reqArr: any[], seriesSwitch: boolean = false, judge: boolean = false) {
    let temporaryScore: number = 0;
    let temporaryProp: number = 0;
    return reqArr.reduce((initArr, item, index) => {
      if (!item.siQues) {
        temporaryScore += item.lost_score;
        temporaryProp += item.lost_score_prop;
      } else {
        initArr = seriesSwitch ? [...initArr, [item.name, item.lost_score_prop]]
          : [...initArr, {'lost_score': item.lost_score, 'lost_score_prop': item.lost_score_prop, 'name': item.name}];
      }
      if (index === reqArr.length - 1) {
        let resultName: string = judge ? '其他能力' : '其他知识点';
        initArr = seriesSwitch ? [...initArr, [resultName, temporaryProp]] : [...initArr, {
          'name': resultName,
          'lost_score': temporaryScore,
          'lost_score_prop': temporaryProp
        }]
      }
      return initArr
    }, []);
  }

  render() {
    return (
      <View className={'ring-diagram'}>
        <AssemblyHead assemblyTitle={this.props.assemblyTitleText}>
        </AssemblyHead>
        <View id={this.props.chartId} className={'ring-diagram-chart'}>
        </View>
        <View className={'ring-diagram-table-warp'}>
          <table className={'ring-diagram-table'} cellPadding="0" cellSpacing="0">
            <thead>
            <tr>
              <th>{this.props.ringDiagramTitle}</th>
              <th>丢分值</th>
              <th>失分占比</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.ringDiagramArr.length ? this.state.ringDiagramArr.map(item => {
                  return <tr>
                    <td>{item.name}</td>
                    <td>{item.lost_score}</td>
                    <td>{item.lost_score_prop}%</td>
                  </tr>
                })
                : null
            }
            </tbody>
          </table>
        </View>
      </View>
    )
  }
}

export default RingDiagram as ComponentClass<PageOwnProps, PageState>
