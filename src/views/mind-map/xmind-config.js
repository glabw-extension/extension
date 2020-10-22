export const Icons = [
  {
    class: 'iconnanxing',
    unicode: '\ue69c',
  },
  {
    class: 'iconnvxing',
    unicode: '\ue69f',
  },
  {
    class: 'iconshouji',
    unicode: '\ue69e',
  },
  {
    class: 'iconWIFI',
    unicode: '\ue6a4',
  },
  {
    class: 'iconIP',
    unicode: '\ue699',
  },
  {
    class: 'iconAPP',
    unicode: '\ue69d',
  },
  {
    class: 'iconweizhi',
    unicode: '\ue698',
  },
  {
    class: 'iconjiatingdi',
    unicode: '\ue6a2',
  },
  {
    class: 'icongongzuodi',
    unicode: '\ue6a0',
  },
  {
    class: 'iconPN',
    unicode: '\ue6a1',
  },
  {
    class: 'iconIMSI',
    unicode: '\ue6a3',
  },
  {
    class: 'iconIMEI',
    unicode: '\ue69a',
  },
  {
    class: 'iconMAC',
    unicode: '\ue69b',
  },
  {
    class: 'iconOAID',
    unicode: '\ue697',
  },
  {
    class: 'iconIDFA',
    unicode: '\ue696',
  },
]
export const Tools = [
  {
    group: '基本形状',
    children: [
      {
        name: 'rectangle',
        icon: 'iconbasic_1',
        data: {
          text: '正方形',
          rect: {
            width: 70,
            height: 70,
          },
          name: 'rectangle',
        },
      },
      {
        name: 'rectangle',
        icon: 'iconbasic_2',
        data: {
          text: '圆角矩形',
          rect: {
            width: 100,
            height: 30,
          },
          borderRadius: 0.1,
          name: 'rectangle',
        },
      },
      {
        name: 'circle',
        icon: 'iconbasic_5',
        data: {
          text: '圆',
          rect: {
            width: 70,
            height: 70,
          },
          name: 'circle',
          textMaxLine: 1,
        },
      },
      {
        name: 'triangle',
        icon: 'iconbasic_4',
        data: {
          text: '三角形',
          rect: {
            width: 70,
            height: 70,
          },
          name: 'triangle',
        },
      },
      {
        name: 'diamond',
        icon: 'iconbasic_3',
        data: {
          text: '菱形',
          rect: {
            width: 70,
            height: 70,
          },
          name: 'diamond',
        },
      },
      {
        name: 'pentagon',
        icon: 'iconbasic_6',
        data: {
          text: '五边形',
          rect: {
            width: 70,
            height: 70,
          },
          name: 'pentagon',
        },
      },
      {
        name: 'hexagon',
        icon: 'iconbasic_7',
        data: {
          text: '六边形',
          rect: {
            width: 70,
            height: 70,
          },
          name: 'hexagon',
        },
      },
      {
        name: 'pentagram',
        icon: 'iconbasic_8',
        data: {
          text: '五角星',
          rect: {
            width: 70,
            height: 70,
          },
          name: 'pentagram',
        },
      },
      {
        name: 'leftArrow',
        icon: 'iconbasic_9',
        data: {
          text: '左箭头',
          rect: {
            width: 100,
            height: 50,
          },
          name: 'leftArrow',
        },
      },
      {
        name: 'rightArrow',
        icon: 'iconbasic_10',
        data: {
          text: '右箭头',
          rect: {
            width: 100,
            height: 50,
          },
          name: 'rightArrow',
        },
      },
      {
        name: 'twowayArrow',
        icon: 'iconbasic_11',
        data: {
          text: '双向箭头',
          rect: {
            width: 100,
            height: 50,
          },
          name: 'twowayArrow',
        },
      },
      {
        name: 'line',
        icon: 'iconbasic_20',
        data: {
          text: '直线',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'line',
        },
      },
      {
        name: 'cloud',
        icon: 'iconbasic_13',
        data: {
          text: '云',
          rect: {
            width: 50,
            height: 50,
          },
          name: 'cloud',
        },
      },
      {
        name: 'message',
        icon: 'iconbasic_12',
        data: {
          text: '消息框',
          rect: {
            width: 80,
            height: 80,
          },
          // paddingLeft: 10,
          // paddingRight: 10,
          // paddingTop: 10,
          // paddingBottom: 10,
          name: 'message',
        },
      },
      {
        name: 'file',
        icon: 'iconbasic_14',
        data: {
          text: '文档',
          rect: {
            width: 64,
            height: 80,
          },
          // paddingLeft: 10,
          // paddingRight: 10,
          // paddingTop: 10,
          // paddingBottom: 10,
          name: 'file',
        },
      },
      {
        name: 'text',
        icon: 'iconbasic_16',
        data: {
          text: '请输入文字',
          rect: {
            width: 160,
            height: 30,
          },
          name: 'text',
        },
      },
      //  {
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
            height: 70,
          },
          is3D: true,
          z: 10,
          zRotate: 15,
          // fillStyle: '#ddd',
          name: 'cube',
        },
      },
      {
        name: 'people',
        icon: 'iconbasic_18',
        data: {
          text: '人',
          rect: {
            width: 35,
            height: 50,
          },
          name: 'people',
        },
      },
      // {
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
    ],
  },
  {
    group: '流程图',
    children: [
      {
        name: '开始/结束',
        icon: 'iconprocess_1',
        data: {
          text: '开始',
          rect: {
            width: 90,
            height: 30,
          },
          borderRadius: 0.5,
          name: 'rectangle',
        },
      },
      {
        name: '流程',
        icon: 'iconprocess_2',
        data: {
          text: '流程',
          rect: {
            width: 90,
            height: 30,
          },
          name: 'rectangle',
        },
      },
      {
        name: '判定',
        icon: 'iconprocess_3',
        data: {
          text: '判定',
          rect: {
            width: 90,
            height: 45,
          },
          name: 'diamond',
        },
      },
      {
        name: '数据',
        icon: 'iconprocess_4',
        data: {
          text: '数据',
          rect: {
            width: 90,
            height: 40,
          },
          name: 'flowData',
        },
      },
      {
        name: '准备',
        icon: 'iconprocess_5',
        data: {
          text: '准备',
          rect: {
            width: 90,
            height: 40,
          },
          name: 'hexagon',
        },
      },
      {
        name: '子流程',
        icon: 'iconprocess_6',
        data: {
          text: '子流程',
          rect: {
            width: 90,
            height: 40,
          },
          name: 'flowSubprocess',
        },
      },
      {
        name: '数据库',
        icon: 'iconprocess_7',
        data: {
          text: '数据库',
          rect: {
            width: 60,
            height: 90,
          },
          name: 'flowDb',
        },
      },
      {
        name: '文档',
        icon: 'iconprocess_8',
        data: {
          text: '文档',
          rect: {
            width: 90,
            height: 75,
          },
          name: 'flowDocument',
        },
      },
      {
        name: '内部存储',
        icon: 'iconprocess_9',
        data: {
          text: '内部存储',
          rect: {
            width: 90,
            height: 60,
          },
          name: 'flowInternalStorage',
        },
      },
      {
        name: '外部存储',
        icon: 'iconprocess_10',
        data: {
          text: '外部存储',
          rect: {
            width: 90,
            height: 60,
          },
          name: 'flowExternStorage',
        },
      },
      {
        name: '队列',
        icon: 'iconprocess_11',
        data: {
          text: '队列',
          rect: {
            width: 80,
            height: 80,
          },
          name: 'flowQueue',
        },
      },
      {
        name: '手动输入',
        icon: 'iconprocess_12',
        data: {
          text: '手动输入',
          rect: {
            width: 90,
            height: 60,
          },
          name: 'flowManually',
        },
      },
      {
        name: '展示',
        icon: 'iconprocess_13',
        data: {
          text: '展示',
          rect: {
            width: 90,
            height: 60,
          },
          name: 'flowDisplay',
        },
      },
      {
        name: '并行模式',
        icon: 'iconprocess_14',
        data: {
          text: '并行模式',
          rect: {
            width: 90,
            height: 35,
          },
          name: 'flowParallel',
        },
      },
      {
        name: '注释',
        icon: 'iconprocess_15',
        data: {
          text: '注释',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'flowComment',
        },
      },
    ],
  },
]

