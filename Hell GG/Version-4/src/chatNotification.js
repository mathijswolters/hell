import { createApp } from 'vue'
import chatNotification from './components/chatNotification.vue'

export default {
  install(app) {
    const chatNotificationApp = createApp(chatNotification)
    const chatNotificationInstance = chatNotificationApp.mount(document.createElement('div'))

    document.body.appendChild(chatNotificationInstance.$el)

    app.config.globalProperties.chatNotification = {
      add(type, data) {
        chatNotificationInstance.addchatNotification(type, data)
      }
    }
  }
}
