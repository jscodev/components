import Demo from './Demo.vue';

Demo.install = function (Vue) {
  Vue.component(Demo.name, Demo)
}

export default Demo;
