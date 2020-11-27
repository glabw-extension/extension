import Vue from "vue";
import axios from "axios";
import errorCode from "@/constants/error-code";

axios.__errCode = axios.__errCode || {};
Object.keys(errorCode).forEach(key => {
  if (!axios.__errCode[key] || typeof axios.__errCode[key] !== "object") {
    axios.__errCode[key] = errorCode[key];
  }
});

export default {
  getSSLConfig(params) {
    // 获取数字证书相关配置
    return axios.post("/getConfig", params);
  },
  getSSLToken(config) {
    // 获取数字证书 token
    return axios.post(`/${config}/getToken`);
  },
  sslLogin(params) {
    // token登录时用
    return axios.post("/login", params);
    // return axios.post("/auth/sso/login", params);
  },
  logout() {
    // return axios.get("/auth/user/logout");
    return axios.get("/logout");
  },

  // YJ data
  sendAuthCode(params) {
    // 发送验证码
    return axios.post("/auth/user/sendAuthCode", params);
  },
  login(params) {
    return axios.post("/auth/user/login", params);
  },
  simpleLogin(params) {
    return axios.post("/auth/user/simpleLogin", params);
  },
  getLoginInfo() {
    return axios.post("/administrate/user/getLoginInfo");
  },

  cfLogin(params) {
    return axios.post("/hzsw/a/login", params);
  },
  cfLoginBySFZH(params) {
    return axios.get("/hzsw/a/domainlogin", params);
  },
  getCfConfig() {
    return axios.post("/hzqb/hzsw/getCfConfig");
  },
  getWkConfig() {
    return axios.post("/hzqb/wkConfig");
  },
  // 登录前获取系统信息
  getSystemInfo() {
    return axios.post("/administrate/logo/getWithoutLogin");
  },
  getUnreadAnnounce(params) {
    return axios.post("/administrate/announce/getUnreadAnnounce", params);
  },
  readAnnounce(params) {
    return axios.post("/administrate/announce/read", params);
  },
  modifyUserPwd(params) {
    return axios.post("/administrate/user/modifyUserPwd", params);
  },
  canLoginWithPoliceNo() {
    return axios.post("/administrate/user/isOpenPoliceNoLogin");
  },
  getAdministrateUserDetail() {
    return axios.post("/administrate/user/getSelfInfo");
  },
  getAdminUserDetail() {
    return axios.post("/admin/user/getSelfInfo");
  },
  /**
   * 搜索地址: 地图服务
   */
  positionMatch(params) {
    return axios.post("/address/search/match", params);
  },
  getPosition(params) {
    return axios.post("/address/search/query", params);
  },
  // 消息盒子
  getMessageCount() {
    return axios.post("/administrate/messageCount/getMessageCount");
  },
  // HZQB消息盒子
  getHzqbMessageCount(params) {
    return axios.post("/monitor/device/getMessageCount", params);
  },
  updateMessageCount(params) {
    if (Vue.prototype.$isPermitted("administrate.message.get")) {
      return axios.post("/administrate/messageCount/messageRead", params);
    } else {
      return Promise.reject(new Error("none Permitted"));
    }
  },
  // 调用/monitor/device/getMessageCount的接口消息已读掉monitor的已读接口
  updateMonitorMessageCount(params) {
    return axios.post("/monitor/device/messageRead", params);
  },
  // 全网搜
  checkQueryId(params) {
    // 验证idcard是否具有权限跳转全网搜
    return axios.post("/event/event/checkQueryId", params);
  },

  // [YS]入口大屏相关接口
  getCrowdControlInfo(params) {
    return axios.post("/monitor/task/monitorStatistics", params);
  },
  getKeyPersonInfo(params) {
    return axios.post("/importantCrowd/crowdLibrary/crowdStatistics", params);
  },
  getDeviceInfo(params) {
    return axios.post("/deviceAnalyse/device/getDeviceStatisticByType", params);
  },
  getMapPointsPosition(params) {
    return axios.post("/deviceAnalyse/device/getLocalList", params);
  },
  getCityBoundary(params) {
    return axios.post("/monitor/dashboardSituation/getFenceByCityCode", params);
  },
  getSinglePointDetail(params) {
    return axios.post("/deviceAnalyse/device/getDeviceInfoById", params);
  },
  getClusterPointsList(params) {
    return axios.post("/deviceAnalyse/device/gatherPointDetail", params);
  }
};
