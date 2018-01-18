import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux'; // 引入connect函数
import { Pagination, Button, Picker, List, InputItem, WhiteSpace, Modal, WingBlank, NoticeBar, Toast, Radio, Icon, ActivityIndicator, TextareaItem } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'
import mockJson from '../../mock/mock.json';
const { GetAllMaterialPickingFormUrl, GetMaterialPickingFormItemOnedUrl, PostSubmitUrl } = PublicParam

const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

class PrepareMaterials extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      PrepareMaterialsOrderArray: [],  //备料单Array
      PrepareMaterialsOrderValue: [],  //备料单值
      MaterialNumberValue: '', //料号
      RecommendContainerValue: '',//推荐盘
      QuantityDisplayValue: '',//需求量
      PackQuantityDisplayValue: '',//包装数
      RecommendLocationNumberValue: '',//库位
      MessageTitle: '',
      EnableScanContainer: false,  //扫描
      EnablePrev: false, //上一种
      EnableNext: false, //下一种
      total: 2,
      current: 0,

    };
  }

  componentDidMount() {
    this.fetchRequestInitFunc()
  }

  fetchRequestInitFunc = () => {
    fetch(GetAllMaterialPickingFormUrl, { method: "GET" })
      .then((response) => {
        return response.json();
      }).then((responseJson) => {
        console.log('GetAllMaterialPickingFormUrl', responseJson)
        this.setState({ PrepareMaterialsOrderArray: responseJson.Data })
      }).catch((error) => {
        console.log('GetAllMaterialPickingFormUrlError::', error)
      }).done();
  }

  fetchRequestFunc = (params) => {
    console.log('fetchRequestFunc', GetMaterialPickingFormItemOnedUrl + params)
    fetch(GetMaterialPickingFormItemOnedUrl + params, { method: "GET" })
      .then((response) => {
        return response.json();
      }).then((responseJson) => {
        console.log('fetchRequestFunc', responseJson)
        this.setState({
          MaterialNumberValue: responseJson.Data.MaterialNumber, //料号
          RecommendContainerValue: responseJson.Data.RecommendContainer,//推荐盘
          QuantityDisplayValue: responseJson.Data.QuantityDisplay,//需求量
          PackQuantityDisplayValue: responseJson.Data.PackQuantityDisplay,//包装数
          RecommendLocationNumberValue: responseJson.Data.RecommendLocationNumber,//库位
          MessageTitle: responseJson.Data.MessageTitle,//message
          EnableScanContainer: responseJson.Data.EnableScanContainer,  //扫描
          EnableNext: responseJson.Data.EnableNext, //下一种
          EnablePrev: responseJson.Data.EnablePrev,  //上一种
          total: responseJson.Data.TotleItem,
          current: responseJson.Data.ItemNumber,

          ScanValue: responseJson.Data.MessageScanContainer,
        })
      }).catch((error) => {
        console.log('GetMaterialPickingFormItemOnedUrlError::', error)
      }).done();
  }

  fetchPostFunc = (param) => {
    fetch(PostSubmitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(param)
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchPostFunc', responseJson)
      if (responseJson.Status === 200) {
        switch (responseJson.Data.ReturnCode) {
          case 0 && responseJson.Data.Message.length === 0:
            console.log('responseJson.Data.ReturnCode===0&&responseJson.Data.Message.length===0')
            this.fetchRequestFunc(`?materialPickingFormId=${this.state.PrepareMaterialsOrderValue}&ItemNumber=${this.state.current}&areaId=1`)
            break;
          case 0 && responseJson.Data.Message.length > 0:
            Toast.success(responseJson.Data.Message, 1);
            console.log('responseJson.Data.ReturnCode===0&&responseJson.Data.Message.length!==0')
            break;
          case -1:
            Toast.success(responseJson.Data.Message, 1);
            console.log('responseJson.Data.ReturnCode===-1')
            break;
          default:
            console.log('responseJson.Data.ReturnCode===default')
            break;
        }
      } else {
        Toast.success(responseJson.ErrorMessage, 1);
      }
    }).catch((error) => {
      console.log('PostSubmitUrlError::', error)
    }).done();
  }


  onPrepareMaterialsOrderChange = (PrepareMaterialsOrderValue) => {
    console.log('onPrepareMaterialsOrderChange', PrepareMaterialsOrderValue)
    this.setState({ PrepareMaterialsOrderValue },
      this.fetchRequestFunc(`?materialPickingFormId=${PrepareMaterialsOrderValue}&ItemNumber=0&areaId=1`));
  }
  handleActivation = () => {
    //判断以下参数都有值才运行否则弹出警告 ⚠️
    if (this.state.PrepareMaterialsOrderValue && this.state.current && this.state.ScanValue && this.props.user) {
      console.log('handleActivation', this.state.PrepareMaterialsOrderValue.length > 0 == true, this.state.current)
      const param = {
        MaterialPickingFormId: parseInt(this.state.PrepareMaterialsOrderValue[0]),
        MaterialPickingFormItemNumber: this.state.current,
        ContainerNumber: this.state.ScanValue,//'C000000001'
        UserId: this.props.user.userId,
        AreaId: 1
      }
      console.log('提交', param)
      this.fetchPostFunc(param)

    } else {
      Toast.success('提交不合法,谢谢', 1);
    }
  }
  ScanValueChange = (ScanValue) => {
    this.setState({ ScanValue })
  }
  // PaginationChange = (current) => {
  //   console.log('PaginationChange', current)
  //   // this.setState({ current })
  //   // this.fetchRequestFunc(`?materialPickingFormId=${this.state.PrepareMaterialsOrderValue}&ItemNumber=${current }&areaId=1`);
  // }
  ChangeItemNumber = (type) => {
    if (type === 'Prev') {
      this.fetchRequestFunc(`?materialPickingFormId=${this.state.PrepareMaterialsOrderValue}&ItemNumber=${this.state.current - 1}&areaId=1`);
    } else if (type === 'Next') {
      this.fetchRequestFunc(`?materialPickingFormId=${this.state.PrepareMaterialsOrderValue}&ItemNumber=${this.state.current + 1}&areaId=1`);
    }
  }
  render() {
    console.log('PrepareMaterialsrender', this.state, this.props)
    return (
      <View >
        <List>
          <Picker
            data={this.state.PrepareMaterialsOrderArray}
            cols={1}
            value={this.state.PrepareMaterialsOrderValue}
            onChange={this.onPrepareMaterialsOrderChange}
          >
            <List.Item arrow="horizontal" last ><Text style={styles.span}>备料单:</Text></List.Item>
          </Picker>
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
            {this.state.MessageTitle || ''}
          </NoticeBar>
        </List>
        <List >
          <InputItem
            value={this.state.MaterialNumberValue}
            editable={false}
          ><Text style={styles.span}>料号:</Text></InputItem>
          <InputItem
            value={this.state.QuantityDisplayValue}
            editable={false}
          ><Text style={styles.span}>需求量:</Text></InputItem>
          <InputItem
            value={this.state.PackQuantityDisplayValue}
            editable={false}
          ><Text style={styles.span}>包装数:</Text></InputItem>
          <InputItem
            value={this.state.RecommendContainerValue}
            editable={false}
          ><Text style={styles.span}>推荐盘:</Text></InputItem>
          <InputItem
            value={this.state.RecommendLocationNumberValue}
            editable={false}
          ><Text style={styles.span}>库位:</Text></InputItem>
          <View style={styles.flexStyle}>
            <Button style={styles.flexSubLeft} type="primary" onClick={this.ChangeItemNumber.bind(this, 'Prev')} disabled={!this.state.EnablePrev} size='large' >上一种</Button>
            <Button style={styles.flexSubRight} type="primary" onClick={this.ChangeItemNumber.bind(this, 'Next')} disabled={!this.state.EnableNext} size='large' >下一种</Button>
          </View>
        </List>
        <List>
          <InputItem
            value={this.state.ScanValue}
            // editable={true}
            onChange={this.ScanValueChange.bind(this)}
            editable={this.state.EnableScanContainer}
          ><Text>扫描:</Text></InputItem>
        </List>
        <Button
          disabled={!this.state.EnableScanContainer}
          type='primary' style={styles.quitButton}
          onClick={() => alert('提交', '确定提交么?😄', [
            { text: '取消', onPress: () => console.log('不提交') },
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
  },
  flexStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'nowrap'
  },
  flexSubLeft: {
    flex: 1,
    width: '30%',
    height: '100%',
    // backgroundColor: '#333333',
    marginLeft: 1,
  },
  flexSubRight: {
    flex: 1,
    width: '30%',
    height: '100%',
    // backgroundColor: '#333333',
    marginRight: 1,
  },

});
export default connect(
  (state) => ({
    user: state.loginIn.user,
  }), (dispatch) => ({}))(PrepareMaterials)


  //     <Pagination simple total={5} current={1} locale={locale} />

  // <Pagination
  // simple={false}
  // total={5}
  // current={0}
  // onChange={this.PaginationChange.bind(this)}
  // locale={locale = {
  //   prevText: '上一种',
  //   nextText: '下一种',
  // }} />