const championsList = require('../mocks/championsList.json')

class ChampionsController {
  constructor() {
    
  }

  async getChampions(query, limit, offset) {
    return championsList
  }

  async getChampion(name) {
    return championsList[0]
  }
}

module.exports = ChampionsController