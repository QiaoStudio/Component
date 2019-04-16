import Message from './message.vue'

Message.install = function (Vue) {
  Vue.component(Message.name, Message)
}

export default Message
