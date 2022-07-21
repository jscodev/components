import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

const componentsContext = require.context('../packages', true, /\.vue$/)
const components = {}

componentsContext.keys().forEach((key) => {
  const component = componentsContext(key).default
  if (!component.name) {
    component.name = key.match(/(?<=\/)[A-Za-z].+(?=\/)/g)[0]
  }
  components[component.name] = component
})

export const install = function (Vue) {
  Vue.use(ViewUI)
  for (let key in components) {
    Vue.component(components[key].name, components[key])
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
