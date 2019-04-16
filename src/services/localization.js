import Accounting from 'accounting'

export default {
  formatMoney (value, precision) {
    return Accounting.formatMoney(value, '$', precision, ',', '.')
  },
  unformatMoney (value) {
    return Accounting.unformat(value, '.')
  },
  sliceMoney (value, precision, num) {
    if (value) {
      if (value.toString().length > num) {
        value = value.toString().substring(0, num)
        return Accounting.formatMoney(value, '$', precision, ',', '.') + '...'
      } else {
        return Accounting.formatMoney(value, '$', precision, ',', '.')
      }
    }
    return ''
  },
  formatPercentRate (value, precision) {
    return Accounting.toFixed(value * 100, 2) + '%'
  }
}
