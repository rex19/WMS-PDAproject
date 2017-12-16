import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Pagination, Button, Picker, List, InputItem, WhiteSpace, Modal, WingBlank, NoticeBar, Toast, Radio, Icon, ActivityIndicator, TextareaItem } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';
const GetWorkOrderUrl = PublicParam.GetWorkOrderUrl
const PostWorkOrderUrl = PublicParam.PostWorkOrderUrl

const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;
const TaskOrderDataArray = [
  {
    label: '1线',
    value: 'line1',
  }, {
    label: '2线',
    value: 'line2',
  }
];
const locale = {
  prevText: '上一种',
  nextText: '下一种',
};

let num = 0;
let ListSweepRecordArray = [];
let dataArray = [];
export default class PrepareMaterials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TaskOrderDataArray: [],
      TaskOrderData: [],
      uidValue: '',
      targetValue: ''
    };
  }
  onClick = () => {
    setTimeout(() => {
      this.setState({
        TaskOrderDataArray: TaskOrderDataArray,
      });
    }, 500);
  }
  onChange = (TaskOrderData) => {
    this.setState({ TaskOrderData });
  }
  handleActivation() {

  }
  // <Text style={{ backgroundColor: 'yellow', color: 'red', textAlign: 'center' }}>还有30种物料未备,当前第1种料</Text>
  render() {
    return (
      <View >
        <List>
          <Picker
            data={this.state.TaskOrderDataArray}
            cols={1}
            value={this.state.TaskOrderData}
            onChange={this.onChange}
          >
            <List.Item arrow="horizontal" last onClick={this.onClick}><Text style={styles.span}>备料单:</Text></List.Item>
          </Picker>
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
            还有30种物料未备,当前第1种料
        </NoticeBar>
        </List>

        <List >
          <InputItem
            value={this.state.uidValue}
            editable={false}
          ><Text style={styles.span}>料号:</Text></InputItem>
          <InputItem
            value={this.state.targetValue}
            editable={false}
          ><Text style={styles.span}>需求量:</Text></InputItem>
          <InputItem
            value={this.state.uidValue}
            editable={false}
          ><Text style={styles.span}>盘数:</Text></InputItem>
          <InputItem
            value={this.state.targetValue}
            editable={false}
          ><Text style={styles.span}>库存:</Text></InputItem>
          <InputItem
            value={this.state.uidValue}
            editable={false}
          ><Text style={styles.span}>推荐盘:</Text></InputItem>

        </List>
        <WhiteSpace size="sm" />
        <List>
          <InputItem
            value={this.state.targetValue}
            editable={true}
          ><Text style={styles.span}>扫描:</Text></InputItem>
          <Pagination simple total={5} current={1} locale={locale} />
        </List>
        <Button type='primary' style={styles.quitButton}
          onClick={() => alert('激活', '确定激活么?😄', [
            { text: '取消', onPress: () => console.log('不激活') },
            { text: '确定', onPress: () => this.handleActivation() },
          ])}
        >提交</Button>
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
    marginTop: 0
  }
});
