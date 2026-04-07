import { createApp } from 'vue'
import Toaster from './components/Toaster.vue'

export default {
  install(app) {
    const toasterApp = createApp(Toaster)
    const toasterInstance = toasterApp.mount(document.createElement('div'))

    document.body.appendChild(toasterInstance.$el)

    // Add toaster methods
    app.config.globalProperties.toaster = {
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
  }
}
