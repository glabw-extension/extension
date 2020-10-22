import mindMap from '../pages/mind-map'

// 围栏模板
const mindMapRoutes = [
  {
    name: 'workstation.mindMap',
    path: '/workstation/mindMap/:id?',
    component: mindMap.main,
  },
]

export default [...mindMapRoutes]
