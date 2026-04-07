import { reactive } from 'vue'

// Store modal state and props
export const modalState = reactive({
  visible: false,
  modalType: '', // New property to determine the modal type
  modalTitle: '',
  propsData: {} // Store dynamic props for each modal
})

// Open a specific modal based on modalType and props
export function openModal(modalType, props = {}) {
  modalState.modalType = modalType
  modalState.propsData = props
  modalState.visible = true
}
export function openModalFromModal(modalType, props = {}) {
  modalState.modalType = ''
  modalState.propsData = {}
  modalState.visible = false
  setTimeout(() => {
    modalState.modalType = modalType
    modalState.propsData = props
    modalState.visible = true
  }, 100)
}

// Close the modal
export function closeModal() {
  modalState.visible = false
  modalState.modalType = ''
  modalState.propsData = {}
}
