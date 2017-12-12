import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { Card, WingBlank, WhiteSpace, Button, Picker, List, Grid, Toast, Flex } from 'antd-mobile';
// import test1 from '../../img/test1.jpg';
// import test2 from '../../img/test2.jpg';
// let test1 = '../../img/test1.jpg'
// let test2 = '../../img/test2.jpg'

const lineObj = [
  {
    label: '1线',
    value: 'line1',
  }, {
    label: '2线',
    value: 'line2',
  }
];

const data = [
  {
    // icon: test1,
    text: `工单`,
  },
  {
    // icon: test2,
    text: `扫料`,
  }
]
const Circle = (props) => {
  const size = props.size || 20;
  const style = {
    borderRadius: size / 0.2,
    backgroundColor: '#1B87ED',
    width: size,
    height: size * 0.03,
    margin: 5,
  };
  return (
    <View style={style}>
      <Text style={styles.textClass}>{props.title}</Text>
    </View>
  );
};

export default class MiddleMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      lineName: [],
    };
  }

  onClick = () => {
    setTimeout(() => {
      this.setState({
        data: lineObj,
      });
    }, 500);
  }
  onChange = (lineName) => {
    this.setState({ lineName });
  }
  quit = () => {
    console.log('quit')
    // this.props.navigation.navigate('Login')
    this.props.navigation.goBack();
  }


  handleClickStation(index) {
    if (index === 0) {
      this.props.navigation.navigate('MoveStorehouse', { name: '区域内移库', userName: this.props.navigation.state.params.userName })
    } else if (index === 1) {
      console.log('111')
    }

    // index === 0 ? this.props.navigation.navigate('WorkOrder', { name: '工单激活', userName: this.props.navigation.state.params.userName, lineName: this.state.lineName })
    //   : this.props.navigation.navigate('Traceability', { name: '追溯记录', userName: this.props.navigation.state.params.userName, lineName: this.state.lineName })
  }
  // this.props.navigation.navigate('Traceability', { name: '交运追溯系统', userName: username })
  render() {
    return (
      <View >
        <WingBlank size="lg">
          <WhiteSpace size="lg" />

          <WingBlank style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={styles.subTitle}>菜单</Text>
          </WingBlank>
          <WingBlank style={{ marginBottom: 5 }}>
            <Flex justify="between">
              <Circle size={160} onPress={this.handleClickStation.bind(this, 0)} title='区域内移库' />
              <Circle size={160} title='盘点' />
            </Flex>
          </WingBlank>
          <WingBlank style={{ marginBottom: 5 }}>
            <Flex justify="between">
              <Circle size={160} title='按工单备料' />
              <Circle size={160} title='测试' />
            </Flex>
          </WingBlank>
          <WingBlank >

            <Button type='ghost' style={styles.quitButton}
              onClick={() => this.quit()}
            >{this.props.navigation.state.params.userName},退出登陆</Button>
          </WingBlank>
        </WingBlank>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subTitle: {
    marginBottom: 10,
    fontSize: 20,
    // padding: '30px 0 18px 0'
  },

  viewClass: {
    width: '100%',
    height: 140,
    //color: '#e6e6e6',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#0090e5',
    borderColor: '#0090e5',
  },
  textClass: {
    //backgroundColor: '#3783F1',
    color: '#FBFDFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '30%',
    fontSize: 20,
  },
  quitButton: {
    marginTop: 20
  }

});


// <Flex>
// <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }} >
//   <TouchableHighlight underlayColor='rgba(214,215,218,1)' onPress={this.handleClickStation.bind(this, 0)}>
//     <View style={styles.viewClass} >
//       <Text style={styles.textClass}>工单</Text>
//     </View>
//   </TouchableHighlight>
// </Flex.Item>
// <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
//   <TouchableHighlight underlayColor='rgba(214,215,218,1)' onPress={this.handleClickStation.bind(this, 1)}>

//     <View style={styles.viewClass}  >
//       <Text style={styles.textClass}>扫料</Text>
//     </View>
//   </TouchableHighlight>
// </Flex.Item>
// </Flex>

// <View style={[{ margin: 10 }]}><Text>Custom GridCell Style</Text></View>
// <Grid data={data1} columnNum={3} isCarousel onClick={(_el, index) => alert(index)} itemStyle={{ height: 150, backgroundColor: '#ffff00' }} />