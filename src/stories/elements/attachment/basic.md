# Attachment

### Usage

```js
<dp-attachment
  id="attachment"
  ref="attachment"
  :singleLargePreview="singleLargePrevew"
  :options="dropzoneOptions"
  :headLabel="headLabel"
  :errorStatus.sync="errorStatus"
  :errorMessage="errorMessage"
  :formatErrorMessage="formatErrorMessage"
  :sizeErrorMessage="sizeErrorMessage">
</dp-attachment>
```

### Preview

<div>
<!-- STORY -->
</div>

### Properties

| propName           | propType | defaultValue                                                  | isRequired | description                                                                                                                                 |
| ------------------ | -------- | ------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| headLabel          | String   | Attachment                                                    | ×          | The text of the head label.                                                                                                                 |
| singleLargePreview | boolean  | false                                                         | ×          | use single large image preview , user can only upload one image for each time (when upload other type of file , there will be no thumbnail) |
| options            | object   | -                                                             | √          | Other options are listed here: http://www.dropzonejs.com/#configuration-options                                                             |
| errorStatus        | Boolean  | false                                                         | ×          | Show error message or not                                                                                                                   |
| errorMessage       | String   | 'Please upload a file.'                                       | ×          | Error message                                                                                                                               |
| formatErrorMessage | String   | Please upload a file in the correct format. ({{filename}})    | ×          | Error message for error file format. {{filename}} and {{maxsize}} is variable, it will be replace in componnet.                             |
| sizeErrorMessage   | String   | File is too big. Max file size is {{maxsize}}. ({{filename}}) | ×          | Error message for error file size. {{filename}} and {{maxsize}} is variable, it will be replace in componnet.                               |


### Events
| propName                                                    | propType | defaultValue | isRequired | description                                                                                                                                                                                                                                      |
| ----------------------------------------------------------- | -------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| vdropzone-thumbnail(file, dataUrl)                          | event    | -            | ×          | When the thumbnail has been generated.                                                                                                                                                                                                           |
| vdropzone-file-added(file)                                  | event    | -            | ×          | When a file is added to the list.                                                                                                                                                                                                                |
| vdropzone-files-added(files)                                | event    | -            | ×          | When files is added to the list.                                                                                                                                                                                                                 |
| vdropzone-removed-file(file)                                | event    | -            | ×          | Called whenever a file is removed from the list. You can listen to this and delete the file from your server if you want to.                                                                                                                     |
| vdropzone-success(file, response)                           | event    | -            | ×          | The file has been uploaded successfully. Gets the server response as second argument.                                                                                                                                                            |
| vdropzone-error(file, message, xhr)                         | event    | -            | ×          | An error occured. Receives the errorMessage as second parameter and if the error was due to the XMLHttpRequest the xhr object as third.                                                                                                          |
| vdropzone-sending(file, xhr, formData)                      | event    | -            | ×          | Called just before each file is sent. Gets the xhr object and the formData objects as second and third parameters, so you can modify them (for example to add a CSRF token) or add additional data.                                              |
| vdropzone-complete(file)                                    | event    | -            | ×          | Called when the upload was either successful or erroneous.                                                                                                                                                                                       |
| vdropzone-canceled(file)                                    | event    | -            | ×          | Called when a file upload gets canceled.                                                                                                                                                                                                         |
| vdropzone-max-files-reached(files)                          | event    | -            | ×          | Called when the number of files accepted reaches the maxFiles limit.                                                                                                                                                                             |
| vdropzone-processing(files)                                 | event    | -            | ×          | When a file gets processed.                                                                                                                                                                                                                      |
| vdropzone-upload-progress(file, progress, bytesSent)        | event    | -            | ×          | Gets called periodically whenever the file upload progress changes.                                                                                                                                                                              |
| vdropzone-total-upload-progress(progress, bytes, bytesSent) | event    | -            | ×          | Called with the total uploadProgress (0-100), the bytes and the bytesSent. This event can be used to show the overall upload progress of all files.                                                                                              |
| vdropzone-reset                                             | event    | -            | ×          | Called when all files in the list are removed and the dropzone is reset to initial state.                                                                                                                                                        |
| vdropzone-queue-complete                                    | event    | -            | ×          | Called when all files in the queue finish uploading.                                                                                                                                                                                             |
| vdropzone-drop                                              | event    | -            | ×          | The user dropped something onto the dropzone.                                                                                                                                                                                                    |
| vdropzone-drag-start                                        | event    | -            | ×          | The user started to drag anywhere.                                                                                                                                                                                                               |
| vdropzone-drag-end                                          | event    | -            | ×          | Dragging has ended.                                                                                                                                                                                                                              |
| vdropzone-drag-enter                                        | event    | -            | ×          | The user dragged a file onto the Dropzone.                                                                                                                                                                                                       |
| vdropzone-drag-over                                         | event    | -            | ×          | The user is dragging a file over the Dropzone.                                                                                                                                                                                                   |
| vdropzone-drag-leave                                        | event    | -            | ×          | The user dragged a file out of the Dropzone                                                                                                                                                                                                      |
| vdropzone-file-added-manually(file, fileUrl)                | event    | -            | ×          | Manually add files.                                                                                                                                                                                                                              |
| vdropzone-processing-multiple(files)                        | event    | -            | ×          | When a file gets processed. Called if the uploadMultiple option is true.                                                                                                                                                                         |
| vdropzone-sending-multiple(file, xhr, formData)             | event    | -            | ×          | Called just before each file is sent. Gets the xhr object and the formData objects as second and third parameters, so you can modify them (for example to add a CSRF token) or add additional data. Called if the uploadMultiple option is true. |
| vdropzone-success-multiple(file, response)                  | event    | -            | ×          | The file has been uploaded successfully. Gets the server response as second argument. Called if the uploadMultiple option is true.                                                                                                               |
| vdropzone-complete-multiple(files)                          | event    | -            | ×          | Called when the upload was either successful or erroneous. Called if the uploadMultiple option is true.                                                                                                                                          |
| vdropzone-canceled-multiple(files)                          | event    | -            | ×          | Called when a file upload gets canceled. Called if the uploadMultiple option is true.                                                                                                                                                            |
| vdropzone-mounted                                           | event    | -            | ×          | Occurs when component is mounted.                                                                                                                                                                                                                |

### Properties of options

| option        | propType | parameter | defaultValue | isRequired | description                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------- | -------- | --------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| acceptedFiles | String   | -         | ''           | ×          | The default implementation of accept checks the file's mime type or extension against this list. This is a comma separated list of mime types or file extensions. If acceptedFiles is ''(empty string) component will accept all format file. [more detail(read attributes:accept)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-accept) Eg.: image/*,application/pdf,.psd |
| maxFilesize   | Number   | -         | 4MB          | ×          | Maximum file size allowed for user uploads, unit is MB                                                                                                                                                                                                                                                                                                                                             |

### How to use the options and event
HTML:
```js
<dp-attachment :options="dropzoneOptions" @vdropzone-drop="drop"></dp-attachment>
```
JS:
```js
data () {
  return {
    dropzoneOptions: {
      acceptedFiles: 'image/*'
    }
  }
},
methods: {
  drop() {
    console.log('The user dropped something onto the dropzone.')
  }
}
```

### Keyboard Interaction

| Element focus | Key            | Description                |
| ------------- | -------------- | -------------------------- |
| Component     | Enter or space | Open dialog to select file |
