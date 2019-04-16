<template>
  <dp-attachment
    id="dropzone"
    ref="dropzone"
    :single-large-preview="singleLargePreview"
    :options="dropzoneOptions"
    :head-label="headLabel"
    :error-status.sync="errorStatus"
    :error-message="errorMessage"
    :format-error-message="formatErrorMessage"
    :size-error-message="sizeErrorMessage">
  </dp-attachment>
</template>

<script>
const testPost = 'https://httpbin.org/post'

export default {
  data () {
    return {
      dropzoneOptions: {
        url: testPost,
        acceptedFiles: text('The Format of Files', ''),
        maxFilesize: number('Max Files Size(MB)', 5)
      },
      headLabel: text('Head Label', 'Attachment'),
      singleLargePreview: boolean('is single large preview?', false),
      errorStatus: boolean('errorStatus', false),
      errorMessage: text('errorMessage', 'Please upload a file.'),
      formatErrorMessage: text('Format Error Message', 'Please upload a file in the correct format. ({{filename}})'),
      sizeErrorMessage: text('Size Error Message', 'File is too big. Max file size is {{maxsize}}. ({{filename}})')
    }
  }
}
</script>

