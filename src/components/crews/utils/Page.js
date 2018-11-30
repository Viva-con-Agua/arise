export default class Page {

  constructor (numberOfItems, offset = 0, sliding = 20, maxElements = 40, size = 40) {
    this.numberOfItems = numberOfItems
    this.offset = offset
    this.sliding = sliding
    this.size = size
    this.maxElements = maxElements
  }

  static apply (numberOfItems, sliding, size) {
    return new Page(numberOfItems, 0, sliding, size, size)
  }

  getCopy (newOffset, newSize) {
    return new Page(this.numberOfItems, newOffset, this.sliding, this.maxElements, newSize)
  }

  getOffset () {
    return this.offset
  }

  getSize () {
    return this.size
  }

  next () {
    var newPage = this
    if (this.size < this.maxElements) {
      var newSize = this.size + this.sliding
      newPage = this.getCopy(this.offset, newSize)
    } else {
      var newOffset = this.offset + this.sliding
      if (newOffset + this.size > this.numberOfItems) {
        newOffset = this.numberOfItems - this.size
      }
      newPage = this.getCopy(newOffset, this.size)
    }
    return newPage
  }

  previous () {
    var newOffset = this.offset - this.sliding
    if (newOffset < 0) {
      newOffset = 0
    }
    return this.getCopy(newOffset, this.size)
  }

  hasPrevious () {
    return this.offset !== 0
  }

  hasNext () {
    return (this.offset + this.size) < this.numberOfItems
  }

  howManyNext () {
    return this.numberOfItems - (this.offset + this.size)
  }

  howManyPrevious () {
    return this.offset
  }
}
