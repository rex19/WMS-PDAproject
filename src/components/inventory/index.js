import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Picker, List, WhiteSpace, InputItem, TextareaItem } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';

const Item = List.Item;
const TaskOrderDataArray = [
  {
    label: '1线',
    value: 'line1',
  }, {
    label: '2线',
    value: 'line2',
  }
];
const PartNoDataArray = [
  {
    label: '1线',
    value: 'line1',
  }, {
    label: '2线',
    value: 'line2',
  }
];

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TaskOrderDataArray: [],
      TaskOrderData: [],
      PartNoDataArray: [],
      PartNoData: [],
      TaskOrderData: '',
      PartNoData: '',
      PartNoBarcodeValue: '',
      MaterialTrayValue: ''
    };
  }

  onClick = () => {
    setTimeout(() => {
      this.setState({
        TaskOrderDataArray: TaskOrderDataArray,
        PartNoDataArray: PartNoDataArray
      });
    }, 500);
  }
  TaskOrderChange = (TaskOrderData) => {
    this.setState({ TaskOrderData });
  }
  PartNoChange = (PartNoData) => {
    this.setState({ PartNoData });
  }
  PartNoBarcodeChange = (PartNoBarcodeValue) => {
    this.setState({ PartNoBarcodeValue });
  }
  MaterialTrayChange = (MaterialTrayValue) => {
    this.setState({ MaterialTrayValue });
  }
  render() {
    return (
      <View >
        <List>
          <Picker
            data={this.state.TaskOrderDataArray}
            cols={1}
            value={this.state.TaskOrderData}
            onChange={this.TaskOrderChange}
          >
            <List.Item arrow="horizontal" last onClick={this.onClick}><Text style={styles.span}>盘点任务单:</Text></List.Item>
          </Picker>
        </List>
        <List>
          <Picker
            data={this.state.PartNoDataArray}
            cols={1}
            value={this.state.PartNoData}
            onChange={this.PartNoChange}
          >
            <List.Item arrow="horizontal" last onClick={this.onClick}><Text style={styles.span}>料号:</Text></List.Item>
          </Picker>
        </List>
        <List >
          <InputItem
            // focused={this.state.workOrderNoFocused}
            value={this.state.uidValue}
            editable={true}
          ><Text style={styles.span}>扫描库位:</Text></InputItem>
        </List>
        <WhiteSpace size="sm" />
        <List renderHeader={() => '依次扫描所有物料条码'}>
          <TextareaItem
            onChange={this.PartNoBarcodeChange}
            value={this.state.PartNoBarcodeValue}
            title={<img src="https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png" style={{ width: '28px', height: '28px' }} alt="" />}
            placeholder="多行物料条码"
          />
        </List>
        <WhiteSpace size="sm" />
        <List renderHeader={() => '已扫料盘'}>
          <TextareaItem
            onChange={this.MaterialTrayChange}
            value={this.state.MaterialTrayValue}
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
