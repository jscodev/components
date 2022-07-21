import Vue from 'vue'
import VueRouter from 'vue-router'

const componentsContext = require.context('../components', true, /\.vue$/)
export const routes = []

componentsContext.keys().forEach((key) => {
  const component = componentsContext(key).default
  if (!component.name) {
    component.name = key.match(/(?<=\/)[A-Za-z].+(?=\/)/g)[0]
  }
  let componentName = toKebab(component.name)
  routes.push({
    path: `/${componentName}`,
    component: component,
    textName: component.name,
    name: componentName
  })
})

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

function toKebab(value) {
  let newValue = value.replace(/([A-Z])/g, '-$1').toLowerCase()
  if (newValue[0] == '-') {
    newValue = newValue.slice(1)
  }
  return newValue.replace(/([A-Z])/g, '-$1').toLowerCase()
}
