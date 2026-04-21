import { createApp } from 'vue'
import Toaster from './components/Toaster.vue'

export default {
  install(app) {
    const toasterApp = createApp(Toaster)
    const toasterInstance = toasterApp.mount(document.createElement('div'))

    document.body.appendChild(toasterInstance.$el)

    // Add toaster methods (`toaster` and `$toaster` — many components use `$toaster` from habit)
    const api = {
      success(message, options) {
        toasterInstance.addToast('success', message, options)
      },
      error(message, options) {
        toasterInstance.addToast('error', message, options)
      },
      warn(message, options) {
        toasterInstance.addToast('warning', message, options)
      }
    }
    app.config.globalProperties.toaster = api
    app.config.globalProperties.$toaster = api
  }
}
