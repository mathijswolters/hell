import { createApp } from 'vue'
import KillFeed from './components/KillFeed.vue'

export default {
  install(app) {
    const killFeedApp = createApp(KillFeed)
    const killFeedInstance = killFeedApp.mount(document.createElement('div'))

    document.body.appendChild(killFeedInstance.$el)

    app.config.globalProperties.killFeed = {
      add(type, data) {
        killFeedInstance.addKillFeed(type, data)
      }
    }
  }
}
