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

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    udateUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addProduct(name: String!, description: String!, price: Float!, category: ID!, store: ID!, stockQuantity: Int!, imageUrl: String!): Product
    updateProduct(_id: ID!, quantity: Int!): Product
    removeProduct(_id: ID!): Product
    addCategory(name: String!, description: String!): Category
    updateCategory(_id: ID!, name: String!): Category
    removeCategory(_id: ID!): Category
    addStore(name: String!, location: String!): Store
    updateStore(_id: ID!, name: String!): Store
    removeStore(_id: ID!): Store
  }
    
  `;

module.exports = typeDefs;
