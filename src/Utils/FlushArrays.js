export const FlushArray = (array) => {
    return array.sort(function (a, b) {
      return 0.5 - Math.random()
    })
  }