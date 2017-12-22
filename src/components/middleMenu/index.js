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
const Item = List.Item;
const Brief = Item.Brief;

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
    borderRadius: size / 0.03,
    backgroundColor: '#1B87ED',
    width: size,
    height: size * 0.8,
    margin: 5,
  };

  return (
    <View style={style} onPress={handleClickStation}>
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


  handleClickStation = (index, e) => {
    console.log('handleClickStation', index, e)
    if (index === 0) {
      this.props.navigation.navigate('MoveStorehouse', { name: '区域内移库', userName: this.props.navigation.state.params.userName })
    } else if (index === 1) {
      this.props.navigation.navigate('Inventory', { name: '盘点', userName: this.props.navigation.state.params.userName })
    } else if (index === 2) {
      this.props.navigation.navigate('PrepareMaterials', { name: '按工单备料', userName: this.props.navigation.state.params.userName })
    }
  }
  render() {
    return (
      <View >
        <WingBlank size="lg">
          <WhiteSpace size="lg" />

          <WingBlank style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={styles.subTitle}>菜单</Text>
          </WingBlank>
          <List renderHeader={() => '菜单'} className="my-list">
            <WhiteSpace size="sm" />
            <Item
              arrow="horizontal"
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              multipleLine
              onClick={() => { this.props.navigation.navigate('MoveStorehouse', { name: '区域内移库', userName: this.props.navigation.state.params.userName }) }}
            >
              区域内移库 <Brief>点我点我</Brief>
            </Item>
            <WhiteSpace size="lg" />
            <Item
              arrow="horizontal"
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              multipleLine
              onClick={() => { this.props.navigation.navigate('Inventory', { name: '盘点', userName: this.props.navigation.state.params.userName }) }}
            >
              盘点 <Brief>点我点我</Brief>
            </Item>
            <WhiteSpace size="lg" />
            <Item
              arrow="horizontal"
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              multipleLine
              onClick={() => { this.props.navigation.navigate('PrepareMaterials', { name: '按工单备料', userName: this.props.navigation.state.params.userName }) }}
            >
              按工单备料 <Brief>点我点我</Brief>
            </Item>
            <WhiteSpace size="lg" />
          </List>

          <WingBlank style={{ marginBottom: 5 }}>
            <Flex justify="between">
              <TouchableHighlight underlayColor='rgba(214,215,218,1)' onPress={this.handleClickStation.bind(this, 0)}>
                <View style={styles.menuView} onPress={this.handleClickStation}>
                  <Text style={styles.textClass}>区域内移库</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgba(214,215,218,1)' onPress={this.handleClickStation.bind(this, 1)}>
                <View style={styles.menuView} >
                  <Text style={styles.textClass}>盘点</Text>
                </View>
              </TouchableHighlight>
            </Flex>
          </WingBlank>
          <WingBlank style={{ marginBottom: 5 }}>
            <Flex justify="between">
              <TouchableHighlight underlayColor='rgba(214,215,218,1)' onPress={this.handleClickStation.bind(this, 2)}>
                <View style={styles.menuView}>
                  <Text style={styles.textClass}>按工单备料</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgba(214,215,218,1)' onPress={this.handleClickStation.bind(this, 3)}>
                <View style={styles.menuView} >
                  <Text style={styles.textClass}>测试</Text>
                </View>
              </TouchableHighlight>
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
// <Circle size={160} onPressFunction={this.handleClickStation(2)} title='按工单备料' />
// <Circle size={160} onPressFunction={this.handleClickStation(3)} title='测试' />
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
  },
  menuView: {
    borderRadius: 160 / 0.03,
    backgroundColor: '#1B87ED',
    width: 160,
    height: 160 * 0.8,
    margin: 5,
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