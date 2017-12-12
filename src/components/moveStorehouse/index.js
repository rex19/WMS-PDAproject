import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Button, List, InputItem, WhiteSpace, Modal, WingBlank, Toast, Radio, Icon, ActivityIndicator, TextareaItem } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';
const GetWorkOrderUrl = PublicParam.GetWorkOrderUrl
const PostWorkOrderUrl = PublicParam.PostWorkOrderUrl

const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

let num = 0;
let ListSweepRecordArray = [];
let dataArray = [];
export default class MoveStorehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uidValue: '',
      targetValue: ''
    };
  }

  handleActivation() {

  }

  render() {
    return (
      <View >

        <WhiteSpace size="sm" />
        <List >
          <InputItem
            // focused={this.state.workOrderNoFocused}
            value={this.state.uidValue}
            editable={false}
          ><Text style={styles.span}>UID:</Text></InputItem>
          <InputItem
            value={this.state.targetValue}
            // focused={this.state.PlanStartDateTimeFocused}
            editable={false}
          ><Text style={styles.span}>目标库位:</Text></InputItem>
        </List>

        <Button type='primary' style={styles.quitButton}
          onClick={() => alert('激活', '确定激活么?😄', [
            { text: '取消', onPress: () => console.log('不激活') },
            { text: '确定', onPress: () => this.handleActivation() },
          ])}
        >提交</Button>

        <List renderHeader={() => '消息'}>
          <TextareaItem
            rows={5}
            count={100}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 0,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  contentContainer: {
    paddingVertical: 20,
    height: 200,
    // showsVerticalScrollIndicator :true,
    // overScrollMode :'auto',
  },
  Accordion: {
    marginTop: 10,
    marginBottom: 5,
    height: 180,
    width: '100%',
    // overflow:'scroll',
    // backgroundColor: 'red'
  },
  span: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  quitButton: {
    marginTop: 10
  }
});
