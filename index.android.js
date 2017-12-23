// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import { StackNavigator } from 'react-navigation';
// import { Button } from 'antd-mobile';


// import Login from './src/components/login/index'
// import Traceability from './src/components/traceability/index'
// import MiddleMenu from './src/components/middleMenu/index'
// import MoveStorehouse from './src/components/moveStorehouse/index'
// import Inventory from './src/components/inventory/index'
// import PrepareMaterials from './src/components/prepareMaterials/index'
// import WorkOrder from './src/components/workOrder/index'


// export default class JyPDAProject extends Component {


//   render() {
//     return (
//       <View style={styles.container}>
//         <Login navigation={this.props.navigation} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#f8f8f8',
//   },

// });


// const MainScreen = StackNavigator({
//   JyPDAProject: {
//     screen: JyPDAProject,
//   },
//   Login: {
//     screen: Login,
//   },
//   MiddleMenu: {
//     screen: MiddleMenu,
//     navigationOptions: ({ navigation }) => ({
//       title: navigation.state.params.name,
//       headerTitleStyle: {
//         alignSelf: 'center'
//       }
//     }),
//   },
//   MoveStorehouse: {
//     screen: MoveStorehouse,
//     navigationOptions: ({ navigation }) => ({
//       title: navigation.state.params.name,
//       headerTitleStyle: {
//         alignSelf: 'center'
//       }
//     }),
//   },
//   PrepareMaterials: {
//     screen: PrepareMaterials,
//     navigationOptions: ({ navigation }) => ({
//       title: navigation.state.params.name,
//       headerTitleStyle: {
//         alignSelf: 'center'
//       }
//     }),
//   },
//   Inventory: {
//     screen: Inventory,
//     navigationOptions: ({ navigation }) => ({
//       title: navigation.state.params.name,
//       headerTitleStyle: {
//         alignSelf: 'center'
//       }
//     }),
//   },
//   WorkOrder: {
//     screen: WorkOrder,
//     navigationOptions: ({ navigation }) => ({
//       title: navigation.state.params.name,
//       headerTitleStyle: {
//         alignSelf: 'center'
//       },
//       headerRight: <Button size='small' type='ghost'>{'线体:' + navigation.state.params.lineName[0]}</Button>
//     }),
//   },
//   Traceability: {
//     screen: Traceability,
//     navigationOptions: ({ navigation }) => ({
//       title: navigation.state.params.name,
//       headerTitleStyle: {
//         alignSelf: 'center'
//       },
//       headerRight: <Button size='small' type='ghost'>{'线体:' + navigation.state.params.lineName[0]}</Button>
//     }),
//   },

// });


// AppRegistry.registerComponent('jyPDAProject', () => MainScreen);




import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Root from './src/Root.js';


export default class JyPDAProject extends Component {
  render() {
    return (
      <Root />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('jyPDAProject', () => JyPDAProject);