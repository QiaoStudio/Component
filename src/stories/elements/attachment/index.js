import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComAttachmentReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Attachment from './attachment'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComAttachmentReadme))
  .addDecorator(withKnobs)
  .add('Attachment', () => {
    return Attachment
  })

// storiesOf('Attachment', module)
//   .addDecorator(withDocs(ComAttachmentReadme))
//   .addDecorator(withKnobs)
//   .add('With Events', () => {
//     return {
//       data () {
//         return {
//           dropzoneOptions: {
//             url: testPost,
//             thumbnailWidth: 150,
//             maxFilesize: 0.5,
//             addRemoveLinks: true,
//             dictDefaultMessage: '<i class="fa fa-cloud-upload"></i> EVENTS',
//             accept(file, done) {
//               console.log(file)
//               done()
//             }
//           },
//           fileAdded: false,
//           filesAdded: false,
//           success: false,
//           error: false,
//           removedFile: false,
//           sending: false,
//           successMultiple: false,
//           sendingMultiple: false,
//           queueComplete: false,
//           uploadProgress: false,
//           progress: false,
//           myProgress: 0,
//           isMounted: false,
//           dDrop: false,
//           dStarted: false,
//           dEnded: false,
//           dEntered: false,
//           dOver: false,
//           dLeave: false
//         }
//       },
//       methods: {
//         vfileAdded(file) {
//           this.fileAdded = true
//         },
//         vfilesAdded(file) {
//           this.filesAdded = true
//         },
//         vsuccess(file, response) {
//           this.success = true
//         },
//         verror(file) {
//           this.error = true
//         },
//         vremoved(file, xhr, error) {
//           this.removedFile = true
//         },
//         vsending(file, xhr, formData) {
//           this.sending = true
//         },
//         vsuccessMuliple(files, response) {
//           this.successMultiple = true
//         },
//         vsendingMuliple(file, xhr, formData) {
//           this.sendingMultiple = true
//         },
//         vqueueComplete(file, xhr, formData) {
//           this.queueComplete = true
//         },
//         vprogress(totalProgress, totalBytes, totalBytesSent) {
//           this.progress = true
//           this.myProgress = Math.floor(totalProgress)
//         },
//         vmounted() {
//           this.isMounted = true
//         },
//         vddrop() {
//           this.dDrop = true
//         },
//         vdstart() {
//           this.dStarted = true
//         },
//         vdend() {
//           this.dEnded = true
//         },
//         vdenter() {
//           this.dEntered = true
//         },
//         vdover() {
//           this.dOver = true
//         },
//         vdleave() {
//           this.dLeave = true
//         }
//       },
//       watch: {
//         fileAdded() {
//           let that = this
//           setTimeout(function() {
//             that.fileAdded = false
//           }, 2000)
//         },
//         filesAdded() {
//           let that = this
//           setTimeout(function() {
//             that.filesAdded = false
//           }, 2000)
//         },
//         success() {
//           let that = this
//           setTimeout(function() {
//             that.success = false
//           }, 2000)
//         },
//         error() {
//           let that = this
//           setTimeout(function() {
//             that.error = false
//           }, 2000)
//         },
//         removedFile() {
//           let that = this
//           setTimeout(function() {
//             that.removedFile = false
//           }, 2000)
//         },
//         sending() {
//           let that = this
//           setTimeout(function() {
//             that.sending = false
//           }, 2000)
//         },
//         successMultiple() {
//           let that = this
//           setTimeout(function() {
//             that.successMultiple = false
//           }, 2000)
//         },
//         sendingMultiple() {
//           let that = this
//           setTimeout(function() {
//             that.sendingMultiple = false
//           }, 2000)
//         },
//         queueComplete() {
//           let that = this
//           setTimeout(function() {
//             that.queueComplete = false
//           }, 2000)
//         },
//         progress() {
//           let that = this
//           setTimeout(function() {
//             that.progress = false
//           }, 2000)
//         },
//         isMounted() {
//           let that = this
//           setTimeout(function() {
//             that.isMounted = false
//           }, 2000)
//         },
//         dDrop() {
//           let that = this
//           setTimeout(function() {
//             that.dDrop = false
//           }, 2000)
//         },
//         dStarted() {
//           let that = this
//           setTimeout(function() {
//             that.dStarted = false
//           }, 2000)
//         },
//         dEnded() {
//           let that = this
//           setTimeout(function() {
//             that.dEnded = false
//           }, 2000)
//         },
//         dEntered() {
//           let that = this
//           setTimeout(function() {
//             that.dEntered = false
//           }, 2000)
//         },
//         dOver() {
//           let that = this
//           setTimeout(function() {
//             that.dOver = false
//           }, 2000)
//         },
//         dLeave() {
//           let that = this
//           setTimeout(function() {
//             that.dLeave = false
//           }, 2000)
//         }
//       },
//       template: `<div>
//                  <gb-com-attachment id="dropzone_drag_drop"
//                                        ref="gbAttachmentDragDrop"
//                                        :options="dropzoneOptions"
//                                        @vdropzone-file-added="vfileAdded"
//                                        @vdropzone-success="vsuccess"
//                                        @vdropzone-error="verror"
//                                        @vdropzone-removed-file="vremoved"
//                                        @vdropzone-sending="vsending"
//                                        @vdropzone-success-multiple="vsuccessMuliple"
//                                        @vdropzone-sending-multiple="vsendingMuliple"
//                                        @vdropzone-queue-complete="vqueueComplete"
//                                        @vdropzone-total-upload-progress="vprogress"
//                                        @vdropzone-mounted="vmounted"
//                                        @vdropzone-drop="vddrop"
//                                        @vdropzone-drag-start="vdstart"
//                                        @vdropzone-drag-end="vdend"
//                                        @vdropzone-drag-enter="vdenter"
//                                        @vdropzone-drag-over="vdover"
//                                        @vdropzone-drag-leave="vdleave">
//                  </gb-com-attachment>
//                  <div v-if="error">Error!</div>
//                 </div>`
//     }
//   })
