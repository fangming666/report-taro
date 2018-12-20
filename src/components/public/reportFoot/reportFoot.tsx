import {ComponentClass} from 'react'
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import connect from "../../../containers/counter"

import './reportFoot.scss'

type PageStateProps = {
  counter: {}
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps


interface ReportFoot {
  props: IProps;
  state: PageState
}

@connect
class ReportFoot extends Component implements ReportFoot {
  render() {
    return (
      <View className={'report-foot'}>
        <dl>
          <dt>
            什么是学生帐号？
          </dt>
          <dd>
            除了家长可以查看孩子成绩，学生也能自己登录账号查看成绩分析！ 学生账号内容比家长端多了两项：使用考试错题本、筛选出错题在线考试。
            学生账号如何登录？
          </dd>
        </dl>
        <dl>
          <dt>
            学生账号如何登录？
          </dt>
          <dd>
            <p>1、电脑打开www.yuandingbang.cn。</p>
            <p>
              2、首次登陆使用临时账号和密码；对于12月13日之前
              绑定孩子的家长，学生临时账号为孩子身份证号
              码，密码是123123。
              对于12月13日之后绑定孩子的家长，学生临时账号
              和密码已通过系统推送到了孩子家庭管理员的 公众
              号首页。
            </p>
            <p>
              3、首次登陆成功后，根据系统提示创建固定账号和密
              码。以后再登录就使用固定账号密码登录。
            </p>
          </dd>
        </dl>
      </View>
    )
  }
}

export default ReportFoot as ComponentClass<PageOwnProps, PageState>
