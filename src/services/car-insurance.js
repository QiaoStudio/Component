import axios from 'axios'

const carsAPI = 'http://th-api-acc.testwoodpeckerasiatech.com/'

export default {
  getModels: function (makeId) {
    return axios.get(carsAPI + 'api/cars/makes/' + makeId + '/models')
  },
  getMakes: function () {
    return axios.get(carsAPI + 'api/cars/makes/')
  },
  buildQuery(mappings, criteria) {
    let result = mappings(criteria)
    for (let key in result) {
      if (!result[key]) {
        delete result[key]
      }
    }
    return result
  },
  buildLink(criteria) {
    return this.buildQuery(c => {
      return {
        registerYear: c.registerYear,
        make: c.make,
        model: c.model,
        policyTypes: c.policyTypes && c.policyTypes.join('|')
      }
    }, criteria)
  }
}
