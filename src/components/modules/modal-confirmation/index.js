import ModalConfirm from './modal-confirmation.vue'

ModalConfirm.install = function (Vue) {
  Vue.component(ModalConfirm.name, ModalConfirm)
}

export default ModalConfirm
