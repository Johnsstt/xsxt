import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import *as action from '../../Redux/Action/Index'



const Main = mySeting => {
  let seting = {
    id: '', //应用唯一id表示
    url: '', //请求地址
    data: {},
    component: <div></div>,
  };
  for(let key in mySeting) {
    seting[key] = mySeting[key];
  }



  class Index extends Component {
    static defaultProps = { seting }
    constructor(props,context) {
        super(props,context);
    }
    
    render () { 

      let tpl = <this.props.seting.component {...this.props} state={this.props.state.toJS()} />;
      console.log('-->tpl', tpl);
      return tpl
    }


    componentDidMount() {
      console.log('seting', this.props);
      if(this.props.seting.url) {
        this.props.fetchPosts(this.props.seting.url, this.props.seting.data);
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.state.get('isFetching')) {
        return false
      }
      return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

  }

  return connect(state => {
    let { productRecord, saleRecord, requestData, testData } = state;
    return {
      state: state['fetchData'],
      productRecord,
      saleRecord,
      requestData
    }
  }, action)(Index);

}

export default Main;