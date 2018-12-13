import FilterFieldKeyword from './FilterFieldKeyword';
import merge from 'deepmerge';

export default class FilterFieldList {

  constructor (fields, keywords, operation) {
    this.fields = []
    this.operation = operation
    this.offsets = {}

    for (var k = 0; k < keywords.length; k++) {
      for (var field of fields) {
        var index = k + 1
        if(this.offsets.hasOwnProperty(field.name)) {
          index += this.offsets[field.name]
        }
        this.fields.push(new FilterFieldKeyword(field, keywords[k], index))
      }

      fields.forEach(field => {
        if(this.offsets.hasOwnProperty(field.name)) {
          this.offsets[field.name] += k + 1
        } else {
          this.offsets[field.name] = k + 1
        }
      })
    }
  }

  getQuery(offsets = {}) {
    return "(" + this.fields.map(field => {
      var offset = 0
      if(offsets.hasOwnProperty(field.getName())) {
        offset = offsets[field.getName()]
      }
      return field.getQuery(offset)
    }).join(this.operation) + ")"
  }

  getValues(offsets = {}) {
    return this.fields.reduce((merged, field) => {
      var offset = 0
      if(offsets.hasOwnProperty(field.getName())) {
        offset = offsets[field.getName()]
      }
      return merge(merged, field.getValue(offset))
    }, {})
  }

  getOffsets() {
    return this.offsets
  }

  getFields() {
    return this.fields
  }

  removeField(field) {
    for(var i = 0; i < this.fields.length; i++) {
      if(this.fields[i].equals(field)) {
        this.fields.splice(i, 1)
        if(this.offsets.hasOwnProperty(field.getName())) {
          delete this.offsets[field.getName()]
        }
      }
    }
  }

  isEmpty() {
    return this.fields.length === 0
  }
}
