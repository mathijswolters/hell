import { reactive } from 'vue'

export const chat_position = reactive({
  position: 'right'
})
export const chat_opened = reactive({
  opened: true
})

export function open_chat() {
  chat_opened.opened = !chat_opened.opened
}
export function chatPosition(pos) {
  chat_position.position = pos
}
export function chat_toggle(state) {
  chat_opened.opened = state
}
