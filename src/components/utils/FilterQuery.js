import FilterFieldList from './FilterFieldList';
import FilterFieldKeyword from './FilterFieldKeyword';
import merge from 'deepmerge';

export default class FilterQuery {

  constructor (fieldLists, concatOperations = []) {
    this.status = "error"
    this.fieldLists = fieldLists
    this.concatOperations = concatOperations
    if(this.concatOperations.length !== this.fieldLists.length - 1) {
      this.concatOperations.fill("_OR_", 0, this.fieldLists.length - 2)
    }
    this.query = this.getResult()
    this.status = "success"
  }

  isEmpty() {
    return this.fieldLists.length === 0
  }

  getQuery () {
    return this.query
  }

  getFields () {
    return this.fieldLists.map(l => l.getFields()).flat(1)
  }

  removeField (field) {
    this.fieldLists.forEach((list, i) => {
      list.removeField(field)
      if(list.isEmpty()) {
        this.fieldLists.splice(i, 1)
        this.concatOperations.splice(i - 1, 1)
      }
    })
    this.query = this.getResult()
    this.status = "success"
  }

  or (other) {
    return new FilterQuery(
      this.fieldLists.concat(other.fieldLists),
      this.concatOperations.concat(["_OR_"].concat(other.concatOperations))
    )
  }

  and (other) {
    return new FilterQuery(
      this.fieldLists.concat(other.fieldLists),
      this.concatOperations.concat(["_AND_"].concat(other.concatOperations))
    )
  }

  getResult () {
    var res = {}
    var q = this.generateQuery()
    var v = this.generateValues()
    Object.keys(q).forEach(key => res[key] = q[key])
    Object.keys(v).forEach(key => res[key] = v[key])
    return res
  }

  generateValues () {
    var offsets = {}
    var res = {}
    res["values"] = this.fieldLists.reduce((values, list) => {
      var merged = merge(values, list.getValues(offsets))
      for(var fieldName in list.getOffsets()) {
        if(offsets.hasOwnProperty(fieldName)) {
          offsets[fieldName] += list.getOffsets()[fieldName]
        } else {
          offsets[fieldName] = list.getOffsets()[fieldName]
        }
      }
      return merged
    }, {})
    return res
  }

  generateQuery () {
    var offsets = {}
    var queries = this.fieldLists.map(list => {
      var res = list.getQuery(offsets)
      for(var fieldName in list.getOffsets()) {
        if(offsets.hasOwnProperty(fieldName)) {
          offsets[fieldName] += list.getOffsets()[fieldName]
        } else {
          offsets[fieldName] = list.getOffsets()[fieldName]
        }
      }
      return res
    })
    var res = queries.reduce((q, current, i) => {
      var res = q
      if(i > 0) {
        res += this.concatOperations[i - 1] + current
      } else {
        res += current
      }
      return res
    }, "")

    // set parentheses around AND blocks
    // res = res.split("_AND_").map(p => "(" + p + ")").join("_AND_")
    return { "query": res }
  }

  static apply(keyword) {

    var queries = []
    var defaultSearch = true

    if(FilterFieldKeyword.isPhoneNumber(keyword)) {
      queries.push(FilterQuery.construct(FilterFieldKeyword.getPhoneFields(), FilterFieldKeyword.getPhone(keyword)))
    }

    if(FilterFieldKeyword.isDate(keyword)) {
      queries.push(FilterQuery.construct(FilterFieldKeyword.getDateFields(), FilterFieldKeyword.getDate(keyword)))
      if(FilterFieldKeyword.isDate(keyword, true)) {
        defaultSearch = false
      }
    }

    if(FilterFieldKeyword.isGender(keyword)) {
      queries.push(FilterQuery.construct(FilterFieldKeyword.getGenderFields(), FilterFieldKeyword.getGender(keyword)))
    }

    if(defaultSearch) {
      queries.push(FilterQuery.construct(FilterFieldKeyword.getDefaultFields(), FilterFieldKeyword.getString(keyword)))
    }

    var query = queries.pop()
    query = queries.reduce((acc, current) => acc.or(current), query)
    return query
  }

  static construct (fieldSet, maskedKeywords) {
    var res = null
    var fieldLists = []
    if (Array.isArray(maskedKeywords) && Array.isArray(fieldSet)) {
      fieldLists.push(new FilterFieldList(fieldSet, maskedKeywords, "_OR_"))
      res = new FilterQuery(fieldLists)
    }
    return res
  }
}
