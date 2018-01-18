import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux'; // 引入connect函数
import { Button, List, Picker, InputItem, WhiteSpace, Modal, WingBlank, Toast, Radio, Icon, ActivityIndicator, TextareaItem } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';

const { GetALlFormTypeUrl, GetWMSFormByFormTypeIdUrl, MovementRecordPostUrl } = PublicParam

const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

const TestArray = [
  {
    label: '1',
    value: '1',
  }, {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  }, {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  }, {
    label: '6',
    value: '6',
  }
];

class MoveStorehouse extends PureComponent {
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
  //第一个api
  fetchRequestInitFunc = () => {
    fetch(GetALlFormTypeUrl, { method: "GET" })
      .then((response) => {
        return response.json();
      }).then((responseJson) => {
        console.log('fetchRequestInitFunc', responseJson)
        //GetALlFormTypeUrl拉过来的操作类型Array
        this.setState({ OperationTypeArray: responseJson.Data }, this.fetchRequestFunc(1))
      }).catch((error) => {
        console.log('GetALlFormTypeUrlError::', error)
      }).done();
  }
  //第二个api
  fetchRequestFunc = (param = 1) => {
    console.log('fetchRequestFunc', param)
    //第二个fetch，初始化一个DocsNumberArray下拉菜单的值
    fetch(`${GetWMSFormByFormTypeIdUrl}/?formTypeId=${param}`,
      { method: "GET" }
    ).then((response) => {
      console.log('fetchRequestFunc.then', `${GetWMSFormByFormTypeIdUrl}/?formTypeId=${param}`, response)
      return response.json();
    }).then((responseJson) => {
      console.log('fetchRequestFunc', responseJson)
      this.setState({
        DocsNumberArray: responseJson.Data,
        uidValue: '',
        targetValue: '',
      })
    }).catch((error) => {
      console.log('GetALlFormTypeUrlError::', error)
    }).done();
  }

  onClick = (key) => () => {
    this.setState({ [key]: lineObj })
  }

  onChangeTest = (key) => (value) => {
    console.log('onChange', key, value)
    this.setState({ [key]: value });
  }

  onChange = (key) => (value) => {
    console.log('onChange', key, value)
    //改变操作类型/单据号/UID/目标库位 时 =>清除massage
    this.setState({ [key]: value, MessageValue: '' });
    if (key === 'DocsNumberValue') {
      this.setState({ UIDFocused: true });
    } else if (key === 'OperationTypeValue') {
      this.fetchRequestFunc(value[0])
    }
  }
  uidOnBlur = () => {
    this.setState({ UIDFocused: false, targetFocused: true });
  }
  handleActivation() {
    console.log('handleActivation', this.state)
    this.setState({ UIDFocused: false, targetFocused: false });
    fetch(MovementRecordPostUrl, {
      // fetch('http://192.168.1.107:3009/sfwms/Api/MovementRecord/Post', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        FormTypeId: parseInt(this.state.OperationTypeValue[0]),
        WMSFormId: parseInt(this.state.DocsNumberValue[0]),
        ContainerNumber: this.state.uidValue,
        LocationNumber: this.state.targetValue,
        UserId: this.props.user.userId
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetch3', responseJson)
      if (responseJson.Status === 200) {
        if (responseJson.Data.ReturnCode === 1) {
          //重新拉取单据号请求
          this.fetchRequestFunc(this.state.OperationTypeValue.toString())
        } else {
          //GetALlFormTypeUrl拉过来的操作类型Array
          this.setState({
            MessageValue: responseJson.Data.Message.toString(),
            uidValue: '',
            targetValue: '',
            UIDFocused: true, //提交完成后光标回到UID input
          })
        }

      }
    }).catch((error) => {
      console.log('MovementRecordPostUrlError::', error)
    }).done();
  }
  //onClick={this.onClick('DocsNumberArray')}
  render() {
    console.log('MoveStorehouseRender', this.state, this.state.DocsNumberArray, this.state.DocsNumberValue[0])
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
          // data={TestArray}
          // cols={1}
          // value={this.state.DocsNumberValue}
          // onChange={this.onChangeTest('DocsNumberValue')}
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
        <List renderHeader={() => '消息'}>
          <TextareaItem
            rows={4}
            count={100}
            editable={false}
            value={this.state.MessageValue}
          />
        </List>
      </View>
    );
  }
}
export default connect(
  (state) => ({
    user: state.loginIn.user,
  }), (dispatch) => ({}))(MoveStorehouse)

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

