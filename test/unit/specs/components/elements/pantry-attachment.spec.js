import { shallowMount } from 'dp-test'
import ComAttachment from 'elements/attachment/src/attachment.vue'
import { KEY_VALUES } from 'utilities/event-helper/key-event'
import sinon from 'sinon'
import _ from 'lodash'
import Dropzone from 'dropzone'

describe('elements/Attachment', () => {
  let wrapper
  let sanbox

  const testPost = 'https://httpbin.org/post'

  let appendTemplate = `
    <div class="dz-preview dz-processing dz-image-preview dz-success dz-complete">
      <div class="dz-image"><img data-dz-thumbnail="" alt="TIM截图20180926110750.png" src=""></div>
      <div class="dz-details">
        <div data-dz-size="" class="dz-size"><strong>5.8</strong> KB</div>
        <div class="dz-filename"><span data-dz-name="">TIM截图20180926110750.png</span></div>
      </div>
      <div class="dz-progress"><span data-dz-uploadprogress="" class="dz-upload" style="width: 100%;"></span></div>
      <div class="dz-success-mark"><i aria-hidden="true" class="fa fa-check"></i>
        <i aria-hidden="true" data-dz-remove="" class="fa fa-trash" style="display:none;"></i></div>
      <div class="dz-error-mark"><i aria-hidden="true" class="fa fa-times"></i></div>
      <div class="dz-error-message"><span data-dz-errormessage=""></span></div><a class="dz-remove" href="javascript:undefined;"
        data-dz-remove="">Remove file</a>
    </div>`

  let dictFileTooBig = 'File is too big'
  let dictInvalidFileType = 'File format is error'

  let errorMessageElement = document.createElement('div')
  errorMessageElement.classList.add(['dz-preview', 'dz-file-preview', 'dz-error', 'dz-complete'])
  let subElement = document.createElement('p')
  subElement.classList.add('dz-remove')
  errorMessageElement.appendChild(subElement)

  function createWrapper(options) {
    return shallowMount(ComAttachment, _.merge({
      propsData: {
        id: 'dropzone_test',
        options: {
          url: testPost
        }
      },
      computed: {
        dropzoneSettings() {
          let defaultValues = {
            thumbnailWidth: 40,
            thumbnailHeight: 40,
            addRemoveLinks: true,
            previewTemplate: `
            <div class="dz-preview dz-file-preview">
              <div class="dz-image">
                <img data-dz-thumbnail />
              </div>
              <div class="dz-details">
                <div class="dz-size" data-dz-size></div>
                <div class="dz-filename"><span data-dz-name></span></div>
              </div>
              <div class="dz-progress">
                <span class="dz-upload" data-dz-uploadprogress></span>
              </div>
              <div class="dz-success-mark">
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-trash" aria-hidden="true" style="display:none" data-dz-remove></i>
              </div>
              <div class="dz-error-mark">
                <i class="fa fa-times" aria-hidden="true"></i>
              </div>
              <div class="dz-error-message">
                <span data-dz-errormessage></span>
              </div>
            </div>
            `,
            dictDefaultMessage: this.dictMessage
          }
          Object.keys(this.options).forEach(function(key) {
            defaultValues[key] = this.options[key]
          }, this)
          return defaultValues
        }
      },
      attachToDocument: true
    }, options || {}))
  }

  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
    document.querySelector('.dropzone').innerHTML += appendTemplate
  })

  afterEach(() => {
    document.querySelector('.dropzone').innerHTML = ''
    wrapper.destroy()
    sanbox.restore()
  })

  it('when id is passed, .dropzone should have passed id', () => {
    expect(wrapper.vm.$el.querySelector('.dropzone').id).toBe('dropzone_test')
  })

  it('when init, dropzone should be initialized by Dropzone', () => {
    expect(wrapper.vm.dropzone instanceof Dropzone).toBe(true)
  })

  it('after init, dropzone should has tabindex = 0', () => {
    expect(wrapper.vm.$el.querySelector('.dropzone').getAttribute('tabindex')).toBe('0')
  })

  it('when default message is set then label should be correct', () => {
    expect(wrapper.find('.dz-message.dz-default span').html()).toBe('<span><i class="fa fa-cloud-upload"></i>Drop a file here, or <a>Browse</a></span>')
  })

  it('when file was uploaded, fa-check & fa-drush should contain right attribute and emit vdropzone-file-added', () => {
    let file = {
      upload: {
        uuid: 'a123444'
      },
      type: 'image/png'
    }
    let context = {
      files: {
        length: 1
      }
    }
    expect(wrapper.find('[trash-a1234]').exists()).toBe(false)
    expect(wrapper.find('[check-a1234]').exists()).toBe(false)
    wrapper.vm.addedFile(file, context)
    expect(wrapper.find('[trash-a1234]').exists()).toBe(true)
    expect(wrapper.find('[check-a1234]').exists()).toBe(true)
    expect(wrapper.emitted('vdropzone-file-added')[0][0]).toEqual(file)
  })

  it('when file type is not image ,class dz-file should be found in DOM', () => {
    let element = document.createElement('div')
    element.classList.add('customElement')
    let subElement = document.createElement('span')
    subElement.classList.add('dz-image')
    element.appendChild(subElement)
    document.querySelector('#dropzone_test').appendChild(element)
    let file = {
      upload: {
        uuid: 'a123444'
      },
      type: 'file/txt',
      previewElement: element
    }
    let context = {
      files: {
        length: 1
      }
    }
    wrapper.vm.addedFile(file, context)
    expect(wrapper.find('.customElement .dz-file').exists()).toBe(true)
    expect(wrapper.find('.customElement .dz-file').html()).toContain('<i class="fa fa-file"></i>')
  })

  // it('when file type is image , and file name was duplicated, removeFile should be called and emit duplicate-file', () => {
  //   let file = {
  //     upload: {
  //       uuid: 'a123444'
  //     },
  //     type: 'image/png',
  //     name: 'testtest'
  //   }
  //   let context = {
  //     files: [
  //       {name: 'testtest'},
  //       {name: 'test1'}
  //     ]
  //   }
  //   let mockFn = sanbox.stub()
  //   wrapper.vm.removeFile = mockFn
  //   wrapper.vm.duplicateCheck = true
  //   wrapper.vm.addFile(file, context)
  //   expect(mockFn.called).toBe(true)
  //   expect(wrapper.emitted('duplicate-file')[0][0]).toEqual(file)
  // })

  it('when upload was finish , trush be shown after 1s ', () => {
    let clock = sanbox.useFakeTimers()
    let file = {
      upload: {
        uuid: 'a123444'
      },
      type: 'image/png',
      name: 'testtest'
    }
    wrapper.vm.addClass(file)
    wrapper.vm.trashShow(file)
    expect(wrapper.find('[trash-a1234]').isVisible()).toBe(false)
    expect(wrapper.find('[check-a1234]').isVisible()).toBe(true)
    clock.tick(1000)
    expect(wrapper.find('[trash-a1234]').isVisible()).toBe(true)
    expect(wrapper.find('[check-a1234]').isVisible()).toBe(false)
  })

  it('when remove file , should emit a vdropzone-remove', () => {
    let file = {
      upload: {
        uuid: 'a123444'
      },
      type: 'image/png',
      name: 'testtest'
    }
    wrapper.vm.removeFile(file)
    expect(wrapper.emitted('vdropzone-removed-file')[0][0]).toEqual(file)
  })

  it('When user set headLabel, headLabel should display as setting', () => {
    wrapper = createWrapper({
      propsData: {
        headLabel: 'testHeadLabel'
      }
    })
    expect(wrapper.find('.dp-attachment__head').text()).toBe('testHeadLabel')
  })

  it.each([['space', KEY_VALUES.SPACE], ['enter', KEY_VALUES.ENTER]])('should open new window when user press %s', (name, keyValue) => {
    wrapper = createWrapper()
    let spy = sanbox.spy(wrapper.vm.$refs.dropzoneElement, 'click')
    wrapper.trigger('keydown', {
      key: keyValue
    })
    expect(spy.called).toBe(true)
  })

  it('When user set headLabel, headLabel should display as default', () => {
    expect(wrapper.find('.dp-attachment__head').text()).toBe('Attachment')
  })

  it('When user use mobile device, attachment should show mobile style', () => {
    wrapper = createWrapper({
      computed: {
        isMobile() {
          return true
        }
      }
    })
    expect(wrapper.find('.dz-message.dz-default span').html()).toBe('<span><i class="fa fa-cloud-upload"></i>Upload a file</span>')
  })

  it('When user use mobile device and set the format of the files is image, attachment should show imange only style', () => {
    wrapper = createWrapper({
      propsData: {
        options: {
          acceptedFiles: 'image/*'
        }
      },
      computed: {
        isMobile() {
          return true
        }
      }
    })
    expect(wrapper.find('.dz-message.dz-default span').html()).toBe('<span><i class="fa fa-camera"></i>Tap to choose or take a picture</span>')
  })

  it('when singleLargePreview is true , class dp-attachment--large-preivew should be found, and img in dz-image should not be found', () => {
    wrapper = createWrapper({
      propsData: {
        singleLargePreview: true
      }
    })
    expect(wrapper.find('.dp-attachment__body.dp-attachment--large-preview').exists()).toBe(true)
    expect(wrapper.find('.dz-template .dz-image img').exists()).toBe(false)
  })

  it('when singleLargePreview is false , class dp-attachment--large-preivew should not be found, and img in dz-image should be found', () => {
    wrapper = createWrapper({
      propsData: {
        singleLargePreview: false
      }
    })
    expect(wrapper.find('.dp-attachment__body.dp-attachment--large-preview').exists()).toBe(false)
    expect(wrapper.find('.dz-template .dz-image img').exists()).toBe(true)
  })

  it('when singleLargePreview is true,call thumbnail img dp-attachment__thubmnail--large-preview should be found in dz-message', () => {
    wrapper = createWrapper({
      propsData: {
        singleLargePreview: true
      }
    })
    let file = {
      name: 'testfile',
      type: 'image/png'
    }
    let dataUrl = 'testtest'
    wrapper.vm.setLargeThumbnail(file, dataUrl)
    setTimeout(() => {
      expect(document.querySelector('.dz-default.dz-message').innerHTML).toEqual(`<img class="dp-attachment__thumbnail--large-preview" alt="testfile" data-dz-thumbnail="" src="testtest">`)
    }, 100)
  })

  it('when singleLargePreview is true and user select a no-image file, file thumbnail should be found in dz-message', () => {
    wrapper = createWrapper({
      propsData: {
        singleLargePreview: true
      }
    })
    let file = {
      name: 'testfile',
      type: 'application/pdf',
      upload: {
        uuid: 'cd5sdkfjsed'
      }
    }
    let context = {
      files: {
        length: 1
      }
    }
    wrapper.vm.addedFile(file, context)
    expect(document.querySelector('.dz-default.dz-message').innerHTML).toEqual(`<div class="dz-file-thumbnail"><img alt="testfile" data-dz-thumbnail="" src="file-thumbnail.svg"></div>`)
  })

  it('when singleLargePreview is true,and file was removed, default message should be right', () => {
    wrapper = createWrapper({
      propsData: {
        singleLargePreview: true
      },
      computed: {
        dictMessage: () => 'directMessage'
      }
    })
    let file = {
      name: 'testfile',
      type: 'image/png',
      upload: {
        uuid: 'cd5d730d'
      }
    }
    wrapper.vm.dropzone.emit('removedfile', file)
    expect(document.querySelector('.dz-default.dz-message').innerHTML).toEqual(`<span>directMessage</span>`)
  })

  it('when singleLargePreivew is true, thumnnail parameter should be set right', () => {
    wrapper = createWrapper({
      propsData: {
        singleLargePreview: true
      }
    })
    expect(wrapper.vm.thumbnailHeight).toBe(null)
    expect(wrapper.vm.thumbnailWidth).toBe(null)
    expect(wrapper.vm.maxFiles).toBe(1)
  })

  it('when singleLargePreivew is false, thumnnail parameter should be set right', () => {
    expect(wrapper.vm.thumbnailHeight).toBe(40)
    expect(wrapper.vm.thumbnailWidth).toBe(40)
    expect(wrapper.vm.maxFiles).toBe(null)
  })

  it('when singleLargePreview is true, uploading more than one file , removeFile should be called', () => {
    wrapper = createWrapper({
      propsData: {
        singleLargePreview: true
      }
    })
    let file = {
      upload: {
        uuid: 'a123444'
      },
      type: 'image/png',
      name: 'testtest'
    }
    let context = {
      files: {
        length: 2
      }
    }
    let removeFile = sanbox.stub()
    wrapper.vm.dropzone.removeFile = removeFile
    wrapper.vm.addedFile(file, context)
    expect(removeFile.called).toBe(true)
  })

  it('When user select a error format file, error message should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        id: 'dropzone_test',
        options: {
          acceptedFiles: 'image/png',
          url: testPost
        }
      }
    })

    let file = {
      upload: {
        uuid: 'adkfd4'
      },
      type: 'image/jpeg',
      name: 'testtest.jpg',
      previewElement: errorMessageElement
    }

    wrapper.vm.dropzone.emit('error', file, dictInvalidFileType)
    expect(document.querySelector('#adkfd').innerText).toBe('Please upload a file in the correct format. (testtest.jpg)')
  })

  it('When user select a too big file, error message should be shown', () => {
    wrapper = createWrapper({
      propsData: {
        options: {
          acceptedFiles: '',
          url: testPost,
          maxFilesize: 4
        }
      }
    })

    let fileName = 'testtest.png'

    let errorFile = {
      upload: {
        uuid: 'agopp44'
      },
      type: 'image/png',
      name: fileName,
      previewElement: errorMessageElement,
      size: 32112120
    }

    wrapper.vm.dropzone.emit('error', errorFile, dictFileTooBig)
    expect(document.querySelector('#agopp').innerText).toBe(`File is too big. Max file size is 4MB. (${fileName})`)
  })

  it('When user set formatErrorMessage, error message should be shown as setting', () => {
    wrapper = createWrapper({
      propsData: {
        id: 'dropzone_test',
        options: {
          acceptedFiles: 'image/png',
          url: testPost
        },
        formatErrorMessage: 'Format Error Message {{filename}}'
      }
    })

    let file = {
      upload: {
        uuid: 'erkfd4'
      },
      type: 'image/jpeg',
      name: 'testtest.jpg',
      previewElement: errorMessageElement
    }

    wrapper.vm.dropzone.emit('error', file, dictInvalidFileType)
    expect(document.querySelector('#erkfd').innerText).toBe('Format Error Message testtest.jpg')
  })

  it('When user set sizeErrorMessage, error message should be shown as setting', () => {
    wrapper = createWrapper({
      propsData: {
        options: {
          acceptedFiles: '',
          url: testPost,
          maxFilesize: 4
        },
        sizeErrorMessage: 'Format Error Message {{filename}} {{maxsize}}'
      }
    })

    let fileName = 'testtest.png'

    let errorFile = {
      upload: {
        uuid: 'awepp44'
      },
      type: 'image/png',
      name: fileName,
      previewElement: errorMessageElement,
      size: 32112120
    }

    wrapper.vm.dropzone.emit('error', errorFile, dictFileTooBig)
    expect(document.querySelector('#awepp').innerText).toBe(`Format Error Message testtest.png 4MB`)
  })

  it('When error message is shown, then user select a right file, error message should be hidden', () => {
    wrapper = createWrapper({
      propsData: {
        options: {
          acceptedFiles: '',
          url: testPost,
          maxFilesize: 4
        }
      }
    })

    let fileName = 'testtest.png'

    let errorFile = {
      upload: {
        uuid: 'agopp44'
      },
      type: 'image/png',
      name: fileName,
      previewElement: errorMessageElement,
      size: 32112120
    }

    let rightFile = {
      upload: {
        uuid: 'agopp45'
      },
      type: 'image/png',
      name: fileName,
      previewElement: errorMessageElement,
      size: 32
    }

    wrapper.vm.dropzone.emit('error', errorFile, dictFileTooBig)
    expect(document.querySelector('#agopp').innerText).toBe(`File is too big. Max file size is 4MB. (${fileName})`)
    wrapper.vm.dropzone.emit('sending', rightFile)
    expect(document.querySelector('#error-message-container').innerHTML).toBe('')
  })

  it('When user right file, error message should not be shown', () => {
    wrapper = createWrapper({
      propsData: {
        options: {
          acceptedFiles: '',
          url: testPost,
          maxFilesize: 4
        }
      }
    })

    let fileName = 'testtest.png'

    let file = {
      upload: {
        uuid: 'agipp44'
      },
      type: 'image/png',
      name: fileName,
      previewElement: errorMessageElement,
      size: 3211
    }

    wrapper.vm.dropzone.emit('addedfile', file)
    expect(document.querySelector('#agipp')).toBeNull()
  })

  it('When errorStatus is true, error message should be shown by default', () => {
    wrapper = createWrapper({
      propsData: {
        errorStatus: false
      }
    })
    expect(document.querySelector('#errorMessage')).toBeNull()
    wrapper.setProps({
      errorStatus: true
    })
    expect(document.querySelector('#errorMessage').innerText).toBe('Please upload a file.')
  })

  it('When errorStatus is true, error message should be shown by setting', () => {
    wrapper = createWrapper({
      propsData: {
        errorStatus: true,
        errorMessage: 'Error Message'
      }
    })
    expect(document.querySelector('#errorMessage').innerText).toBe('Error Message')
    wrapper.setProps({
      errorMessage: 'Error Message!!'
    })
    expect(document.querySelector('#errorMessage').innerText).toBe('Error Message!!')
  })

  it('When errorStatus is false, error message should be hidden', () => {
    wrapper = createWrapper({
      propsData: {
        errorStatus: true,
        errorMessage: 'error1'
      }
    })

    expect(document.querySelector('#errorMessage').innerText).toBe('error1')

    wrapper.setProps({
      errorStatus: false
    })

    expect(document.querySelector('#errorMessage')).toBeNull()
  })
})

