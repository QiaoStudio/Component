<template>
  <div class="dp-attachment" @keydown.prevent="onKeydown">
    <div class="dp-attachment__head">{{ headLabel }}</div>
    <div :id="id" tabindex="0"
         ref="dropzoneElement"
         :class="{'dp-attachment--large-preview': singleLargePreview}"
         class="dp-attachment__body dropzone">
    </div>
    <div :id="'template-preview-' + id"
         class="dz-template">
      <div class="dz-preview dz-file-preview">
        <div class="dz-image">
          <img data-dz-thumbnail v-if="!singleLargePreview"/>
        </div>
        <div class="dz-details">
          <div class="dz-size"
               data-dz-size></div>
          <div class="dz-filename">
            <span data-dz-name></span>
          </div>
        </div>
        <div class="dz-progress">
          <span class="dz-upload"
                data-dz-uploadprogress></span>
        </div>
        <div class="dz-success-mark">
          <i class="fa fa-check"
             aria-hidden="true"></i>
          <i class="fa fa-trash"
             aria-hidden="true"
             style="display:none"
             data-dz-remove></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getKey, KEY_VALUES } from 'utilities/event-helper/key-event'
const isServer = Vue.prototype.$isServer
const Dropzone = isServer ? () => {} : require('dropzone')
Dropzone.autoDiscover = false // Disabling autoDiscover, otherwise Dropzone will try to attach twice

