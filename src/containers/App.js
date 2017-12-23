import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './login/index'
import MiddleMenu from './middleMenu/index'
import MoveStorehouse from './moveStorehouse/index'
import Inventory from './inventory/index'
import PrepareMaterials from './prepareMaterials/index'
// import Traceability from '../components/traceability/index'
// import MoveStorehouse from '../components/moveStorehouse/index'

// import WorkOrder from '../components/workOrder/index'


class Main extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Login navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
});

const App = StackNavigator({
  Main: {
    screen: Main,
  },
  Login: {
    screen: Login,
  },
  MiddleMenu: {
    screen: MiddleMenu,
    navigationOptions: ({ navigation }) => ({
      title: '菜单',
      // headerBackTitle: '返回',
      // gesturesEnabled: true,
      // headerMode: screen,
      // headerRight: (
      //   <Text onPress={navigation.state.params ? navigation.state.params.navigatePress : null}>
      //     返回
      //   </Text>
      // ),
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  MoveStorehouse: {
    screen: MoveStorehouse,
    navigationOptions: ({ navigation }) => ({
      title: '区域内移库',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  Inventory: {
    screen: Inventory,
    navigationOptions: ({ navigation }) => ({
      title: '盘点',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  PrepareMaterials: {
    screen: PrepareMaterials,
    navigationOptions: ({ navigation }) => ({
      title: '按工单备料',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
}, {
    // {
    animationEnabled: false, // 切换页面时是否有动画效果
    // tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  });

export default App

// navigationOptions: ({ navigation }) => ({
//   title: navigation.state.params.name,
//   headerTitleStyle: {
//     alignSelf: 'center'
//   }
// }),





// export default class App extends Component {
//   render() {
//     return (
//       <View >
//         <Text >
//           Welcome to React Native!
//         </Text>
//       </View>
//     );
//   }
// }