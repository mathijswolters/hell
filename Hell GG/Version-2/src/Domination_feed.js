import { createApp } from 'vue'
import Domination_feed from './components/Domination_Feed.vue'

export default {
  install(app) {
    const Domination_feed_app = createApp(Domination_feed)
    const Domination_feed_instance = Domination_feed_app.mount(document.createElement('div'))

    document.body.appendChild(Domination_feed_instance.$el)

    app.config.globalProperties.Domination_feed = {
      add(type, data) {
        Domination_feed_instance.addDominationFeed(type, data)
      }
    }
  }
}
