import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { NavigationActions } from 'react-navigation';
// import { connect } from 'react-redux'; // 引入connect函数
import { Card, WingBlank, WhiteSpace, Button, Picker, List, Grid, Toast, Flex } from 'antd-mobile';
// import test1 from '../../img/test1.jpg';
// import test2 from '../../img/test2.jpg';
// let test1 = '../../img/test1.jpg'
// let test2 = '../../img/test2.jpg'
const Item = List.Item;
const Brief = Item.Brief;

// const JumpAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'MoveStorehouse', params: { token: '123456' } }),
//     NavigationActions.navigate({ routeName: 'Inventory' }),
//     NavigationActions.navigate({ routeName: 'PrepareMaterials' }),
//   ]
// })
const navigateActionToMoveStorehouse = NavigationActions.navigate({
  routeName: 'MoveStorehouse',
  params: {},
  action: NavigationActions.navigate({ routeName: 'MoveStorehouse' })
})
const navigateActionToInventory = NavigationActions.navigate({
  routeName: 'Inventory',
  params: {},
  action: NavigationActions.navigate({ routeName: 'Inventory' })
})
const navigateActionToPrepareMaterials = NavigationActions.navigate({
  routeName: 'PrepareMaterials',
  params: {},
  action: NavigationActions.navigate({ routeName: 'PrepareMaterials' })
})

// const backAction = NavigationActions.back({
//   key: ''
// })
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' }),
  ]
})
class MiddleMenu extends Component {
  constructor(props) {
    super(props);
  }


  quit = () => {
    console.log('quit', this.props.navigation.state.params.key)
    // this.props.navigation.goBack();
    this.props.navigation.dispatch(resetAction)
    // this.props.navigation.dispatch(NavigationActions.back({
    //   key: this.props.navigation.state.params.key
    // }))
  }

  handleClick = (params) => () => {

    console.log('handleClick', params)
    switch (params) {
      case 'MoveStorehouse':
        this.props.navigation.dispatch(navigateActionToMoveStorehouse)
        break;
      case 'Inventory':
        this.props.navigation.dispatch(navigateActionToInventory)
        break;
      case 'PrepareMaterials':
        this.props.navigation.dispatch(navigateActionToPrepareMaterials)
        break;
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
              onClick={this.handleClick('MoveStorehouse')}
            >
              区域内移库 <Brief>点我点我</Brief>
            </Item>
            <WhiteSpace size="lg" />
            <Item
              arrow="horizontal"
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              multipleLine
              onClick={this.handleClick('Inventory')}
            >
              盘点 <Brief>点我点我</Brief>
            </Item>
            <WhiteSpace size="lg" />
            <Item
              arrow="horizontal"
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              multipleLine
              onClick={this.handleClick('PrepareMaterials')}
            >
              按工单备料 <Brief>点我点我</Brief>
            </Item>
            <WhiteSpace size="lg" />
          </List>


          <WingBlank >
            <Button type='ghost' style={styles.quitButton}
              onClick={() => this.quit()}
            >退出登陆</Button>
          </WingBlank>
        </WingBlank>
      </View>
    )
  }
}
export default MiddleMenu

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