export default {
  name: 'dp-attachment',
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    destroyDropzone: {
      type: Boolean,
      default: true,
      required: false
    },
    headLabel: {
      type: String,
      default: 'Attachment',
      required: false
    },
    singleLargePreview: {
      type: Boolean,
      default: false
    },
    errorStatus: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: 'Please upload a file.'
    },
    formatErrorMessage: {
      type: String,
      default: 'Please upload a file in the correct format. ({{filename}})'
    },
    sizeErrorMessage: {
      type: String,
      default: 'File is too big. Max file size is {{maxsize}}. ({{filename}})'
    }
  },
  data() {
    return {
      wasQueueAutoProcess: true,
      isDuplicate: false,
      errorMessageIndex: 1,
      fileNameRegex: /{{filename}}/g,
      maxSizeRegex: /{{maxsize}}/g,
      dictFileTooBig: 'File is too big',
      dictInvalidFileType: 'File format is error',
      isErrorFile: false
    }
  },
  computed: {
    dropzoneSettings() {
      let defaultValues = {
        thumbnailWidth: this.thumbnailWidth,
        thumbnailHeight: this.thumbnailHeight,
        addRemoveLinks: true,
        previewTemplate: document.getElementById('template-preview-' + this.id).innerHTML,
        dictDefaultMessage: this.dictMessage,
        maxFiles: this.maxFiles,
        maxFilesize: 4,
        timeout: 200000,
        acceptedFiles: '',
        dictFileTooBig: this.dictFileTooBig,
        dictInvalidFileType: this.dictInvalidFileType
      }
      Object.keys(this.options).forEach(function(key) {
        defaultValues[key] = this.options[key]
      }, this)
      return defaultValues
    },
    isMobile() {
      return this.$screen.mobile()
    },
    thumbnailHeight() {
      return this.singleLargePreview ? null : 40
    },
    thumbnailWidth() {
      return this.singleLargePreview ? null : 40
    },
    maxFiles() {
      return this.singleLargePreview ? 1 : null
    },
    dictMessage() {
      if (this.isMobile) {
        let fileFormat = this.options.acceptedFiles
        if (fileFormat && fileFormat.indexOf('image/') !== -1) {
          return '<i class="fa fa-camera"></i>Tap to choose or take a picture'
        }
        return this.getMessageWithCloudIcon('Upload a file')
      } else {
        return this.getMessageWithCloudIcon(
          'Drop a file here, or <a>Browse</a>'
        )
      }
    },
    maxFileSizeText() {
      return this.dropzoneSettings.maxFilesize + 'MB'
    }
  },
  methods: {
    onKeydown: function(e) {
      if (getKey(e) === KEY_VALUES.SPACE || getKey(e) === KEY_VALUES.ENTER) {
        this.$refs.dropzoneElement.click()
      }
    },
    getMessageWithCloudIcon: function(message) {
      return '<i class="fa fa-cloud-upload"></i>' + message
    },
    manuallyAddFile: function(file, fileUrl) {
      file.manuallyAdded = true
      this.dropzone.emit('addedfile', file)
      fileUrl && this.dropzone.emit('thumbnail', file, fileUrl)
      var thumbnails = file.previewElement.querySelectorAll(
        '[data-dz-thumbnail]'
      )
      for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].style.width = this.dropzoneSettings.thumbnailWidth + 'px'
        thumbnails[i].style.height =
          this.dropzoneSettings.thumbnailHeight + 'px'
        thumbnails[i].style['object-fit'] = 'contain'
      }
      this.dropzone.emit('complete', file)
      if (this.dropzone.options.maxFiles) this.dropzone.options.maxFiles--
      this.dropzone.files.push(file)
      this.$emit('vdropzone-file-added-manually', file)
    },
    setOption: function(option, value) {
      this.dropzone.options[option] = value
    },
    removeAllFiles: function(bool) {
      this.dropzone.removeAllFiles(bool)
    },
    processQueue: function() {
      let dropzoneEle = this.dropzone
      this.dropzone.processQueue()
      this.dropzone.on('success', function() {
        dropzoneEle.options.autoProcessQueue = true
      })
      this.dropzone.on('queuecomplete', function() {
        dropzoneEle.options.autoProcessQueue = false
      })
    },
    init: function() {
      return this.dropzone.init()
    },
    destroy: function() {
      return this.dropzone.destroy()
    },
    updateTotalUploadProgress: function() {
      return this.dropzone.updateTotalUploadProgress()
    },
    getFallbackForm: function() {
      return this.dropzone.getFallbackForm()
    },
    getExistingFallback: function() {
      return this.dropzone.getExistingFallback()
    },
    setupEventListeners: function() {
      return this.dropzone.setupEventListeners()
    },
    removeEventListeners: function() {
      return this.dropzone.removeEventListeners()
    },
    disable: function() {
      return this.dropzone.disable()
    },
    enable: function() {
      return this.dropzone.enable()
    },
    filesize: function(size) {
      return this.dropzone.filesize(size)
    },
    accept: function(file, done) {
      return this.dropzone.accept(file, done)
    },
    addFile: function(file) {
      return this.dropzone.addFile(file)
    },
    removeFile: function(file) {
      this.dropzone.removeFile(file)
    },
    getAcceptedFiles: function() {
      return this.dropzone.getAcceptedFiles()
    },
    getRejectedFiles: function() {
      return this.dropzone.getRejectedFiles()
    },
    getFilesWithStatus: function() {
      return this.dropzone.getFilesWithStatus()
    },
    getQueuedFiles: function() {
      return this.dropzone.getQueuedFiles()
    },
    getUploadingFiles: function() {
      return this.dropzone.getUploadingFiles()
    },
    getAddedFiles: function() {
      return this.dropzone.getAddedFiles()
    },
    getActiveFiles: function() {
      return this.dropzone.getActiveFiles()
    },
    setLargeThumbnail(file, dataUrl) {
      if (!this.singleLargePreview) return
      let dzMessage = document.querySelector('.dz-default.dz-message')
      dzMessage.classList.add('dz-message-image-thumbnail')
      let thumbnail
      if (file.type.match(/image\/.*/i)) {
        thumbnail = `<img class="dp-attachment__thumbnail--large-preview" alt="${file.name}" data-dz-thumbnail src="${dataUrl}">`
      } else {
        thumbnail = `<div class="dz-file-thumbnail"><img alt="${file.name}" data-dz-thumbnail src="${dataUrl}"></div>`
      }
      dzMessage.innerHTML = thumbnail
    },
    addClass(file) {
      let checkIconList = document.querySelectorAll('.dropzone .fa-check')
      let trashIconList = document.querySelectorAll('.dropzone .fa-trash')
      checkIconList[checkIconList.length - 1].setAttribute(
        `check-${file.upload.uuid.slice(0, 5)}`,
        ''
      )
      trashIconList[trashIconList.length - 1].setAttribute(
        `trash-${file.upload.uuid.slice(0, 5)}`,
        ''
      )
    },
    trashShow(file) {
      let checkIcon = document.querySelector(
        `[check-${file.upload.uuid.slice(0, 5)}]`
      )
      let trashIcon = document.querySelector(
        `[trash-${file.upload.uuid.slice(0, 5)}]`
      )
      if (checkIcon.style.display !== 'none') {
        let timer = setTimeout(() => {
          checkIcon.style.display = 'none'
          trashIcon.style.display = 'inline-block'
          clearTimeout(timer)
        }, 1000)
      }
    },
    addedFile(file, context) {
      let vm = this
      vm.isErrorFile = false
      if (context.files.length >= 2 && this.singleLargePreview) {
        vm.removeFile(context.files[0])
      }
      if (!file.type.match(/image\/.*/i) && !this.singleLargePreview) {
        let previewImg = file.previewElement.querySelector('.dz-image')
        previewImg.classList.add('dz-file')
        previewImg.innerHTML = '<i class="fa fa-file"></i>'
      }
      if (!file.type.match(/image\/.*/i) && this.singleLargePreview) {
        this.dropzone.emit('thumbnail', file, require(`assets/images/file-thumbnail.svg`))
      }

      vm.addClass(file)
      vm.$emit('vdropzone-file-added', file)
    },
    makeErrorMessage(message, file) {
      message = message.replace(this.fileNameRegex, file.name)
      message = message.replace(this.maxSizeRegex, this.maxFileSizeText)
      return message
    },
    setDefaultMessage(file) {
      document.querySelector('.dz-default.dz-message').innerHTML = `<span>${this.dictMessage}</span>`
    },
    insertErrorMessage(file, message, errorMessageId) {
      let container = document.getElementById('error-message-container')
      if (errorMessageId === 'errorMessage' && container.querySelector('#errorMessage')) {
        container.querySelector('#errorMessage').innerText = message
      } else {
        let errorMessageElement = document.createElement('p')
        errorMessageElement.classList.add('dp-attachment__error-message')
        errorMessageElement.innerText = message
        errorMessageElement.id = file ? file.upload.uuid.slice(0, 5) : errorMessageId
        errorMessageElement.title = message
        container.insertBefore(errorMessageElement, container.childNodes[this.errorMessageIndex++])
      }
    },
    insertErrorMessageContainer() {
      // Add Container for error message
      let dropzone = document.querySelector('.dz-message').parentNode
      let errorMessageContainer = document.createElement('div')
      errorMessageContainer.id = 'error-message-container'
      dropzone.insertBefore(errorMessageContainer, dropzone.childNodes[2])
    },
    removeAllErrorMessage() {
      let errorMessage = document.getElementById('error-message-container')
      if (errorMessage) {
        errorMessage.innerHTML = ''
      }
    },
    watchErrorProps(nValue) {
      if (nValue) {
        this.insertErrorMessage(null, this.errorMessage, 'errorMessage')
      } else {
        this.removeAllErrorMessage()
      }
    }
  },
  mounted() {
    if (this.$isServer && this.hasBeenMounted) return
    this.hasBeenMounted = true
    this.dropzone = new Dropzone(
      this.$refs.dropzoneElement,
      this.dropzoneSettings
    )
    let vm = this

    vm.insertErrorMessageContainer()
    if (this.errorStatus) {
      this.insertErrorMessage(null, this.errorMessage, 'errorMessage')
    }

    this.dropzone.on('thumbnail', function(file, dataUrl) {
      if (!vm.isErrorFile) vm.setLargeThumbnail(file, dataUrl)
      vm.$emit('vdropzone-thumbnail', file, dataUrl)
    })
    this.dropzone.on('addedfile', function(file) {
      // Use default file icon when file is not an image
      vm.addedFile(file, this)
    })
    this.dropzone.on('addedfiles', function(files) {
      vm.$emit('vdropzone-files-added', files)
    })
    this.dropzone.on('removedfile', function(file) {
      vm.$emit('vdropzone-removed-file', file)
      let dzMessage = document.querySelector('.dz-default.dz-message')
      dzMessage.classList.remove('dz-message-image-thumbnail')
      vm.setDefaultMessage(file)
      if (file.manuallyAdded) vm.dropzone.options.maxFiles++
    })
    this.dropzone.on('success', function(file, response) {
      vm.trashShow(file)
      vm.$emit('vdropzone-success', file, response)
    })
    this.dropzone.on('successmultiple', function(file, response) {
      vm.$emit('vdropzone-success-multiple', file, response)
    })
    this.dropzone.on('error', function(file, message, xhr) {
      if (file.status === 'canceled') return
      vm.isErrorFile = true
      // Insert error message to DOM
      if (message === vm.dictInvalidFileType) {
        vm.insertErrorMessage(file, vm.makeErrorMessage(vm.formatErrorMessage, file))
      } else if (message === vm.dictFileTooBig) {
        vm.insertErrorMessage(file, vm.makeErrorMessage(vm.sizeErrorMessage, file))
      } else {
        vm.insertErrorMessage(file, message)
      }

      vm.removeFile(file)
      vm.$emit('vdropzone-error', file, message, xhr)
    })
    this.dropzone.on('errormultiple', function(files, message, xhr) {
      vm.$emit('vdropzone-error-multiple', files, message, xhr)
    })
    this.dropzone.on('sending', function(file, xhr, formData) {
      vm.removeAllErrorMessage()
      vm.$emit('vdropzone-sending', file, xhr, formData)
    })
    this.dropzone.on('sendingmultiple', function(file, xhr, formData) {
      vm.$emit('vdropzone-sending-multiple', file, xhr, formData)
    })
    this.dropzone.on('complete', function(file) {
      vm.$emit('vdropzone-complete', file)
    })
    this.dropzone.on('completemultiple', function(files) {
      vm.$emit('vdropzone-complete-multiple', files)
    })
    this.dropzone.on('canceled', function(file) {
      vm.$emit('vdropzone-canceled', file)
    })
    this.dropzone.on('canceledmultiple', function(files) {
      vm.$emit('vdropzone-canceled-multiple', files)
    })
    this.dropzone.on('maxfilesreached', function(files) {
      vm.$emit('vdropzone-max-files-reached', files)
    })
    this.dropzone.on('processing', function(file) {
      vm.$emit('vdropzone-processing', file)
    })
    this.dropzone.on('processingmultiple', function(files) {
      vm.$emit('vdropzone-processing-multiple', files)
    })
    this.dropzone.on('uploadprogress', function(file, progress, bytesSent) {
      vm.$emit('vdropzone-upload-progress', file, progress, bytesSent)
    })
    this.dropzone.on('totaluploadprogress', function(
      totaluploadprogress,
      totalBytes,
      totalBytesSent
    ) {
      vm.$emit(
        'vdropzone-total-upload-progress',
        totaluploadprogress,
        totalBytes,
        totalBytesSent
      )
    })
    this.dropzone.on('reset', function() {
      vm.$emit('vdropzone-reset')
    })
    this.dropzone.on('queuecomplete', function() {
      vm.$emit('vdropzone-queue-complete')
    })
    this.dropzone.on('drop', function(event) {
      vm.$emit('vdropzone-drop', event)
    })
    this.dropzone.on('dragstart', function(event) {
      vm.$emit('vdropzone-drag-start', event)
    })
    this.dropzone.on('dragend', function(event) {
      vm.$emit('vdropzone-drag-end', event)
    })
    this.dropzone.on('dragenter', function(event) {
      vm.$emit('vdropzone-drag-enter', event)
    })
    this.dropzone.on('dragover', function(event) {
      vm.$emit('vdropzone-drag-over', event)
    })
    this.dropzone.on('dragleave', function(event) {
      vm.$emit('vdropzone-drag-leave', event)
    })

    vm.$emit('vdropzone-mounted')
  },
  beforeDestroy() {
    if (this.destroyDropzone) this.dropzone.destroy()
  },
  watch: {
    errorStatus(nValue) {
      this.watchErrorProps(nValue)
    },
    errorMessage(nValue) {
      this.watchErrorProps(nValue)
    }
  }
}
</script>
<style lang="scss">
@import '~assets/css/elements/attachment';
</style>
