((typeof self !== 'undefined' ? self : this)["webpackJsonpmyPlugin"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpmyPlugin"] || []).push([[1],{

/***/ "0ef6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2f17":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4c09":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"69ead2fe-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-html-loader/lib!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mind-map/index.vue?vue&type=template&id=18ab24ec&lang=pug&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],staticClass:"xmind-workspace"},[_c('div',{staticClass:"xmind-workspace__left",class:{'close': !_vm.openAside}},[_c('div',{staticClass:"tools"},_vm._l((_vm.tools),function(item,index){return _c('div',{key:index,staticClass:"tools-item"},[_c('div',{staticClass:"title"},[_vm._v(_vm._s(item.group)+"("+_vm._s(item.children.length)+")")]),_c('div',{staticClass:"buttons"},[_vm._l((item.children),function(btn,i){return _c('div',{key:i,staticClass:"buttons-item",attrs:{"title":btn.data.text,"draggable":btn.data},on:{"dragstart":function($event){return _vm.onDrag($event, btn)}}},[_c('i',{class:("iconfont-mindmap " + (btn.icon))})])}),_c('div',{staticClass:"buttons-item flex-placeholder"}),_c('div',{staticClass:"buttons-item flex-placeholder"}),_c('div',{staticClass:"buttons-item flex-placeholder"}),_c('div',{staticClass:"buttons-item flex-placeholder"})],2)])}),0)]),_c('div',{staticClass:"xmind-workspace__content"},[_c('div',{ref:"xmind-container",staticClass:"xmind-workspace__container"},[_c('div',{staticClass:"top-opration"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.handleSavePng}},[_vm._v("另存为图片")]),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){return _vm.canvas.fitView(50)}}},[_vm._v("适应窗口大小")]),_c('el-popover',{staticClass:"mr-20",attrs:{"trigger":"hover","width":"200","popper-class":"xmind-scale-popper"}},[_c('div',{staticClass:"text-right"},[_c('span',{staticClass:"mr-20"},[_vm._v(_vm._s(_vm.scale)+"%")]),_c('el-button',{attrs:{"type":"text","icon":"el-icon-minus","disabled":_vm.scale <= 25},on:{"click":function($event){return _vm.scaleCanvas(-0.1)}}}),_c('el-button',{staticClass:"mr-10",attrs:{"type":"text","icon":"el-icon-plus","disabled":_vm.scale >= 500},on:{"click":function($event){return _vm.scaleCanvas(+0.1)}}}),_c('el-button',{on:{"click":function($event){return _vm.scaleCanvas()}}},[_vm._v("重置")])],1),_c('div',{staticClass:"top-opration__scale ml-20",attrs:{"slot":"reference"},slot:"reference"},[_vm._v("视图："+_vm._s(_vm.scale)+"%")])]),_c('div',[_vm._v("背景网格：")]),_c('el-switch',{on:{"change":_vm.showGridChange},model:{value:(_vm.showGrid),callback:function ($$v) {_vm.showGrid=$$v},expression:"showGrid"}}),_c('div',{staticClass:"top-opration__right"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.showSaveDialog}},[_vm._v("保存")]),_c('el-button',{on:{"click":_vm.clearMindMap}},[_vm._v("清空")])],1)],1),_c('div',{attrs:{"id":"topology-canvas"},on:{"contextmenu":function($event){return _vm.onContextMenu($event)}}}),(_vm.contextmenu.left)?_c('div',{staticClass:"context-menu",style:(_vm.contextmenu)},[_c('CanvasContextMenu',{attrs:{"canvas":_vm.canvas,"props":_vm.choosedElement},on:{"update:props":function($event){_vm.choosedElement=$event}}})],1):_vm._e()]),_c('div',{staticClass:"xmind-workspace__right"},[_c('CanvasProps',{attrs:{"props":_vm.choosedElement},on:{"update:props":function($event){_vm.choosedElement=$event},"change":_vm.onUpdateProps}})],1)]),_c('el-dialog',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],attrs:{"title":"保存脑图","visible":_vm.mindModel,"width":"500px"},on:{"update:visible":function($event){_vm.mindModel=$event}},scopedSlots:_vm._u([{key:"footer",fn:function(){return [_c('el-button',{on:{"click":function($event){_vm.mindModel = false}}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary","disabled":!_vm.form.title},on:{"click":_vm.saveXmind}},[_vm._v("保存")])]},proxy:true}])},[_c('el-form',{ref:"form",attrs:{"model":_vm.form,"label-width":"60px","label-suffix":":"}},[_c('el-form-item',{attrs:{"label":"名称","prop":"title","rules":[{required: true, message: '思维导图名称不能为空'}]}},[_c('el-input',{attrs:{"placeholder":"请输入名称","maxlength":100},model:{value:(_vm.form.title),callback:function ($$v) {_vm.$set(_vm.form, "title", $$v)},expression:"form.title"}})],1),_c('el-form-item',{attrs:{"label":"备注","prop":"remark"}},[_c('el-input',{attrs:{"type":"textarea","placeholder":"请输入备注","maxlength":100,"show-word-limit":""},model:{value:(_vm.form.remark),callback:function ($$v) {_vm.$set(_vm.form, "remark", $$v)},expression:"form.remark"}})],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/mind-map/index.vue?vue&type=template&id=18ab24ec&lang=pug&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js + 2 modules
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@topology/core/index.js + 82 modules
var core = __webpack_require__("69d8");

// CONCATENATED MODULE: ./src/views/mind-map/xmind-config.js
var Icons = [{
  class: 'iconnanxing',
  unicode: "\uE69C"
}, {
  class: 'iconnvxing',
  unicode: "\uE69F"
}, {
  class: 'iconshouji',
  unicode: "\uE69E"
}, {
  class: 'iconWIFI',
  unicode: "\uE6A4"
}, {
  class: 'iconIP',
  unicode: "\uE699"
}, {
  class: 'iconAPP',
  unicode: "\uE69D"
}, {
  class: 'iconweizhi',
  unicode: "\uE698"
}, {
  class: 'iconjiatingdi',
  unicode: "\uE6A2"
}, {
  class: 'icongongzuodi',
  unicode: "\uE6A0"
}, {
  class: 'iconPN',
  unicode: "\uE6A1"
}, {
  class: 'iconIMSI',
  unicode: "\uE6A3"
}, {
  class: 'iconIMEI',
  unicode: "\uE69A"
}, {
  class: 'iconMAC',
  unicode: "\uE69B"
}, {
  class: 'iconOAID',
  unicode: "\uE697"
}, {
  class: 'iconIDFA',
  unicode: "\uE696"
}];
var Tools = [{
  group: '基本形状',
  children: [{
    name: 'rectangle',
    icon: 'iconbasic_1',
    data: {
      text: '正方形',
      rect: {
        width: 70,
        height: 70
      },
      name: 'rectangle'
    }
  }, {
    name: 'rectangle',
    icon: 'iconbasic_2',
    data: {
      text: '圆角矩形',
      rect: {
        width: 100,
        height: 30
      },
      borderRadius: 0.1,
      name: 'rectangle'
    }
  }, {
    name: 'circle',
    icon: 'iconbasic_5',
    data: {
      text: '圆',
      rect: {
        width: 70,
        height: 70
      },
      name: 'circle',
      textMaxLine: 1
    }
  }, {
    name: 'triangle',
    icon: 'iconbasic_4',
    data: {
      text: '三角形',
      rect: {
        width: 70,
        height: 70
      },
      name: 'triangle'
    }
  }, {
    name: 'diamond',
    icon: 'iconbasic_3',
    data: {
      text: '菱形',
      rect: {
        width: 70,
        height: 70
      },
      name: 'diamond'
    }
  }, {
    name: 'pentagon',
    icon: 'iconbasic_6',
    data: {
      text: '五边形',
      rect: {
        width: 70,
        height: 70
      },
      name: 'pentagon'
    }
  }, {
    name: 'hexagon',
    icon: 'iconbasic_7',
    data: {
      text: '六边形',
      rect: {
        width: 70,
        height: 70
      },
      name: 'hexagon'
    }
  }, {
    name: 'pentagram',
    icon: 'iconbasic_8',
    data: {
      text: '五角星',
      rect: {
        width: 70,
        height: 70
      },
      name: 'pentagram'
    }
  }, {
    name: 'leftArrow',
    icon: 'iconbasic_9',
    data: {
      text: '左箭头',
      rect: {
        width: 100,
        height: 50
      },
      name: 'leftArrow'
    }
  }, {
    name: 'rightArrow',
    icon: 'iconbasic_10',
    data: {
      text: '右箭头',
      rect: {
        width: 100,
        height: 50
      },
      name: 'rightArrow'
    }
  }, {
    name: 'twowayArrow',
    icon: 'iconbasic_11',
    data: {
      text: '双向箭头',
      rect: {
        width: 100,
        height: 50
      },
      name: 'twowayArrow'
    }
  }, {
    name: 'line',
    icon: 'iconbasic_20',
    data: {
      text: '直线',
      rect: {
        width: 100,
        height: 100
      },
      name: 'line'
    }
  }, {
    name: 'cloud',
    icon: 'iconbasic_13',
    data: {
      text: '云',
      rect: {
        width: 50,
        height: 50
      },
      name: 'cloud'
    }
  }, {
    name: 'message',
    icon: 'iconbasic_12',
    data: {
      text: '消息框',
      rect: {
        width: 80,
        height: 80
      },
      // paddingLeft: 10,
      // paddingRight: 10,
      // paddingTop: 10,
      // paddingBottom: 10,
      name: 'message'
    }
  }, {
    name: 'file',
    icon: 'iconbasic_14',
    data: {
      text: '文档',
      rect: {
        width: 64,
        height: 80
      },
      // paddingLeft: 10,
      // paddingRight: 10,
      // paddingTop: 10,
      // paddingBottom: 10,
      name: 'file'
    }
  }, {
    name: 'text',
    icon: 'iconbasic_16',
    data: {
      text: '请输入文字',
      rect: {
        width: 160,
        height: 30
      },
      name: 'text'
    }
  }, //  {
  //    name: 'image',
  //    icon: 'iconbasic_15',
  //    data: {
  //      text: '插入图片',
  //      rect: {
  //        width: 100,
  //        height: 100,
  //      },
  //      name: 'image',
  //      image: '/assets/img/noData.png',
  //    },
  //  },
  {
    name: 'cube',
    icon: 'iconbasic_17',
    data: {
      text: '立方体',
      rect: {
        width: 50,
        height: 70
      },
      is3D: true,
      z: 10,
      zRotate: 15,
      // fillStyle: '#ddd',
      name: 'cube'
    }
  }, {
    name: 'people',
    icon: 'iconbasic_18',
    data: {
      text: '人',
      rect: {
        width: 35,
        height: 50
      },
      name: 'people'
    }
  } // {
  //   name: '视频/网页',
  //   icon: 'iconbasic_19',
  //   data: {
  //     text: '视频/网页',
  //     rect: {
  //       width: 100,
  //       height: 100,
  //     },
  //     paddingLeft: 10,
  //     paddingRight: 10,
  //     paddingTop: 10,
  //     paddingBottom: 10,
  //     // strokeStyle: 'transparent',
  //     name: 'div',
  //   },
  // },
  ]
}, {
  group: '流程图',
  children: [{
    name: '开始/结束',
    icon: 'iconprocess_1',
    data: {
      text: '开始',
      rect: {
        width: 90,
        height: 30
      },
      borderRadius: 0.5,
      name: 'rectangle'
    }
  }, {
    name: '流程',
    icon: 'iconprocess_2',
    data: {
      text: '流程',
      rect: {
        width: 90,
        height: 30
      },
      name: 'rectangle'
    }
  }, {
    name: '判定',
    icon: 'iconprocess_3',
    data: {
      text: '判定',
      rect: {
        width: 90,
        height: 45
      },
      name: 'diamond'
    }
  }, {
    name: '数据',
    icon: 'iconprocess_4',
    data: {
      text: '数据',
      rect: {
        width: 90,
        height: 40
      },
      name: 'flowData'
    }
  }, {
    name: '准备',
    icon: 'iconprocess_5',
    data: {
      text: '准备',
      rect: {
        width: 90,
        height: 40
      },
      name: 'hexagon'
    }
  }, {
    name: '子流程',
    icon: 'iconprocess_6',
    data: {
      text: '子流程',
      rect: {
        width: 90,
        height: 40
      },
      name: 'flowSubprocess'
    }
  }, {
    name: '数据库',
    icon: 'iconprocess_7',
    data: {
      text: '数据库',
      rect: {
        width: 60,
        height: 90
      },
      name: 'flowDb'
    }
  }, {
    name: '文档',
    icon: 'iconprocess_8',
    data: {
      text: '文档',
      rect: {
        width: 90,
        height: 75
      },
      name: 'flowDocument'
    }
  }, {
    name: '内部存储',
    icon: 'iconprocess_9',
    data: {
      text: '内部存储',
      rect: {
        width: 90,
        height: 60
      },
      name: 'flowInternalStorage'
    }
  }, {
    name: '外部存储',
    icon: 'iconprocess_10',
    data: {
      text: '外部存储',
      rect: {
        width: 90,
        height: 60
      },
      name: 'flowExternStorage'
    }
  }, {
    name: '队列',
    icon: 'iconprocess_11',
    data: {
      text: '队列',
      rect: {
        width: 80,
        height: 80
      },
      name: 'flowQueue'
    }
  }, {
    name: '手动输入',
    icon: 'iconprocess_12',
    data: {
      text: '手动输入',
      rect: {
        width: 90,
        height: 60
      },
      name: 'flowManually'
    }
  }, {
    name: '展示',
    icon: 'iconprocess_13',
    data: {
      text: '展示',
      rect: {
        width: 90,
        height: 60
      },
      name: 'flowDisplay'
    }
  }, {
    name: '并行模式',
    icon: 'iconprocess_14',
    data: {
      text: '并行模式',
      rect: {
        width: 90,
        height: 35
      },
      name: 'flowParallel'
    }
  }, {
    name: '注释',
    icon: 'iconprocess_15',
    data: {
      text: '注释',
      rect: {
        width: 100,
        height: 100
      },
      name: 'flowComment'
    }
  }]
}];
var LinesStyle = [{
  label: '实线',
  //  img: require('@/assets/svg/true_line.svg'),
  value: 0
}, {
  label: '虚线',
  //  img: require('@/assets/svg/dashed_line.svg'),
  value: 1
}];
var ToArrowType = [{
  label: '无箭头',
  value: ''
}, {
  label: '有箭头',
  value: 'triangleSolid'
}];
var Lines = [{
  label: '曲线',
  value: 'curve'
}, {
  label: '线段',
  value: 'polyline'
}, {
  label: '直线',
  value: 'line'
}, {
  label: '脑图曲线',
  value: 'mind'
}];
var FontStyle = [{
  label: '正常',
  value: 'normal'
}, {
  label: '倾斜',
  value: 'italic'
}];
var FontWeight = [{
  label: '正常',
  value: 'normal'
}, {
  label: '加粗',
  value: 'bold'
}];
var TextAlign = [{
  label: '左对齐',
  value: 'left'
}, {
  label: '水平居中',
  value: 'center'
}, {
  label: '右对齐',
  value: 'right'
}];
var VerticalAlign = [{
  label: '底部对齐',
  value: 'top'
}, {
  label: '垂直居中',
  value: 'middle'
}, {
  label: '顶部对齐',
  value: 'bottom'
}];
var predefineColor = ['#409eff', '#ffb649', '#11cf70', '#ff4949', '#909399', '#00ced1', '#1e90ff', '#c71585'];
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"69ead2fe-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-html-loader/lib!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mind-map/CanvasProps.vue?vue&type=template&id=08abcd17&lang=pug&
var CanvasPropsvue_type_template_id_08abcd17_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"xmind-elementprops"},[(!_vm.curElement && !_vm.props.line && !_vm.props.multi)?_c('div',{staticClass:"props-content"},[_c('div',{staticClass:"props-content-title"},[_vm._v("小提示")]),_vm._m(0)]):_vm._e(),(_vm.curElement)?_c('div',{staticClass:"props-content"},[_c('div',{staticClass:"props-content-title"},[_vm._v("外观")]),_c('el-collapse',{model:{value:(_vm.activePropsName),callback:function ($$v) {_vm.activePropsName=$$v},expression:"activePropsName"}},[_c('el-collapse-item',{attrs:{"title":"样式","name":"style"}},[_c('div',{staticClass:"flex"},[_c('div',[_vm._v("线条样式")]),(_vm.curElement.type)?_c('div',[_vm._v("连线类型")]):_vm._e()]),_c('div',{staticClass:"flex"},[_c('div',[_c('el-select',{on:{"change":_vm.onChange},model:{value:(_vm.curElement.dash),callback:function ($$v) {_vm.$set(_vm.curElement, "dash", $$v)},expression:"curElement.dash"}},_vm._l((_vm.LinesStyle),function(item,idx){return _c('el-option',{key:item.id,attrs:{"label":item.label,"value":item.value}})}),1)],1),(_vm.curElement.type)?_c('div',[_c('el-select',{staticClass:"ml-5",on:{"change":_vm.onChange},model:{value:(_vm.curElement.name),callback:function ($$v) {_vm.$set(_vm.curElement, "name", $$v)},expression:"curElement.name"}},_vm._l((_vm.Lines),function(item,idx){return _c('el-option',{key:item.id,attrs:{"label":item.label,"value":item.value}})}),1)],1):_vm._e()]),_c('div',{staticClass:"flex"},[_c('div',[_vm._v("线条颜色")]),_c('div',{staticClass:"ml-5"},[_vm._v("线条宽度（px）")])]),_c('div',{staticClass:"flex"},[_c('div',[_c('el-color-picker',{attrs:{"predefine":_vm.predefineColor},on:{"change":_vm.onChange},model:{value:(_vm.curElement.strokeStyle),callback:function ($$v) {_vm.$set(_vm.curElement, "strokeStyle", $$v)},expression:"curElement.strokeStyle"}})],1),_c('div',{staticClass:"ml-5"},[_c('el-input-number',{attrs:{"controls-position":"right"},on:{"change":_vm.onChange},model:{value:(_vm.curElement.lineWidth),callback:function ($$v) {_vm.$set(_vm.curElement, "lineWidth", $$v)},expression:"curElement.lineWidth"}})],1)]),(!_vm.curElement.type)?_c('div',{staticClass:"flex"},[_c('div',[_vm._v("背景颜色")]),_c('div',[_vm._v("透明度（0 - 1）")])]):_vm._e(),(!_vm.curElement.type)?_c('div',{staticClass:"flex"},[_c('div',[_c('el-color-picker',{attrs:{"predefine":_vm.predefineColor},on:{"change":_vm.onChange},model:{value:(_vm.curElement.fillStyle),callback:function ($$v) {_vm.$set(_vm.curElement, "fillStyle", $$v)},expression:"curElement.fillStyle"}})],1),_c('div',[_c('el-input-number',{attrs:{"controls-position":"right","min":0,"max":1,"step":0.1},on:{"change":_vm.onChange},model:{value:(_vm.curElement.globalAlpha),callback:function ($$v) {_vm.$set(_vm.curElement, "globalAlpha", $$v)},expression:"curElement.globalAlpha"}})],1)]):_vm._e(),(!_vm.curElement.type)?_c('div',{staticClass:"flex"},[_c('div',[_vm._v("圆角（0 - 0.5）")]),_c('div',[_vm._v("旋转（°）")])]):_vm._e(),(!_vm.curElement.type)?_c('div',{staticClass:"flex"},[_c('div',[_c('el-input-number',{attrs:{"controls-position":"right","min":0,"max":0.5,"step":0.1},on:{"change":_vm.onChange},model:{value:(_vm.curElement.borderRadius),callback:function ($$v) {_vm.$set(_vm.curElement, "borderRadius", $$v)},expression:"curElement.borderRadius"}})],1),_c('div',{staticClass:"ml-5"},[_c('el-input-number',{attrs:{"controls-position":"right","min":0,"max":360,"step":5},on:{"change":_vm.onChange},model:{value:(_vm.curElement.rotate),callback:function ($$v) {_vm.$set(_vm.curElement, "rotate", $$v)},expression:"curElement.rotate"}})],1)]):_vm._e(),(_vm.curElement.type)?_c('div',{staticClass:"flex"},[_c('div',[_vm._v("线条箭头")])]):_vm._e(),(_vm.curElement.type)?_c('div',{staticClass:"flex"},[_c('div',[_c('el-select',{on:{"change":_vm.onChange},model:{value:(_vm.curElement.toArrow),callback:function ($$v) {_vm.$set(_vm.curElement, "toArrow", $$v)},expression:"curElement.toArrow"}},_vm._l((_vm.ToArrowType),function(item,idx){return _c('el-option',{key:item.id,attrs:{"label":item.label,"value":item.value}})}),1)],1)]):_vm._e()]),_c('el-collapse-item',{attrs:{"title":"文字","name":"font"}},[_c('div',{staticClass:"flex"},[_c('div',[_vm._v("大小")])]),_c('div',{staticClass:"flex"},[_c('div',[_c('el-input-number',{attrs:{"controls-position":"right","min":0,"max":30,"step":1},on:{"change":_vm.onChange},model:{value:(_vm.curElement.font.fontSize),callback:function ($$v) {_vm.$set(_vm.curElement.font, "fontSize", $$v)},expression:"curElement.font.fontSize"}})],1)]),_c('div',{staticClass:"flex"},[_c('div',[_vm._v("颜色")]),_c('div',{staticClass:"ml-5"},[_vm._v("背景")])]),_c('div',{staticClass:"flex"},[_c('div',[_c('el-color-picker',{attrs:{"predefine":_vm.predefineColor},on:{"change":_vm.onChange},model:{value:(_vm.curElement.font.color),callback:function ($$v) {_vm.$set(_vm.curElement.font, "color", $$v)},expression:"curElement.font.color"}})],1),_c('div',{staticClass:"ml-5"},[_c('el-color-picker',{attrs:{"predefine":_vm.predefineColor},on:{"change":_vm.onChange},model:{value:(_vm.curElement.font.background),callback:function ($$v) {_vm.$set(_vm.curElement.font, "background", $$v)},expression:"curElement.font.background"}})],1)]),_c('div',{staticClass:"flex"},[_c('div',[_vm._v("倾斜")]),_c('div',{staticClass:"ml-5"},[_vm._v("加粗")])]),_c('div',{staticClass:"flex"},[_c('div',[_c('el-select',{on:{"change":_vm.onChange},model:{value:(_vm.curElement.font.fontStyle),callback:function ($$v) {_vm.$set(_vm.curElement.font, "fontStyle", $$v)},expression:"curElement.font.fontStyle"}},_vm._l((_vm.FontStyle),function(item,idx){return _c('el-option',{key:item.id,attrs:{"label":item.label,"value":item.value}})}),1)],1),_c('div',{staticClass:"ml-5"},[_c('el-select',{on:{"change":_vm.onChange},model:{value:(_vm.curElement.font.fontWeight),callback:function ($$v) {_vm.$set(_vm.curElement.font, "fontWeight", $$v)},expression:"curElement.font.fontWeight"}},_vm._l((_vm.FontWeight),function(item,idx){return _c('el-option',{key:item.id,attrs:{"label":item.label,"value":item.value}})}),1)],1)]),_c('div',{staticClass:"flex"},[_c('div',[_vm._v("水平对齐")]),_c('div',{staticClass:"ml-5"},[_vm._v("垂直对齐")])]),_c('div',{staticClass:"flex"},[_c('div',[_c('el-select',{on:{"change":_vm.onChange},model:{value:(_vm.curElement.font.textAlign),callback:function ($$v) {_vm.$set(_vm.curElement.font, "textAlign", $$v)},expression:"curElement.font.textAlign"}},_vm._l((_vm.TextAlign),function(item,idx){return _c('el-option',{key:item.id,attrs:{"label":item.label,"value":item.value}})}),1)],1),_c('div',{staticClass:"ml-5"},[_c('el-select',{on:{"change":_vm.onChange},model:{value:(_vm.curElement.font.textBaseline),callback:function ($$v) {_vm.$set(_vm.curElement.font, "textBaseline", $$v)},expression:"curElement.font.textBaseline"}},_vm._l((_vm.VerticalAlign),function(item,idx){return _c('el-option',{key:item.id,attrs:{"label":item.label,"value":item.value}})}),1)],1)]),_c('div',{staticClass:"flex"},[_c('div',[_vm._v("内容")])]),_c('div',{staticClass:"flex"},[_c('div',[_c('el-input',{attrs:{"type":"textarea"},on:{"input":_vm.onChange},model:{value:(_vm.curElement.text),callback:function ($$v) {_vm.$set(_vm.curElement, "text", $$v)},expression:"curElement.text"}})],1)])]),(!_vm.curElement.type)?_c('el-collapse-item',{staticClass:"props-icon",attrs:{"title":"图标","name":"icon"}},[_c('div',{staticClass:"fb fb-cross-center"},[_c('span',[_vm._v("图标选择")]),_c('div',{staticClass:"ml-10",on:{"click":function($event){_vm.showIconDialog = true}}},[(_vm.curIcon)?_c('i',{staticClass:"iconfont-mindmap",class:_vm.curIcon.class}):_c('i',{staticClass:"el-icon-plus"})])]),_c('div',{staticClass:"fb fb-cross-center mt-10"},[_c('span',[_vm._v("图标大小")]),_c('el-input-number',{staticClass:"ml-10",attrs:{"controls-position":"right","min":0,"max":30,"step":1},on:{"change":_vm.onChange},model:{value:(_vm.curElement.iconSize),callback:function ($$v) {_vm.$set(_vm.curElement, "iconSize", $$v)},expression:"curElement.iconSize"}})],1),_c('div',{staticClass:"fb fb-cross-center mt-10"},[_c('span',[_vm._v("图标颜色")]),_c('el-color-picker',{staticClass:"ml-10",attrs:{"predefine":_vm.predefineColor},on:{"change":_vm.onChange},model:{value:(_vm.curElement.iconColor),callback:function ($$v) {_vm.$set(_vm.curElement, "iconColor", $$v)},expression:"curElement.iconColor"}})],1)]):_vm._e()],1)],1):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showIconDialog),expression:"showIconDialog"}],staticClass:"icon-dialog"},[_c('div',{staticClass:"icon-dialog-header"},[_c('div',{staticClass:"title"},[_vm._v("选择字体图标")]),_c('el-link',{attrs:{"type":"primary"},on:{"click":function($event){_vm.showIconDialog = false}}},[_vm._v("返回")])],1),_c('div',{staticClass:"icon-dialog-content"},[_c('div',{staticClass:"empty iconitem",on:{"click":function($event){return _vm.changeIcon()}}},[_vm._v("空")]),_vm._l((_vm.Icons),function(icon,idx){return _c('i',{key:idx,staticClass:"iconitem iconfont-mindmap",class:icon.class,on:{"click":function($event){return _vm.changeIcon(icon)}}})}),_c('i',{staticClass:"iconitem"}),_c('i',{staticClass:"iconitem"})],2)])])}
var CanvasPropsvue_type_template_id_08abcd17_lang_pug_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"group"},[_c('li',[_vm._v("方向键：控制节点移动5个像素")]),_c('li',[_vm._v("Ctrl + 鼠标移动：移动整个画布")]),_c('li',[_vm._v("Ctrl + 鼠标滚轮：缩放")]),_c('li',[_vm._v("添加或选中节点，右侧属性栏支持添加节点图标")])])}]


