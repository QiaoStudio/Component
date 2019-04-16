import Modal from './modal.vue'

Modal.install = function (Vue) {
  Vue.component(Modal.name, Modal)
}

export default Modal
