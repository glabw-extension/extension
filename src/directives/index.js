import Vue from 'vue'
import glabClickoutside from './clickoutside'
const directives = {
  glabClickoutside,
}

Object.keys(directives).forEach(name => Vue.directive(name, directives[name]))
