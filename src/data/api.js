import axios from 'axios'
// import downFile from '@/utils/downFile'
import errorCode from '../constants/error-code'

axios.__errCode = Object.assign(axios.__errCode || {}, errorCode)
// const genPostReq = url => (...params) => axios.post(url, ...params)

const workstation = {
  getMindMapList(params) {
    /* 获取用户研判列表: query
      page: number,
      count: number,
      event_id: string,
      type: number[], // 1-脑图；2-模板 
    */
    return axios.post('/workstation/mind_map/getList', params)
  },
  getCollectionList(params) {
    /* query:
      page: number,
      count: nubmer,
      event_id: string,
      type?: number[] 
     */
    return axios.post('/workstation/collection/getList', params)
  },
  createCollection(params) {
    /* 获取用户研判列表: query
      event_id: string,
      detail: { [key: string]: string },
      remark: string,
      type: number, // '类型: 0-其他; 1-id; 2-wifi; 3-ip; 4-app; 5-location'
      collectionKey: string, // 收藏唯一表示, 0-空;1-4-对应id;5-lng,lat
      title: string,
    */
    return axios.post('/workstation/collection/create', params)
  },
  deleteCollection(params) {
    return axios.post('/workstation/collection/deleteById', params)
  },
  updateCollection(params) {
    return axios.post('/workstation/collection/updateById', params, {
      keepEmptyProps: true,
    })
  },
  downloadImg(params) {
    return axios.post('/webfile/webfile/download', params, {
      responseType: 'blob',
    })
  },
  createMind(params) {
    return axios.post('/workstation/mind_map/create', params)
  },
  deleteMindById(params) {
    return axios.post('/workstation/mind_map/deleteById', params)
  },
  updateMindById(params) {
    return axios.post('/workstation/mind_map/updateById', params)
  },
  getMindById(params) {
    return axios.post('/workstation/mind_map/getById', params)
  },
  // upLoadImg(params) {
  //   return axios.post('/webfile/webfile/upload', params)
  // },
  upLoadImg(params) {
    return axios.post('/file/upload', params)
  },
}

export default {
  createFeedback(params) {
    return axios.post('/administrate/feedback/create', params)
  },
  ...workstation,
}
