import Announcement from './announcement.vue'

Announcement.install = function (Vue) {
  Vue.component(Announcement.name, Announcement)
}

export default Announcement
