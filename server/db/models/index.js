const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Category = require('./category')
const Manufacturer = require('./manufacturer')
const Seller = require('./seller')

// user
User.hasMany(Review)

// product
Product.hasMany(Category)
Product.hasMany(Review)
Product.hasOne(Manufacturer)
Product.hasOne(Seller)

// review
Review.hasOne(User)
Review.hasOne(Product)

module.exports = {
  User,
  Product,
  Review,
  Category,
  Manufacturer,
  Seller
}
