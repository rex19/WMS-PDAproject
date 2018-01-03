import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NetInfo
} from 'react-native';
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../actions/loginAction';// 导入action方法
import { NavigationActions } from 'react-navigation';
import { Button, List, InputItem, WhiteSpace, WingBlank, Modal, Toast } from 'antd-mobile';

import MiddleMenu from '../middleMenu/index';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';
const LoginUrl = PublicParam.loginUrl
const alert = Modal.alert;
let num = 1;

// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'MiddleMenu', params: { name: '菜单', key: this.props.navigation.state.key } })
//   ]
// })

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'admin',
      passWord: '',
      userNameFocued: false,
      passwordFocued: false,
      animating: false
    };
  }
  static navigationOptions = {
    title: '登录页面',
  };


  shouldComponentUpdate(nextProps, nextState) {
    console.log('login-shouldComponentUpdate', nextProps, this.props)
    if (nextProps != this.props) {
      // 登录完成,切成功登录
      if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MiddleMenu', params: { name: '菜单', key: this.props.navigation.state.key } })
          ]
        }))
        return false;
      } else if (nextProps.status === '登录出错' && nextProps.isSuccess) {
        Toast.success('账号密码错误', 1);
      }
    }
    console.log('nextProps === this.props', nextProps, this.props)
    return true;
  }

  showToast = () => {
    this.setState({ animating: true });
  }

  mockDataDebug = () => {
    let mockLogin = mockJson.ApiCheckLogin
    this.setState({ animating: false })
    this.jumpPage('guest')
    Toast.success(mockLogin.Message, 1);
  }

  handleUserNameOnBlur = () => {
    this.setState({
      passwordFocued: true,
      userNameFocued: false
    })
  }

  handlePasswordOnBlur = () => {
    this.setState({
      passwordFocued: false
    })
  }

  handleUserNameChange = (userName) => {
    this.setState({ userName: userName })
  }
  handlePasswordChange = (passWord) => {
    this.setState({ passWord: passWord })
  }

  handleLogin = () => {

    if (this.state.userName.length > 0 && this.state.passWord.length > 0) {
      console.log('this.state.userName.length>0&& this.state.passWord.length>0')
      this.props.login(this.state.userName, this.state.passWord)
      return
    }
    console.log('handleLogin 请输入用户名密码', this.state.userName, this.state.passWord)
  }

  render() {
    // const { login } = this.props;
    const { userName, passWord } = this.state;
    return (
      <View >
        <Text style={styles.title}>
          登陆
                </Text>
        <List >
          <InputItem
            clear
            onChange={this.handleUserNameChange}
            focused={this.state.userNameFocued}
            onBlur={this.handleUserNameOnBlur}
            value={this.state.userName}
            autoFocus
          ><Text style={styles.span}>用户名:</Text></InputItem>
          <InputItem
            clear
            type="password"
            focused={this.state.passwordFocued}
            onChange={this.handlePasswordChange}
            onBlur={this.handlePasswordOnBlur}
            value={this.state.passWord}
          ><Text style={styles.span}>密码:</Text></InputItem>
        </List>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button type='primary' onClick={this.handleLogin} >登陆</Button>
        </WingBlank>
      </View>
    );
  }
}
//() => login(userName, passWord)
export default connect(
  (state) => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
  }),
  (dispatch) => ({
    login: (userName, passWord) => dispatch(loginAction.login(userName, passWord)),
  })
)(Login)

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  span: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

