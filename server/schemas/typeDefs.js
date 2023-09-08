const typeDefs = `
  type User {
    
  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    category: [Category]
    store: Store
    stockQuantity: Int
    imageUrl: String
    created_at: String
  }

  type Category {
    _id: ID
    name: String
    description: String
    products: [Product]
  }

  type Auth {
    token: ID!
    user: User
  }


  type Store {
    _id: ID
    name: String
    location: String
    products: [Product]
  }

  type Query {
    getProduct(id: ID!): Product
    getProducts: [Product]!
    getCategory(id: ID!): Category
    getCategories: [Category]!
    getStore(id: ID!): Store
    getStores: [Store]!
  }
  `;

module.exports = typeDefs;
