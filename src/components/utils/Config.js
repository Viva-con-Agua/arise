export default class Config {

  constructor (options) {
    this.lang = Config.default.lang
    if(options !== null && (typeof options !== "undefined") && options.hasOwnProperty("lang")) {
      this.lang = options.lang
    }

    this.type = Config.default.type
    if(options !== null && (typeof options !== "undefined") && options.hasOwnProperty("type")) {
      this.type = options.type
    }

    this.pagination = Config.default.pagination
    if(options !== null && (typeof options !== "undefined") && options.hasOwnProperty("pagination")) {
      this.pagination = options.pagination
    }

    this.sorting = Config.default.sorting
    if(options !== null && (typeof options !== "undefined") && options.hasOwnProperty("sorting")) {
      this.sorting = options.sorting
    }

    this.filter = {}
    if(options !== null && (typeof options !== "undefined") && options.hasOwnProperty("filter")) {
      this.filter = options.filter
    }
  }

  hasMenue() {
    return this.hasTypeSelect() || this.hasSortingSelect() || this.hasSortingDirButton()

  }

  hasTypeSelect() {
    return this.type.hasOwnProperty("menue") && this.type.menue
  }

  hasSortingSelect() {
    return (this.sorting.hasOwnProperty("menue") && this.sorting.menue.hasOwnProperty("field") && (typeof this.sorting.menue.field === "string"))
  }

  hasSortingDirButton() {
    return this.sorting.hasOwnProperty("menue") && this.sorting.menue.hasOwnProperty("dir") && (typeof this.sorting.menue.dir === "string")
  }

  hasPagination() {
    return (this.pagination.hasOwnProperty("activated") && this.pagination.activated)
  }

  getLang() {
    return this.lang
  }

  getType() {
    var res = null
    if(this.type.hasOwnProperty("value")) {
      switch (this.type.value) {
        case "table":
          res = "tableRow"
          break
        case "big widgets":
          res = "large"
          break
        case "small widgets":
          res = "medium"
          break
        case "tags":
          res = "small"
          break
      }
    }
    return res
  }

  getPage() {
    return { "size": this.pagination.size, "sliding": this.pagination.sliding }
  }

  getSortingInit() {
    return this.sorting.menue
  }
}

Config.default = {
  "type": {
    "menue": true,
    "value": "table" // values: "table", "big widgets", "small widgets", "tags"
  },
  "sorting": {
    "menue": {
      "field": "Crew_name",
      "dir": "ASC"
    }
  },
  "pagination": {
    "activated": true,
    "size": 40,
    "sliding": 20
  },
  "lang": "de-DE"
}
