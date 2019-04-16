<!-- Vue component -->
<template>
  <div class="dp-field__autocomplete-wrap"
       :class="{'dp-field__autocomplete-wrap--multi':multiple, 'dp-field--fixed': isMobile && isOpened }">
    <div class="dp-field__autocomplete-head">
      <i class="dp__close dp-field__autocomplete-close"
         v-if="isMobile && isOpened"
         @click="clickCloseButton">
      </i>
      <dp-button
        class='dp-button--text dp-field__autocomplete-done'
        v-if="isMobile && isOpened && multiple"
        @click="close">DONE
      </dp-button>
      <div class="dp-field dp-field__autocomplete"
           :class="{active: isActive, disabled: isDisabled, error: isError, focus: isOpened, 'dp-field__autocomplete--alt': isMultipleAlt, 'dp-field__error-popver': isPopoverError }">
        <multiselect v-model="autocompleteValue"
                     v-bind="$attrs"
                     :disabled="isDisabled"
                     :multiple="multiple"
                     :label="displayBy"
                     :track-by="checkBy"
                     :show-labels="false"
                     :close-on-select="closeOnSelect"
                     :internal-search="false"
                     :options="filterOptions"
                     :placeholder="multiple?placeholderMulti:placeholderSingle"
                     :show-no-results="showNoResults"
                     :preserve-search="true"
                     ref="autocomplete"
                     class="dp-field__area"
                     @search-change="searchChange"
                     @open="open"
                     @select="select"
                     @remove="removeHandler"
                     @close="internalClose"
                     @input="input">
          <template slot="option"
                    slot-scope="props">
            <template v-if="multiple">
              <p class="dp-button dp-button--checkbox"
                 :class="{'checked': isChecked(props.option)}">
                <i class="icon-check"></i>
                <span v-html="highlight(props.option[displayBy])"></span>
              </p>
            </template>
            <p class="dp-field__autocomplete-single-item"
               v-else
               v-html="highlight(props.option[displayBy])"></p>
            <link class="rippleJS"
                  v-if="!isDisabled">
          </template>
          <template slot="noResult">
            <div class="dp-field__dropdown-no-result">{{ noResult }}</div>
          </template>
        </multiselect>
        <label class="dp-field__label">{{ label }}</label>
        <p class="dp-field__invalid"
           v-if="!isPopoverError && isError">{{ errorMessage || error.message }}</p>
        <dp-popover
          v-if="(isError && isPopoverError)"
          class='dp-com-error-popup dp-com-select__error-popup'
          :width="width"
          :content=" (error && error.message) || errorMessage"
          :placement="placement"
          :always="!!isError"
          :append-to-body="appendToBody"
          :error-popup=true
          :display="display">
        </dp-popover>
      </div>
    </div>
    <modal-confirm :is-open="confirmOpen"
                   @modal-confirmation-close="confirmOpen = false"
                   @confirm="confirm" />
  </div>
</template>

<style lang="scss">
@import '~assets/css/elements/autocomplete';
</style>

<script>
import Multiselect from 'vue-multiselect'
import ModalConfirm from 'modules/modal-confirmation/index.js'
import _ from 'lodash'
import InputBase from 'src/utilities/mixins/input'
import FormError from 'src/utilities/mixins/form-error.js'
import dpTriggerSroll from 'utilities/dp-trigger-sroll.js'
import { KEY_VALUES, getKey } from 'utilities/event-helper/key-event'
import Popover from 'elements/popover/index.js'
import ComButton from 'elements/button/index.js'

const TAG_CLASS = 'multiselect__tag'

