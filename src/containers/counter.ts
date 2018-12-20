import {bindActionCreators} from "redux";
import {connect} from '@tarojs/redux'
import * as counter from "./../actions/counter"


export default connect(
  state=>state,
  dispatch=>bindActionCreators(counter as any,dispatch)
)
