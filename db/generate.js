module.exports = function() {
    var faker = require("faker")
    var _ = require("lodash")
  
    return {
      people: _.times(10, function(n) {
        return {
          id: n + 1,
          fname: faker.name.findName(),
          lname: faker.name.lastName(),
          skills: _.sample(["frontend", "backend", "верстка", "somethingelse"])
        }
      })
    }
  }