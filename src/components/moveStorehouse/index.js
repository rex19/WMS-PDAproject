import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Button, List, Picker, InputItem, WhiteSpace, Modal, WingBlank, Toast, Radio, Icon, ActivityIndicator, TextareaItem } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';

const { GetALlFormTypeUrl, GetWMSFormByFormTypeIdUrl, MovementRecordPostUrl } = PublicParam

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
      //操作类型和单据号的数据state
      OperationTypeArray: [],
      DocsNumberArray: [],
      OperationTypeValue: [],
      DocsNumberValue: [],
      //input
      uidValue: '',
      targetValue: '',
      UIDFocused: false,
      targetFocused: false,
      //后台反馈的消息
      MessageValue: ''
    };
  }
  componentDidMount() {
    this.fetchRequestInitFunc()
  }

  fetchRequestInitFunc = () => {
    fetch(GetALlFormTypeUrl, { method: "GET" })
      .then((response) => {
        return response.json();
      }).then((responseJson) => {
        //GetALlFormTypeUrl拉过来的操作类型Array
        this.setState({ OperationTypeArray: responseJson.Data }, this.fetchRequestFunc(1))
      }).catch((error) => {
        console.log('GetALlFormTypeUrlError::', error)
      }).done();
  }
  fetchRequestFunc = (param = 1) => {
    //第二个fetch，初始化一个DocsNumberArray下拉菜单的值
    fetch(GetWMSFormByFormTypeIdUrl + param,
      { method: "GET" }
    ).then((response) => {
      return response.json();
    }).then((responseJson) => {
      this.setState({ DocsNumberArray: responseJson.Data })
    })
  }

  onClick = (key) => () => {
    this.setState({ [key]: lineObj })
  }
  onChange = (key) => (value) => {
    this.setState({ [key]: value });
    if (key === 'DocsNumberValue') {
      this.setState({ UIDFocused: true });
    } else if (key === 'OperationTypeValue') {
      this.fetchRequestFunc()
    }
  }
  uidOnBlur = () => {
    this.setState({ UIDFocused: false, targetFocused: true });
  }
  handleActivation() {
    this.setState({ UIDFocused: false, targetFocused: false });
    fetch(MovementRecordPostUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        FormTypeId: this.state.OperationTypeValue,
        WMSFormId: this.state.DocsNumberValue,
        ContainerNumber: this.state.uidValue,
        LocationNumber: this.state.targetValue,
        UserId: 1
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetch3', responseJson)
      if (responseJson.Status === 200) {
        //GetALlFormTypeUrl拉过来的操作类型Array
        this.setState({ MessageValue: responseJson.Data.toString() })
      }
    }).catch((error) => {
      console.log('MovementRecordPostUrlError::', error)
    }).done();
  }
  //onClick={this.onClick('DocsNumberArray')}
  render() {
    console.log('render', this.state)
    return (
      <View >
        <WhiteSpace size="sm" />
        <List >
          <Picker
            data={this.state.OperationTypeArray}
            cols={1}
            value={this.state.OperationTypeValue}
            onChange={this.onChange('OperationTypeValue')}
          >
            <List.Item arrow="horizontal" last ><Text style={styles.span}>操作类型:</Text></List.Item>
          </Picker>
          <Picker
            data={this.state.DocsNumberArray}
            cols={1}
            value={this.state.DocsNumberValue}
            onChange={this.onChange('DocsNumberValue')}
          >
            <List.Item arrow="horizontal" last ><Text style={styles.span}>单据号:</Text></List.Item>
          </Picker>
          <InputItem
            focused={this.state.UIDFocused}
            value={this.state.uidValue}
            onBlur={this.uidOnBlur}
            onChange={this.onChange('uidValue')}
            editable={true}
          ><Text style={styles.span}>UID:</Text></InputItem>
          <InputItem
            value={this.state.targetValue}
            focused={this.state.targetFocused}
            onChange={this.onChange('targetValue')}
            editable={true}
          ><Text style={styles.span}>目标库位:</Text></InputItem>
        </List>

        <Button type='primary' style={styles.quitButton}
          onClick={() => alert('提交', '确定提交么?😄', [
            { text: '取消', onPress: () => console.log('不提交') },
            { text: '确定', onPress: () => this.handleActivation() },
          ])}
        >提交</Button>
        <WhiteSpace size="sm" />
        <List renderHeader={() => '消息'}>
          <TextareaItem
            rows={10}
            count={100}
            editable={false}
            value={this.state.MessageValue}
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
