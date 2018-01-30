
/**
 * 公用get请求
 * @param loginUrl       登陆请求
 * @param GetWorkOrderUrl    get 工单请求
 * @param PostWorkOrderUrl   post 工单请求
 * @param PostTracebilityUrl   post 追溯请求
 */
const ip = '192.168.1.230'
const post = '80'
const api = 'sfmeswms'


// const ip = '192.168.1.252'
// const post = '80'
// const api = 'sfmeswms'

// const ip = '192.168.1.136'
// const post = '3009'
// const api = 'sfwms'

// const localIp = '192.168.1.136'
// const localPost = '3009'
// const localApi  = 'sfwms'


// const ip = '192.168.1.113'
// const post = '80'

// const ip = '192.168.0.99'
// const post = '80'


export const PublicParam = {
  name: 'WMS',
  mock: true,
  loginUrl: `http://${ip}:${post}/JYTrace/API/ApiCheckLogin/`,
  GetWorkOrderUrl: `http://${ip}:${post}/JYTrace/API/APIGetWorkOrder/?LineCode=`,
  PostWorkOrderUrl: `http://${ip}:${post}/JYTrace/API/ApiActivateWorkOrder/`,
  PostTracebilityUrl: `http://${ip}:${post}/JYTrace/API/ApiSetupMaterial/`,

  /**
   * wms-pda
   */
  //登陆
  PostLoginUrl: `http://${ip}:${post}/SFMES/api/Login/Post`,

  //移库
  GetALlFormTypeUrl: `http://${ip}:${post}/${api}/api/MovementRecord/GetALlFormType`,
  GetWMSFormByFormTypeIdUrl: `http://${ip}:${post}/${api}/api/MovementRecord/GetWMSFormByFormTypeId`,
  MovementRecordPostUrl: `http://${ip}:${post}/${api}/Api/MovementRecord/Post`,
  //安工单备料
  // GetAllMaterialPickingFormUrl: `http://${localIp}:${localPost}/sfwms/api/prepareMaterials/GetAllMaterialPickingForm`,
  // GetMaterialPickingFormItemOnedUrl: `http://${localIp}:${localPost}/sfwms/api/prepareMaterials/GetMaterialPickingFormItemOne/`,
  GetAllMaterialPickingFormUrl: `http://${ip}:${post}/${api}/api/MaterialPicking/GetAllMaterialPickingForm`,
  GetMaterialPickingFormItemOnedUrl: `http://${ip}:${post}/${api}/api/MaterialPicking/GetMaterialPickingFormItemOne`,
  PostSubmitUrl: `http://${ip}:${post}/${api}/Api/MaterialPicking/Post`,
}


// http://192.168.1.252/sfmeswms/api/MaterialPicking/GetMaterialPickingFormItemOne?materialPickingFormId=1&ItemNumber=0&getMode=0