export const LinesStyle = [
  {
    label: '实线',
    //  img: require('@self/assets/svg/true_line.svg'),
    value: 0,
  },
  {
    label: '虚线',
    //  img: require('@self/assets/svg/dashed_line.svg'),
    value: 1,
  },
]
export const ToArrowType = [
  {
    label: '无箭头',
    value: '',
  },
  {
    label: '有箭头',
    value: 'triangleSolid',
  },
]
export const Lines = [
  {
    label: '曲线',
    value: 'curve',
  },
  {
    label: '线段',
    value: 'polyline',
  },
  {
    label: '直线',
    value: 'line',
  },
  {
    label: '脑图曲线',
    value: 'mind',
  },
]
export const FontStyle = [
  {
    label: '正常',
    value: 'normal',
  },
  {
    label: '倾斜',
    value: 'italic',
  },
]
export const FontWeight = [
  {
    label: '正常',
    value: 'normal',
  },
  {
    label: '加粗',
    value: 'bold',
  },
]
export const TextAlign = [
  {
    label: '左对齐',
    value: 'left',
  },
  {
    label: '水平居中',
    value: 'center',
  },
  {
    label: '右对齐',
    value: 'right',
  },
]
export const VerticalAlign = [
  {
    label: '底部对齐',
    value: 'top',
  },
  {
    label: '垂直居中',
    value: 'middle',
  },
  {
    label: '顶部对齐',
    value: 'bottom',
  },
]
export const predefineColor = [
  '#5f82ff',
  '#ffb649',
  '#11cf70',
  '#ff4949',
  '#909399',
  '#00ced1',
  '#1e90ff',
  '#c71585',
]
