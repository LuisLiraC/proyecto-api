const express = require('express')
const router = express.Router()
const ChampionsController = require('../controllers/champions')

module.exports = (app) => {
  app.use('/api/champions', router)
  const championsController = new ChampionsController()

  router.get('/', async (req, res) => {
    try {
      const { query } = req
      const { limit } = query
      const { offset } = query
      if (query.role) query.role = query.role.toLocaleLowerCase()
      if (query.region) {
        const words = query.region.split(' ')

        query.region = words.forEach((w, idx) => {
          const lower = w.toLocaleLowerCase()
          words[idx] = lower.charAt(0).toUpperCase() + lower.slice(1)
        })
        query.region = words.join(' ')
      }
      delete query.limit
      delete query.offset
      const champions = await championsController.getChampions(query, limit, offset)
      res.status(200).json(champions)
    } catch (error) {
      console.log(error)
    }
  })

  router.get('/:name', async (req, res) => {
    try {
      const { name } = req.params
      const champion = await championsController.getChampion(name.toLocaleLowerCase())
      res.status(200).json(champion)
    } catch (error) {
      console.log(error)
    }
  })
}