/*
 * @Author: your name
 * @Date: 2020-11-26 15:02:32
 * @LastEditTime: 2020-11-26 15:14:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/views/plugin/index.js
 */
export default {
  main: () => import(/* webpackChunkName: "plugin" */ "./index.vue")
};