describe('elements/emit event', () => {
  let wrapper
  let sanbox
  let file = {
    name: 'test.text',
    type: 'text/plain',
    upload: {
      uuid: 'a123444'
    }
  }

  const testPost = 'https://httpbin.org/post'

  function createWrapper(options) {
    return shallowMount(ComAttachment, _.merge({
      propsData: {
        id: 'dropzone_test',
        options: {
          url: testPost,
          dictDefaultMessage: 'Upload'
        }
      },
      computed: {
        dropzoneSettings() {
          return {
            thumbnailWidth: 40,
            thumbnailHeight: 40,
            addRemoveLinks: true,
            previewTemplate: `
            <div class="dz-preview dz-file-preview">
              <div class="dz-image">
                <img data-dz-thumbnail />
              </div>
              <div class="dz-details">
                <div class="dz-size" data-dz-size></div>
                <div class="dz-filename"><span data-dz-name></span></div>
              </div>
              <div class="dz-progress">
                <span class="dz-upload" data-dz-uploadprogress></span>
              </div>
              <div class="dz-success-mark">
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-trash" aria-hidden="true" style="display:none" data-dz-remove></i>
              </div>
              <div class="dz-error-mark">
                <i class="fa fa-times" aria-hidden="true"></i>
              </div>
              <div class="dz-error-message">
                <span data-dz-errormessage></span>
              </div>
            </div>
            `,
            url: testPost,
            dictDefaultMessage: 'Upload'
          }
        }
      },
      attachToDocument: true
    }, options || {}))
  }
  beforeEach(() => {
    sanbox = sinon.createSandbox()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('addedfile when file type is text/plain', () => {
    let file = {
      upload: {
        uuid: 'a123444'
      },
      type: 'text/plain'
    }
    wrapper.vm.addFile(file)
    setTimeout(() => {
      let previewImg = wrapper.find('.dz-image')
      expect(previewImg.classes()).toContain('dz-file')
      expect(previewImg.html()).toBe('<i class="fa fa-file"></i>')
    })
  })

  // it('duplicateCheck is true, when user upload same name file, duplicate-file should be emit', () => {
  //   let fileA = {
  //     name: 'test.text',
  //     type: 'text/plain'
  //   }
  //   let fileB = {
  //     name: 'test.text',
  //     type: 'text/plain'
  //   }
  //   wrapper = createWrapper({
  //     propsData: {
  //       duplicateCheck: true
  //     }
  //   })
  //   wrapper.vm.addFile(fileA)
  //   wrapper.vm.addFile(fileB)
  //   expect(wrapper.emitted('duplicate-file')).toBeTruthy()
  //   expect(wrapper.emitted('duplicate-file')[0][0].name).toBe('test.text')
  // })

  it('thumbnail', () => {
    wrapper.vm.dropzone.emit('thumbnail', file)
    expect(wrapper.emitted('vdropzone-thumbnail')).toBeTruthy()
  })

  it('addedfiles', () => {
    wrapper.vm.dropzone.emit('addedfiles', file)
    expect(wrapper.emitted('vdropzone-files-added')).toBeTruthy()
  })

  it('removedfile', () => {
    wrapper.vm.dropzone.emit('removedfile', file)
    expect(wrapper.emitted('vdropzone-removed-file')).toBeTruthy()
  })

  // it('success', () => {
  //   wrapper.vm.dropzone.emit('success', file)
  //   expect(wrapper.emitted('vdropzone-success')).toBeTruthy()
  // })

  it('successmultiple', () => {
    wrapper.vm.dropzone.emit('successmultiple', file)
    expect(wrapper.emitted('vdropzone-success-multiple')).toBeTruthy()
  })

  it('error', () => {
    wrapper.vm.dropzone.emit('error', file)
    expect(wrapper.emitted('vdropzone-error')).toBeTruthy()
  })

  it('errormultiple', () => {
    wrapper.vm.dropzone.emit('errormultiple', file)
    expect(wrapper.emitted('vdropzone-error-multiple')).toBeTruthy()
  })

  it('sending', () => {
    wrapper.vm.dropzone.emit('sending', file)
    expect(wrapper.emitted('vdropzone-sending')).toBeTruthy()
  })

  it('sendingmultiple', () => {
    wrapper.vm.dropzone.emit('sendingmultiple', file)
    expect(wrapper.emitted('vdropzone-sending-multiple')).toBeTruthy()
  })

  it('complete', () => {
    wrapper.vm.dropzone.emit('complete', file)
    expect(wrapper.emitted('vdropzone-complete')).toBeTruthy()
  })

  it('completemultiple', () => {
    wrapper.vm.dropzone.emit('completemultiple', file)
    expect(wrapper.emitted('vdropzone-complete-multiple')).toBeTruthy()
  })

  it('canceledmultiple', () => {
    wrapper.vm.dropzone.emit('canceledmultiple')
    expect(wrapper.emitted('vdropzone-canceled-multiple')).toBeTruthy()
  })

  it('maxfilesreached', () => {
    wrapper.vm.dropzone.emit('maxfilesreached')
    expect(wrapper.emitted('vdropzone-max-files-reached')).toBeTruthy()
  })

  it('processing', () => {
    wrapper.vm.dropzone.emit('processing', file)
    expect(wrapper.emitted('vdropzone-processing')).toBeTruthy()
    expect(wrapper.emitted('vdropzone-processing')[0][0]).toEqual(file)
  })

  it('processingmultiple', () => {
    wrapper.vm.dropzone.emit('processingmultiple', file)
    expect(wrapper.emitted('vdropzone-processing-multiple')).toBeTruthy()
    expect(wrapper.emitted('vdropzone-processing-multiple')[0][0]).toEqual(file)
  })

  it('uploadprogress', () => {
    wrapper.vm.dropzone.emit('uploadprogress', file)
    expect(wrapper.emitted('vdropzone-upload-progress')).toBeTruthy()
    expect(wrapper.emitted('vdropzone-upload-progress')[0][0]).toEqual(file)
  })

  it('totaluploadprogress', () => {
    wrapper.vm.dropzone.emit('totaluploadprogress')
    expect(wrapper.emitted('vdropzone-total-upload-progress')).toBeTruthy()
  })

  it('reset', () => {
    wrapper.vm.dropzone.emit('reset')
    expect(wrapper.emitted('vdropzone-reset')).toBeTruthy()
  })

  it('queuecomplete', () => {
    wrapper.vm.dropzone.emit('queuecomplete')
    expect(wrapper.emitted('vdropzone-queue-complete')).toBeTruthy()
  })

  it('drop', () => {
    let event = {}
    wrapper.vm.dropzone.emit('drop', event)
    expect(wrapper.emitted('vdropzone-drop')).toBeTruthy()
    expect(wrapper.emitted('vdropzone-drop')[0][0]).toEqual(event)
  })

  it('dragstart', () => {
    let event = {}
    wrapper.vm.dropzone.emit('dragstart', event)
    expect(wrapper.emitted('vdropzone-drag-start')).toBeTruthy()
    expect(wrapper.emitted('vdropzone-drag-start')[0][0]).toEqual(event)
  })

  it('dragend', () => {
    let event = {}
    wrapper.vm.dropzone.emit('dragend', event)
    expect(wrapper.emitted('vdropzone-drag-end')).toBeTruthy()
    expect(wrapper.emitted('vdropzone-drag-end')[0][0]).toEqual(event)
  })

  it('dragenter', () => {
    let event = {}
    wrapper.vm.dropzone.emit('dragenter', event)
    expect(wrapper.emitted('vdropzone-drag-enter')).toBeTruthy()
    expect(wrapper.emitted('vdropzone-drag-enter')[0][0]).toEqual(event)
  })

  it('dragover', () => {
    let event = {}
    wrapper.vm.dropzone.emit('dragover', event)
    expect(wrapper.emitted('vdropzone-drag-over')).toBeTruthy()
    expect(wrapper.emitted('vdropzone-drag-over')[0][0]).toEqual(event)
  })

  it('dragleave', () => {
    let event = {}
    wrapper.vm.dropzone.emit('dragleave', event)
    expect(wrapper.emitted('vdropzone-drag-leave')).toBeTruthy()
    expect(wrapper.emitted('vdropzone-drag-leave')[0][0]).toEqual(event)
  })
})

describe('elements/Attachment methods', () => {
  let wrapper
  let sanbox
  let showErrorMessageStub

  const testPost = 'https://httpbin.org/post'

  function createWrapper(options) {
    return shallowMount(ComAttachment, _.merge({
      propsData: {
        id: 'dropzone_test',
        options: {
          url: testPost,
          dictDefaultMessage: 'Upload'
        }
      },
      computed: {
        dropzoneSettings() {
          return {
            thumbnailWidth: 40,
            thumbnailHeight: 40,
            addRemoveLinks: true,
            previewTemplate: `
            <div class="dz-preview dz-file-preview">
              <div class="dz-image">
                <img data-dz-thumbnail />
              </div>
              <div class="dz-details">
                <div class="dz-size" data-dz-size></div>
                <div class="dz-filename"><span data-dz-name></span></div>
              </div>
              <div class="dz-progress">
                <span class="dz-upload" data-dz-uploadprogress></span>
              </div>
              <div class="dz-success-mark">
                <i class="fa fa-check" aria-hidden="true"></i>
                <i class="fa fa-trash" aria-hidden="true" style="display:none" data-dz-remove></i>
              </div>
              <div class="dz-error-mark">
                <i class="fa fa-times" aria-hidden="true"></i>
              </div>
              <div class="dz-error-message">
                <span data-dz-errormessage></span>
              </div>
            </div>
            `,
            url: testPost,
            dictDefaultMessage: 'Upload'
          }
        }
      },
      methods: {
        showErrorMessage: showErrorMessageStub
      },
      attachToDocument: true
    }, options || {}))
  }
  beforeEach(() => {
    sanbox = sinon.createSandbox()
    showErrorMessageStub = sanbox.stub()
    wrapper = createWrapper()
  })

  afterEach(() => {
    wrapper.destroy()
    sanbox.restore()
  })

  it('manuallyAddFile', () => {
    wrapper = createWrapper({
      propsData: {
        options: {
          maxFiles: 3
        }
      }
    })
    let file = {
      name: 'test.text',
      type: 'text/plain',
      upload: {
        uuid: 'a123444'
      }
    }
    wrapper.vm.manuallyAddFile(file)
    expect(wrapper.vm.dropzone.files[0]['upload']['uuid']).toBe('a123444')
  })

  it('setOption', () => {
    wrapper.vm.setOption('timeout', 5000)
    expect(wrapper.vm.dropzone.options.timeout).toBe(5000)
  })

  it('processQueue', () => {
    let processQueueStub = sanbox.stub()
    wrapper.vm.dropzone.processQueue = processQueueStub
    wrapper.vm.processQueue()
    expect(processQueueStub.called).toBe(true)
  })

  it('removeAllFiles', () => {
    let removeAllFilesStub = sanbox.stub()
    wrapper.vm.dropzone.removeAllFiles = removeAllFilesStub
    wrapper.vm.removeAllFiles(true)
    expect(removeAllFilesStub.called).toBe(true)
  })

  it('init', () => {
    let initStub = sanbox.stub()
    wrapper.vm.dropzone.init = initStub
    wrapper.vm.init()
    expect(initStub.called).toBe(true)
  })

  it('destroy', () => {
    let destroyStub = sanbox.stub()
    wrapper.vm.dropzone.destroy = destroyStub
    wrapper.vm.destroy()
    expect(destroyStub.called).toBe(true)
  })

  it('updateTotalUploadProgress', () => {
    let updateTotalUploadProgressStub = sanbox.stub()
    wrapper.vm.dropzone.updateTotalUploadProgress = updateTotalUploadProgressStub
    wrapper.vm.updateTotalUploadProgress()
    expect(updateTotalUploadProgressStub.called).toBe(true)
  })

  it('getFallbackForm', () => {
    let getFallbackFormStub = sanbox.stub()
    wrapper.vm.dropzone.getFallbackForm = getFallbackFormStub
    wrapper.vm.getFallbackForm()
    expect(getFallbackFormStub.called).toBe(true)
  })

  it('getExistingFallback', () => {
    let getExistingFallbackStub = sanbox.stub()
    wrapper.vm.dropzone.getExistingFallback = getExistingFallbackStub
    wrapper.vm.getExistingFallback()
    expect(getExistingFallbackStub.called).toBe(true)
  })

  it('setupEventListeners', () => {
    let setupEventListenersStub = sanbox.stub()
    wrapper.vm.dropzone.setupEventListeners = setupEventListenersStub
    wrapper.vm.setupEventListeners()
    expect(setupEventListenersStub.called).toBe(true)
  })

  it('removeEventListeners', () => {
    let removeEventListenersStub = sanbox.stub()
    wrapper.vm.dropzone.removeEventListeners = removeEventListenersStub
    wrapper.vm.removeEventListeners()
    expect(removeEventListenersStub.called).toBe(true)
  })

  it('disable', () => {
    let disableStub = sanbox.stub()
    wrapper.vm.dropzone.disable = disableStub
    wrapper.vm.disable()
    expect(disableStub.called).toBe(true)
  })

  it('enable', () => {
    let enableStub = sanbox.stub()
    wrapper.vm.dropzone.enable = enableStub
    wrapper.vm.enable()
    expect(enableStub.called).toBe(true)
  })

  it('filesize', () => {
    let filesizeStub = sanbox.stub()
    wrapper.vm.dropzone.filesize = filesizeStub
    wrapper.vm.filesize()
    expect(filesizeStub.called).toBe(true)
  })

  it('accept', () => {
    let acceptStub = sanbox.stub()
    wrapper.vm.dropzone.accept = acceptStub
    wrapper.vm.accept()
    expect(acceptStub.called).toBe(true)
  })

  it('removeFile', () => {
    let removeFileStub = sanbox.stub()
    wrapper.vm.dropzone.removeFile = removeFileStub
    wrapper.vm.removeFile()
    expect(removeFileStub.called).toBe(true)
  })

  it('getAcceptedFiles', () => {
    let getAcceptedFilesStub = sanbox.stub()
    wrapper.vm.dropzone.getAcceptedFiles = getAcceptedFilesStub
    wrapper.vm.getAcceptedFiles()
    expect(getAcceptedFilesStub.called).toBe(true)
  })

  it('getRejectedFiles', () => {
    let getRejectedFilesStub = sanbox.stub()
    wrapper.vm.dropzone.getRejectedFiles = getRejectedFilesStub
    wrapper.vm.getRejectedFiles()
    expect(getRejectedFilesStub.called).toBe(true)
  })

  it('getFilesWithStatus', () => {
    let getFilesWithStatusStub = sanbox.stub()
    wrapper.vm.dropzone.getFilesWithStatus = getFilesWithStatusStub
    wrapper.vm.getFilesWithStatus()
    expect(getFilesWithStatusStub.called).toBe(true)
  })

  it('getQueuedFiles', () => {
    let getQueuedFilesStub = sanbox.stub()
    wrapper.vm.dropzone.getQueuedFiles = getQueuedFilesStub
    wrapper.vm.getQueuedFiles()
    expect(getQueuedFilesStub.called).toBe(true)
  })

  it('getUploadingFiles', () => {
    let getUploadingFilesStub = sanbox.stub()
    wrapper.vm.dropzone.getUploadingFiles = getUploadingFilesStub
    wrapper.vm.getUploadingFiles()
    expect(getUploadingFilesStub.called).toBe(true)
  })

  it('getAddedFilesFiles', () => {
    let getAddedFilesStub = sanbox.stub()
    wrapper.vm.dropzone.getAddedFiles = getAddedFilesStub
    wrapper.vm.getAddedFiles()
    expect(getAddedFilesStub.called).toBe(true)
  })

  it('getActiveFiles', () => {
    let getActiveFilesStub = sanbox.stub()
    wrapper.vm.dropzone.getActiveFiles = getActiveFilesStub
    wrapper.vm.getActiveFiles()
    expect(getActiveFilesStub.called).toBe(true)
  })

  it('beforeDestroy', () => {
    wrapper = createWrapper({
      propsData: {
        destroyDropzone: false
      }
    })
    let destroyStub = sanbox.stub()
    wrapper.vm.dropzone.destroy = destroyStub
    wrapper.destroy()
    expect(destroyStub.called).toBe(false)
  })
})
