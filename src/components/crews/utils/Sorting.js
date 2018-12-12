export default class Sorting {

  constructor (type, i18n, defaults) {
    this.type = type
    this.sortDir = Sorting.defaults.dir
    if((typeof defaults !== "undefined") && defaults !== null && defaults.hasOwnProperty("dir")) {
      this.sortDir = defaults.dir
    }
    this.sortField = Sorting.defaults.field
    if((typeof defaults !== "undefined") && defaults !== null && defaults.hasOwnProperty("field")) {
      this.sortField = defaults.field
    }
    this.fields = Sorting.generateFields(i18n)
    this.setFields()
    this.currentSelected = this.current.filter((field) => field.value === this.sortField).pop()
  }

  static generateFields (i18n) {
    return {
      'table': [
        {
          'label': i18n.t("crews.crewlist.sorting.fields.crewName"),
          'value': 'Crew_name'
        },
        {
          'label': i18n.t("crews.crewlist.sorting.fields.cityName"),
          'value': 'City_name'
        },
        {
          'label': i18n.t("crews.crewlist.sorting.fields.cityCountry"),
          'value': 'City_country'
        },
      ]
    }
  }

  setFields (i18n) {
    this.fields = Sorting.generateFields(i18n)
  }

  toJSONRequest () {
    return { 'attributes': [this.sortField], 'dir': this.sortDir }
  }

  setDir (dir) {
    this.sortDir = dir
  }

  setField (field) {
    this.sortField = field
  }

  setType (type) {
    this.type = type
    this.setFields()
  }

  getCurrentField () {
    return this.currentSelected
  }

  setFields () {
    var fields = this.fields['widgets']
    if (this.type === 'tableRow') {
      fields = this.fields['table']
    }
    this.current = fields
  }

  getFields () {
    return this.current
  }

  is (dir) {
    var res = false
    if (this.sortDir === dir) {
      res = true
    }
    return res
  }
}

Sorting.defaults = {
  'field': 'Crew_name',
  'dir': 'ASC'
}