export default {
  name: 'dp-autocomplete-multiple',
  mixins: [ InputBase, FormError ],
  components: {
    Multiselect,
    ModalConfirm,
    [Popover.name]: Popover,
    [ComButton.name]: ComButton
  },
  props: {
    value: {
      type: [String, Object, Array]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    displayBy: {
      type: String,
      default: 'text'
    },
    checkBy: {
      type: String,
      default: 'text'
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    noResult: {
      type: String,
      default: 'No result found. Try something else.'
    },
    customAvailable: {
      type: Boolean,
      default: false
    },
    placeholderSingle: {
      type: String,
      default: 'Start typing to search'
    },
    placeholderMulti: {
      type: String,
      default: 'Select destination(s)'
    },
    customSearch: {
      type: Boolean,
      default: false
    },
    multipleAlt: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      autocompleteValue: null,
      searchQuery: '',
      isOpened: false,
      filterOptions: [],
      confirmOpen: false,
      customError: false,
      searchQueryChange: false,
      selectFlag: false,
      inputElement: null
    }
  },
  computed: {
    isValidValue() {
      return (
        !_.isUndefined(this.autocompleteValue) &&
        !_.isNull(this.autocompleteValue) &&
        !_.isEmpty(this.autocompleteValue)
      )
    },
    isActive() {
      return this.isOpened || this.isValidValue
    },
    closeOnSelect() {
      return !this.multiple
    },
    isMobile() {
      return this.$screen.mobile()
    },
    showNoResults() {
      return !this.customAvailable
    },
    basicError() {
      if (!this.beginCatchError) {
        return null
      }
      if (this.required && !this.isValidValue) {
        return {
          type: 'empty',
          message: 'This field is required.'
        }
      }
      if (this.customError) {
        return {
          type: 'empty',
          message: 'No such occupation'
        }
      }
      return null
    },
    isMultipleAlt() {
      if (this.multipleAlt && this.multiple) return true
    }
  },
  created() {
    if (this.multiple) {
      this.autocompleteValue = this.value || []
    } else {
      this.autocompleteValue = this.value || {}
    }
    if (this.customSearch) {
      this.filterOptions = this.options
    } else {
      this.filterOptions = this.sortByAllOptions()
    }
  },
  mounted() {
    this.listenTouchmove()
    this.listenFocus()
    this.bindKeyEvents()
  },
  destroy() {
    document.body.removeEventListener('focusin', this.focusinHandler)
    document.body.removeEventListener('touchstart', this.touchstartHandler)
  },
  methods: {
    bindKeyEvents() {
      this.updateAllTagsTabIndex()
      this.inputElement = this.$el.querySelector('.multiselect__input')
      this.inputElement.addEventListener('keyup', this.onInputKeyUp)
      this.$el.addEventListener('keyup', this.onTagKeyUp)
    },
    onInputKeyUp(e) {
      e.stopPropagation()
      const key = getKey(e)
      if (key === KEY_VALUES.ARROW_LEFT && e.target.selectionStart === 0) {
        const tag = this.$el.querySelector(`.${TAG_CLASS}:last-child`)
        tag.focus()
      }
    },
    updateAllTagsTabIndex() {
      this.$el.querySelectorAll(`.${TAG_CLASS}`).forEach(tag => (tag.tabIndex = -1))
    },
    onTagKeyUp(e) {
      const selectedTag = this.$el.querySelector(`.${TAG_CLASS}:focus`)
      if (!selectedTag) return

      const tag = e.target
      switch (getKey(e)) {
        case KEY_VALUES.BACKSPACE:
        case KEY_VALUES.DELETE:
          this.deleteTag(e, tag)
          break
        case KEY_VALUES.ARROW_LEFT:
          this.focusPreviousTag(tag)
          break
        case KEY_VALUES.ARROW_RIGHT:
          this.focusNextTag(tag)
          break
        default:
          break
      }
    },
    deleteTag(event, tag) {
      const nextElement = tag.nextSibling ? null : this.inputElement
      const icon = tag.querySelector('i')
      icon.dispatchEvent(new MouseEvent('mousedown'))
      event.stopPropagation()
      nextElement && nextElement.focus()
    },
    focusPreviousTag(currentTag) {
      if (currentTag.previousSibling) {
        currentTag.previousSibling.focus()
      }
    },
    focusNextTag(currentTag) {
      if (currentTag.nextSibling) {
        currentTag.nextSibling.focus()
        return currentTag.nextSibling
      } else {
        this.inputElement.focus()
        return this.inputElement
      }
    },
    isChecked(obj) {
      let _this = this
      return _.some(_this.autocompleteValue, obj) ? obj[_this.displayBy] : ''
    },
    highlight(itemLabel) {
      if (_.trim(this.searchQuery) === '') return itemLabel
      return itemLabel.replace(
        new RegExp(`(${this.searchQuery})`, 'i'),
        `<strong class="highlight">$1</strong>`
      )
    },
    createCustomValue(searchQuery) {
      let customValue = {}
      customValue[this.displayBy] = searchQuery
      return customValue
    },
    searchChange(searchQuery, id) {
      this.searchQueryChange = true
      this.searchQuery = searchQuery
      this.renderOptions(searchQuery)
      this.$emit('search-change', searchQuery, id)
    },
    input(value, id) {
      this.setDropdownPosition()
      this.$emit('input', value, id)
    },
    open(id) {
      if (!this.isOpened) {
        this.isOpened = true
        this.showError = false
        this.searchQueryChange = false
        dpTriggerSroll.open()
        this.changeDomStructure()
        this.setDropdownPosition()
        if (this.isMobile) {
          this.setScrollTop()
        }
        this.$emit('open', id)
      }
    },
    close() {
      this.isOpened = false
      this.showError = true
      this.setCustomValue()
      this.searchQueryChange = false
      this.selectFlag = false
      dpTriggerSroll.close()
      this.$emit('close', this.closeValue, this.closeId)
    },
    removeHandler(option, id) {
      if (!this.multiple) {
        this.searchQuery = ''
        this.$refs.autocomplete.search = ''
        if (!this.isMobile) this.selectFlag = true
      }
      this.$emit('remove', option, id)
    },
    clickCloseButton() {
      if (this.multiple && this.isMobile) {
        this.confirmOpen = true
      } else {
        this.close()
      }
    },
    internalClose(value, id) {
      this.closeValue = value
      this.closeId = id
      if (!this.isMobile) this.close()
    },
    confirm() {
      this.confirmOpen = false
      this.close()
      if (this.multiple) {
        this.autocompleteValue = []
      } else {
        this.autocompleteValue = {}
      }
    },
    renderOptions(searchQuery) {
      let _this = this
      if (this.customSearch) {
        this.$nextTick(() => {
          this.filterOptions = this.options
        })
      } else {
        let fiterItems = this.getFilteredOption(searchQuery)
        this.filterOptions = _.sortBy(
          fiterItems,
          function(option) {
            return _.lowerCase(option[_this.displayBy]).indexOf(
              _.lowerCase(searchQuery)
            )
          },
          function(option) {
            return _.lowerCase(option[_this.displayBy])
          }
        )
      }
    },
    sortByAllOptions() {
      let _this = this
      return _.sortBy(this.options, function(option) {
        return option[_this.displayBy].toLowerCase()
      })
    },
    setDropdownPosition() {
      if (this.multiple) {
        this.$nextTick(() => {
          let autocompleteHead = this.$el.querySelector(
            '.dp-field__autocomplete-head'
          )
          let autocomplete = this.$el.querySelector('.dp-field__autocomplete')
          let headHeight = autocompleteHead.getBoundingClientRect().height
          let autocompletePaddingBottom = parseInt(
            getComputedStyle(autocomplete).paddingBottom
          )
          let contentWrapper = this.$el.querySelector(
            '.multiselect__content-wrapper'
          )
          contentWrapper.style.top =
            headHeight - autocompletePaddingBottom + 'px'
        })
      }
    },
    changeDomStructure() {
      let multiselectWrapper = this.$el.querySelector(
        '.multiselect__content-wrapper'
      )
      this.$el.appendChild(multiselectWrapper)
      if (!this.isMobile) {
        this.$nextTick(() => {
          let fieldArea = this.$el.querySelector('.dp-field__area')
          if (fieldArea.classList.contains('multiselect--above')) {
            multiselectWrapper.classList.add('multiselect--above')
          } else {
            multiselectWrapper.classList.remove('multiselect--above')
          }
        })
      }
    },
    listenTouchmove() {
      document.body.addEventListener('touchstart', this.touchstartHandler)
    },
    setScrollTop() {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },
    listenFocus() {
      document.body.addEventListener('focusin', this.focusinHandler)
    },
    touchstartHandler(e) {
      if (e.target.closest('.multiselect__content-wrapper')) {
        this.$el.querySelector('.multiselect__input').blur()
      }
    },
    focusinHandler(e) {
      if (e.target.closest('.multiselect__input')) {
        this.setDropdownPosition()
      }
    },
    setCustomValue() {
      let customValue = {}
      if (!this.searchQueryChange) return
      if (!this.multiple && this.selectFlag) return
      if (this.searchQuery === '' && !this.multiple) {
        this.autocompleteValue = {}
        return
      }
      if (this.multiple && this.searchQuery === '') return
      customValue = this.createCustomValue(this.searchQuery)
      if (this.multiple) {
        this.autocompleteValue.push(customValue)
        this.$refs.autocomplete.search = ''
      } else {
        this.autocompleteValue = customValue
      }
    },
    checkCustomError() {
      this.customError = false
      let res = []
      if (this.customAvailable || !this.isValidValue) return
      if (this.multiple) {
        res = _.differenceBy(this.autocompleteValue, this.options, this.displayBy)
      } else if (this.autocompleteValue[this.displayBy]) {
        res = _.differenceBy([this.autocompleteValue], this.options, this.displayBy)
      }
      this.customError = res.length > 0
    },
    getFilteredOption(opt) {
      let _this = this
      return _.filter(this.options, function(option) {
        return (
          _.lowerCase(option[_this.displayBy]).indexOf(
            _.lowerCase(opt)
          ) >= 0
        )
      })
    },
    select(selectOption, id) {
      this.selectFlag = true
      this.$emit('select', selectOption, id)
    },
    multipleAltDom() {
      if (this.isMultipleAlt) {
        let tag = this.$el.querySelectorAll('.multiselect__tag>span')
        tag.forEach((child, key) => {
          let tagSymbol = child.querySelector('.multiselect__tag-symbol')
          if (tagSymbol) {
            child.removeChild(tagSymbol)
          }
          if (key === tag.length - 1) return false
          let tagSymbolHtml = document.createElement('span')
          tagSymbolHtml.innerHTML = ','
          tagSymbolHtml.classList.add('multiselect__tag-symbol')
          child.appendChild(tagSymbolHtml)
        })
      }
    }
  },
  watch: {
    autocompleteValue: {
      handler(nValue) {
        this.$nextTick(() => {
          this.multipleAltDom()
          this.updateAllTagsTabIndex()
        })
        this.$emit('update:value', nValue)
        this.checkCustomError()
      }
    }
  }
}
</script>