// CONCATENATED MODULE: ./src/views/mind-map/CanvasProps.vue?vue&type=template&id=08abcd17&lang=pug&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mind-map/CanvasProps.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var CanvasPropsvue_type_script_lang_js_ = ({
  props: {
    props: {
      type: Object,
      require: true,
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      nodeId: null,
      nodeIsJson: false,
      nodeData: '',
      Icons: Icons,
      Lines: Lines,
      LinesStyle: LinesStyle,
      predefineColor: predefineColor,
      FontStyle: FontStyle,
      FontWeight: FontWeight,
      TextAlign: TextAlign,
      VerticalAlign: VerticalAlign,
      ToArrowType: ToArrowType,
      showIconDialog: false,
      curIcon: null,
      activePropsName: ['style', 'icon', 'font']
    };
  },
  computed: {
    curElement: function curElement() {
      // 先只对节点和线做处理
      return this.props.node ? this.props.node : this.props.line;
    }
  },
  updated: function updated() {
    var _this = this;

    if (!this.curElement || this.nodeId === this.curElement.id) {
      return;
    }

    if (this.curElement.icon) {
      this.curIcon = this.Icons.find(function (item) {
        return item.unicode === _this.curElement.icon;
      });
    } else {
      this.curIcon = null;
    }

    this.nodeId = this.curElement.id;
    var originData = this.curElement.data;
    this.nodeIsJson = this.isJson(originData);
    this.nodeData = this.nodeIsJson ? JSON.stringify(originData, null, 4) : this.nodeData = originData;
  },
  methods: {
    changeIcon: function changeIcon(icon) {
      this.curIcon = icon || null;
      this.curElement.iconFamily = 'iconfont-mindmap';
      this.curElement.icon = icon ? icon.unicode : '';
      this.showIconDialog = false;
      this.onChange();
    },
    onChange: function onChange() {
      if (this.curElement) {
        this.curElement.data = this.nodeIsJson ? JSON.parse(this.nodeData) : this.nodeData;
      }

      this.$emit('change', this.curElement);
    },
    isJson: function isJson(obj) {
      return Object(esm_typeof["a" /* default */])(obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
    }
  }
});
// CONCATENATED MODULE: ./src/views/mind-map/CanvasProps.vue?vue&type=script&lang=js&
 /* harmony default export */ var mind_map_CanvasPropsvue_type_script_lang_js_ = (CanvasPropsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/mind-map/CanvasProps.vue?vue&type=style&index=0&lang=less&
var CanvasPropsvue_type_style_index_0_lang_less_ = __webpack_require__("d6f5");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/mind-map/CanvasProps.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  mind_map_CanvasPropsvue_type_script_lang_js_,
  CanvasPropsvue_type_template_id_08abcd17_lang_pug_render,
  CanvasPropsvue_type_template_id_08abcd17_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CanvasProps = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"69ead2fe-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-html-loader/lib!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mind-map/CanvasContextMenu.vue?vue&type=template&id=6e77ba8b&lang=pug&
var CanvasContextMenuvue_type_template_id_6e77ba8b_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"xmind-contextmenu"},[(_vm.props.nodes)?_c('div',[_c('a',{on:{"click":function($event){return _vm.onCombine()}}},[_vm._v("组合")]),_c('div',[_c('a',{on:{"click":function($event){return _vm.onCombine(true)}}},[_vm._v("包含")])])]):_vm._e(),(_vm.props.node && _vm.props.node.name === 'combine')?_c('div',[_c('a',{on:{"click":function($event){return _vm.onUncombine()}}},[_vm._v("取消组合/包含")])]):_vm._e(),(_vm.props.nodes)?_c('div',{staticClass:"line"}):_vm._e(),_c('div',[_c('a',{class:{disabled:!_vm.props.node && !_vm.props.nodes},on:{"click":function($event){return _vm.onLock()}}},[_vm._v(_vm._s(_vm.props.locked ? '解锁' : '锁定'))])]),_c('div',{staticClass:"line"}),_c('div',[_c('a',{class:{disabled:!_vm.props.node && !_vm.props.nodes && !_vm.props.line},on:{"click":function($event){return _vm.onDel()}}},[_vm._v("删除")])]),_c('div',{staticClass:"line"}),_c('div',[_c('a',{on:{"click":function($event){return _vm.canvas.undo()}}},[_c('span',[_vm._v("撤销")]),_c('span',[_vm._v("Ctrl + Z")])])]),_c('div',[_c('a',{on:{"click":function($event){return _vm.canvas.redo()}}},[_c('span',[_vm._v("恢复")]),_c('span',[_vm._v("Ctrl + Shift+ Z")])])]),_c('div',{staticClass:"line"}),_c('div',[_c('a',{on:{"click":function($event){return _vm.canvas.cut()}}},[_c('span',[_vm._v("剪切")]),_c('span',[_vm._v("Ctrl + X")])])]),_c('div',[_c('a',{on:{"click":function($event){return _vm.canvas.copy()}}},[_c('span',[_vm._v("复制")]),_c('span',[_vm._v("Ctrl + C")])])]),_c('div',[_c('a',{on:{"click":function($event){return _vm.canvas.parse()}}},[_c('span',[_vm._v("粘贴")]),_c('span',[_vm._v("Ctrl + V")])])])])}
var CanvasContextMenuvue_type_template_id_6e77ba8b_lang_pug_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/mind-map/CanvasContextMenu.vue?vue&type=template&id=6e77ba8b&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mind-map/CanvasContextMenu.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var CanvasContextMenuvue_type_script_lang_js_ = ({
  data: function data() {
    return {};
  },
  props: {
    canvas: {
      type: Object,
      require: true
    },
    props: {
      type: Object,
      require: true
    }
  },
  methods: {
    onTop: function onTop() {
      if (this.props.node) {
        this.canvas.top(this.props.node);
      }

      if (this.props.nodes) {
        var _iterator = Object(createForOfIteratorHelper["a" /* default */])(this.props.nodes),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            this.canvas.top(item);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this.canvas.render();
    },
    onBottom: function onBottom() {
      if (this.props.node) {
        this.canvas.bottom(this.props.node);
      }

      if (this.props.nodes) {
        var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(this.props.nodes),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item = _step2.value;
            this.canvas.bottom(item);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      this.canvas.render();
    },
    onCombine: function onCombine(stand) {
      if (!this.props.nodes) {
        return;
      }

      this.canvas.combine(this.props.nodes, stand);
      this.canvas.render();
    },
    onUncombine: function onUncombine() {
      if (!this.props.node) {
        return;
      }

      this.canvas.uncombine(this.props.node);
      this.canvas.render();
    },
    onLock: function onLock() {
      this.props.locked = !this.props.locked;

      if (this.props.node) {
        this.props.node.locked = this.props.locked;
      }

      if (this.props.nodes) {
        var _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(this.props.nodes),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var item = _step3.value;
            item.locked = this.props.locked;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      if (this.props.lines) {
        var _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(this.props.lines),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _item = _step4.value;
            _item.locked = this.props.locked;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }

      this.canvas.render(true);
    },
    onDel: function onDel() {
      this.canvas.delete();
    }
  }
});
// CONCATENATED MODULE: ./src/views/mind-map/CanvasContextMenu.vue?vue&type=script&lang=js&
 /* harmony default export */ var mind_map_CanvasContextMenuvue_type_script_lang_js_ = (CanvasContextMenuvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/mind-map/CanvasContextMenu.vue?vue&type=style&index=0&lang=less&
var CanvasContextMenuvue_type_style_index_0_lang_less_ = __webpack_require__("fa04");

// CONCATENATED MODULE: ./src/views/mind-map/CanvasContextMenu.vue






/* normalize component */

var CanvasContextMenu_component = Object(componentNormalizer["a" /* default */])(
  mind_map_CanvasContextMenuvue_type_script_lang_js_,
  CanvasContextMenuvue_type_template_id_6e77ba8b_lang_pug_render,
  CanvasContextMenuvue_type_template_id_6e77ba8b_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CanvasContextMenu = (CanvasContextMenu_component.exports);
// EXTERNAL MODULE: ./src/data/api.js
var api = __webpack_require__("909f");

// EXTERNAL MODULE: ./src/services/store.js
var store = __webpack_require__("ebd4");

// EXTERNAL MODULE: ./node_modules/@juggle/resize-observer/lib/exports/resize-observer.js + 21 modules
var resize_observer = __webpack_require__("1d1f");

// EXTERNAL MODULE: ./node_modules/@topology/flow-diagram/index.js + 39 modules
var flow_diagram = __webpack_require__("96c7");

// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-browser/v4.js + 4 modules
var v4 = __webpack_require__("ec26");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mind-map/index.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
 // import * as FileSaver from 'file-saver'







 // 注册流程图相关图示


/* harmony default export */ var mind_mapvue_type_script_lang_js_ = ({
  name: "XmindWorkspace",
  components: {
    CanvasProps: CanvasProps,
    CanvasContextMenu: CanvasContextMenu
  },
  data: function data() {
    return {
      tools: Tools,
      choosedElement: {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false
      },
      contextmenu: {
        left: null,
        top: null,
        bottom: null
      },
      canvasOptions: {
        disableEmptyLine: true,
        // hideRotateCP: true,
        dragColor: "#409eff",
        activeColor: "#409eff" // rotateCursor: require('../../assets/workplace/no-data-gray.svg')

      },
      canvas: null,
      mindId: null,
      mindType: 1,
      // 1：脑图；2：脑图模版（战法库）；
      eventId: null,
      loading: false,
      mindModel: false,
      form: {
        remark: "",
        title: ""
      },
      showGrid: false,
      openAside: true
    };
  },
  computed: {
    scale: function scale() {
      return Math.floor((this.canvas && this.canvas.data.scale) * 100);
    }
  },
  watch: {
    $route: function $route() {
      // 重新加载路由要重新获取路由参数
      this.mindId = this.$route.params.id;
      this.eventId = this.$route.query.event_id;
      var newToDetail = this.$route.query.newToDetail;
      this.choosedElement = {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false
      };

      if (this.mindId) {
        !newToDetail && this.getMindDetail();
      } else {
        this.form.remark = "";
        this.form.title = "";
        this.canvas.open();
      }
    }
  },
  mounted: function mounted() {
    Object(flow_diagram["a" /* register */])();
    this.initPage();
    this.contextmenuHiddenHandle();
    this.mindMapResizeHandle();
    this.freshHandle();
  },
  beforeDestroy: function beforeDestroy() {
    this.canvas.destroy();
    document.onclick = null;
    window.onbeforeunload = null;
  },
  methods: {
    initPage: function initPage() {
      this.canvasOptions.on = this.onMessage;
      this.canvas = new core["d" /* Topology */]("topology-canvas", this.canvasOptions);
      this.canvas.data.lineName = "mind";
      this.canvas.data.fromArrowType = "";
      this.canvas.data.toArrowType = "";
      this.mindId = this.$route.params.id;
      this.mindType = this.$route.query.type || 1;
      this.eventId = this.$route.query.event_id || "1";

      if (this.mindId) {
        this.getMindDetail();
      }
    },
    clearMindMap: function clearMindMap() {
      var _this = this;

      this.canvas.open();
      this.$nextTick(function () {
        _this.$refs.form && _this.$refs.form.resetFields();
      });
      this.choosedElement = {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false
      };
    },
    // 左侧收起时重置canvns大小
    mindMapResizeHandle: function mindMapResizeHandle() {
      var _this2 = this;

      var mindMap = this.$refs["xmind-container"];
      var ResizeObserver = window.ResizeObserver || resize_observer["a" /* ResizeObserver */];
      var ro = new ResizeObserver(this._.throttle(function () {
        _this2.canvas.resize();
      }, 20));
      ro.observe(mindMap);
    },
    showGridChange: function showGridChange() {
      this.canvas.data.grid = this.showGrid;
      this.canvas.showGrid(this.showGrid);
      this.onUpdateProps();
    },
    scaleCanvas: function scaleCanvas(value) {
      if (value) {
        var scale;

        if (this.canvas.data.scale >= 4.9 && value > 0) {
          scale = 5;
        } else if (this.canvas.data.scale <= 0.35 && value < 0) {
          scale = 0.25;
        } else {
          scale = this.canvas.data.scale + value;
        }

        this.canvas.scaleTo(scale);
      } else {
        this.canvas.scaleTo(1);
      }
    },
    showSaveDialog: function showSaveDialog() {
      var _this3 = this;

      this.mindModel = true;

      if (!this.mindId) {
        // 新建的时候要清空表单，但是会触发title校验
        this.$nextTick(function () {
          _this3.$refs.form.clearValidate("title");
        });
      }
    },
    contextmenuHiddenHandle: function contextmenuHiddenHandle() {
      var _this4 = this;

      document.onclick = function () {
        _this4.contextmenu = {
          left: null,
          top: null,
          bottom: null
        };
      };
    },
    getMindDetail: function getMindDetail() {
      var _this5 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = {
                  id: _this5.mindId,
                  type: _this5.mindType,
                  event_id: _this5.eventId
                };
                _this5.loading = true;
                _context.prev = 2;
                _context.next = 5;
                return api["a" /* default */].getMindById(params);

              case 5:
                data = _context.sent;
                _this5.loading = false;
                _this5.form.title = data.title;
                _this5.form.remark = data.remark;
                _this5.showGrid = data.detail.grid;
                data && _this5.canvas.open(data.detail);
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](2);
                _this5.loading = false;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 13]]);
      }))();
    },
    onDrag: function onDrag(event, node) {
      event.dataTransfer.setData("Topology", JSON.stringify(node.data));
    },
    onMessage: function onMessage(event, data) {
      var _this6 = this;

      // console.log('onMessage', event, data)
      // 右侧输入框编辑状态时点击编辑区域其他元素，onMessage执行后才执行onUpdateProps方法，通过setTimeout让onUpdateProps先执行
      setTimeout(function () {
        switch (event) {
          case "node":
          case "addNode":
            _this6.choosedElement = {
              node: data,
              line: null,
              multi: false,
              nodes: null,
              locked: data.locked
            };
            break;

          case "line":
          case "addLine":
            _this6.choosedElement = {
              node: null,
              line: data,
              multi: false,
              nodes: null,
              locked: data.locked
            };
            break;

          case "multi":
            _this6.choosedElement = {
              node: null,
              line: null,
              multi: true,
              nodes: data.length > 1 ? data : null,
              locked: _this6.getLocked({
                nodes: data
              })
            };
            break;

          case "space":
            _this6.choosedElement = {
              node: null,
              line: null,
              multi: false,
              nodes: null,
              locked: false
            };
            break;

          case "moveOut":
            break;

          case "moveNodes":
          case "resizeNodes":
            if (data.length > 1) {
              _this6.choosedElement = {
                node: null,
                line: null,
                multi: true,
                nodes: data,
                locked: _this6.getLocked({
                  nodes: data
                })
              };
            } else {
              _this6.choosedElement = {
                node: data[0],
                line: null,
                multi: false,
                nodes: null,
                locked: false
              };
            }

            break;

          case "resize":
          case "scale":
          case "locked":
            // if (this.canvas && this.canvas.data) {
            //   this.$store.commit('canvas/data', {
            //     scale: this.canvas.data.scale || 1,
            //     lineName: this.canvas.data.lineName,
            //     fromArrowType: canvas.data.fromArrowType,
            //     toArrowType: canvas.data.toArrowType,
            //     fromArrowlockedType: canvas.data.locked
            //   });
            // }
            break;
        }
      }, 0);
    },
    getLocked: function getLocked(data) {
      var locked = true;

      if (data.nodes && data.nodes.length) {
        var _iterator = Object(createForOfIteratorHelper["a" /* default */])(data.nodes),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;

            if (!item.locked) {
              locked = false;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      if (locked && data.lines) {
        var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(data.lines),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _item = _step2.value;

            if (!_item.locked) {
              locked = false;
              break;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return locked;
    },
    onUpdateProps: function onUpdateProps(node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node);
    },
    handle_open: function handle_open(data) {
      this.handle_replace(data);
    },
    handle_replace: function handle_replace() {
      var _this7 = this;

      var input = document.createElement("input");
      input.type = "file";

      input.onchange = function (event) {
        var elem = event.srcElement || event.target;

        if (elem.files && elem.files[0]) {
          // const name = elem.files[0].name.replace('.json', '')
          var reader = new FileReader();

          reader.onload = function (e) {
            var text = e.target.result + "";

            try {
              var data = JSON.parse(text);

              _this7.canvas.open(data);
            } catch (e) {
              return false;
            }
          };

          reader.readAsText(elem.files[0]);
        }
      };

      input.click();
    },
    freshHandle: function freshHandle() {
      var _this8 = this;

      window.onbeforeunload = function (e) {
        if (!_this8.mindId) {
          if (e) e.returnValue = "关闭提示";
          return "关闭提示";
        }
      };
    },
    // handle_save(data) {
    //   console.log('save')
    //   FileSaver.saveAs(
    //     new Blob([JSON.stringify(this.canvas.data)], {
    //       type: 'text/plain;charset=utf-8',
    //     }),
    //     `le5le.topology.json`,
    //   )
    // },
    handleSavePng: function handleSavePng(data) {
      var name = (this.form.title || "未命名") + (data.ext || ".png");
      this.canvas.saveAsImage(name, 50, data.type, data.quality);
    },
    onContextMenu: function onContextMenu(event) {
      event.preventDefault();
      event.stopPropagation();

      if (!event.ctrlKey) {
        if (event.clientY + 360 < document.body.clientHeight) {
          this.contextmenu = {
            left: event.clientX + "px",
            top: event.clientY + "px"
          };
        } else {
          this.contextmenu = {
            left: event.clientX + "px",
            bottom: document.body.clientHeight - event.clientY + "px"
          };
        }
      }
    },
    saveXmind: function saveXmind() {
      var _this9 = this;

      console.log(this.canvas.toImage);
      this.canvas.toImage(50, "png", null, /*#__PURE__*/function () {
        var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(blob) {
          var file_path, formData, name, blob_file, params;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _this9.loading = true;

                  if (!blob) {
                    _context2.next = 21;
                    break;
                  }

                  // 生成图片成功才上传
                  formData = new FormData();
                  name = Object(v4["a" /* default */])();
                  blob_file = new File([blob], "".concat(name, ".png"));
                  formData.append("file", blob_file);
                  _context2.prev = 6;
                  _context2.next = 9;
                  return api["a" /* default */].upLoadImg(formData);

                case 9:
                  _context2.t0 = _context2.sent;

                  if (_context2.t0) {
                    _context2.next = 12;
                    break;
                  }

                  _context2.t0 = {};

                case 12:
                  file_path = _context2.t0;
                  _context2.next = 19;
                  break;

                case 15:
                  _context2.prev = 15;
                  _context2.t1 = _context2["catch"](6);
                  _this9.loading = false;
                  console.log(_context2.t1);

                case 19:
                  _context2.next = 22;
                  break;

                case 21:
                  file_path = ""; // 新建一个空的脑图，blob为null

                case 22:
                  params = {
                    event_id: _this9.eventId,
                    detail: _this9.canvas.data,
                    remark: _this9.form.remark,
                    title: _this9.form.title,
                    type: _this9.mindType,
                    imageUrl: file_path
                  };

                  if (_this9.mindId) {
                    params.id = _this9.mindId;
                    api["a" /* default */].updateMindById(params).then(function () {
                      store["a" /* default */].set("upDateMindMapList", true);

                      _this9.$message.success("编辑成功");

                      _this9.mindModel = false;
                      _this9.loading = false;
                    }).catch(function () {
                      _this9.$message.error("编辑失败");

                      _this9.loading = false;
                    });
                  } else {
                    api["a" /* default */].createMind(params).then(function (res) {
                      store["a" /* default */].set("upDateMindMapList", true);

                      _this9.$message.success("新建成功");

                      _this9.mindModel = false;
                      _this9.loading = false; // 新建之后当前页面变成编辑页面

                      _this9.$router.replace({
                        params: {
                          id: res.id
                        },
                        query: {
                          event_id: _this9.eventId,
                          newToDetail: true
                        }
                      });
                    }).catch(function () {
                      _this9.$message.error("新建失败");

                      _this9.loading = false;
                    });
                  }

                case 24:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[6, 15]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (!this.mindId) {
      this.$confirm("当前页面数据未保存，确定离开？", {
        type: "warning"
      }).then(function () {
        next();
      }).catch(function () {
        next(false);
      });
    } else {
      next();
    }
  }
});
// CONCATENATED MODULE: ./src/views/mind-map/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_mind_mapvue_type_script_lang_js_ = (mind_mapvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/mind-map/index.vue?vue&type=style&index=0&lang=less&
var mind_mapvue_type_style_index_0_lang_less_ = __webpack_require__("e159");

// CONCATENATED MODULE: ./src/views/mind-map/index.vue






/* normalize component */

var mind_map_component = Object(componentNormalizer["a" /* default */])(
  views_mind_mapvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var mind_map = __webpack_exports__["default"] = (mind_map_component.exports);

/***/ }),

/***/ "4db0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "909f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cca6");
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_xieqiang_pro_extension_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5530");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("bc3a");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants_error_code__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("19be");


 // import downFile from '@/utils/downFile'


axios__WEBPACK_IMPORTED_MODULE_2___default.a.__errCode = Object.assign(axios__WEBPACK_IMPORTED_MODULE_2___default.a.__errCode || {}, _constants_error_code__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]); // const genPostReq = url => (...params) => axios.post(url, ...params)

var workstation = {
  getMindMapList: function getMindMapList(params) {
    /* 获取用户研判列表: query
      page: number,
      count: number,
      event_id: string,
      type: number[], // 1-脑图；2-模板 
    */
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/workstation/mind_map/getList', params);
  },
  getCollectionList: function getCollectionList(params) {
    /* query:
      page: number,
      count: nubmer,
      event_id: string,
      type?: number[] 
     */
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/workstation/collection/getList', params);
  },
  createCollection: function createCollection(params) {
    /* 获取用户研判列表: query
      event_id: string,
      detail: { [key: string]: string },
      remark: string,
      type: number, // '类型: 0-其他; 1-id; 2-wifi; 3-ip; 4-app; 5-location; 6-text; 7-link; 8-image'
      collectionKey: string, // 收藏唯一表示, 0-空;1-4-对应id;5-lng,lat
      title: string,
    */
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/workstation/collection/create', params);
  },
  deleteCollection: function deleteCollection(params) {
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/workstation/collection/deleteById', params);
  },
  updateCollection: function updateCollection(params) {
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/workstation/collection/updateById', params, {
      keepEmptyProps: true
    });
  },
  downloadImg: function downloadImg(params) {
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/webfile/webfile/download', params, {
      responseType: 'blob'
    });
  },
  createMind: function createMind(params) {
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/workstation/mind_map/create', params);
  },
  deleteMindById: function deleteMindById(params) {
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/workstation/mind_map/deleteById', params);
  },
  updateMindById: function updateMindById(params) {
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/workstation/mind_map/updateById', params);
  },
  getMindById: function getMindById(params) {
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/workstation/mind_map/getById', params);
  },
  // upLoadImg(params) {
  //   return axios.post('/webfile/webfile/upload', params)
  // },
  upLoadImg: function upLoadImg(params) {
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/file/upload', params);
  }
};
/* harmony default export */ __webpack_exports__["a"] = (Object(_Users_xieqiang_pro_extension_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
  createFeedback: function createFeedback(params) {
    return axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/administrate/feedback/create', params);
  }
}, workstation));

/***/ }),

/***/ "d6f5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CanvasProps_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2f17");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CanvasProps_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CanvasProps_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CanvasProps_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e159":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4db0");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fa04":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CanvasContextMenu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0ef6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CanvasContextMenu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CanvasContextMenu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CanvasContextMenu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);
//# sourceMappingURL=myPlugin.umd.mind-map.js.map