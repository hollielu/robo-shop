const router = require('express').Router()
const {Product, Category} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get('/category/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    if (id === String(0)) {
      res.status(201).json({id: 0, name: '', products: []})
    } else {
      const category = await Category.findById(id, {include: [Product]})
      res.status(200).json(category)
    }
  } catch (err) {
    next(err)
  }
})
