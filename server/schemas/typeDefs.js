const typeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    address: String
    orders: [Order]
  }

  type Admin {
    _id: ID!
    username: String
    email: String
    password: String
    store: Store
  }

  type Order {
    _id: ID!
    purchaseDate: String
    currency: String
    products: [Product]
    purchaseQuantities: [Int]
  }

  type Product {
    _id: ID!
    name: String
    description: String
    price: Float
    category: Category
    store: Store
    stockQuantity: Int
    purchaseQuantity: Int
    imageUrl: String
    featured: Boolean
    created_at: String
  }

  type Category {
    _id: ID!
    name: String
    description: String
    products: [Product]
  }

  type Auth {
    token: ID!
    user: User
    admin: Admin
  }

  type Checkout {
    session: ID
  }


  type Store {
    _id: ID!
    name: String
    location: String
    shopImageUrl: String
    products: [Product]
    description: String
    admin: Admin
  }

  input ProductPaginationInput {
    limit: Int!
    offset: Int!
  }

  input Currency {
    currency: String!
  }


  type Query {
    user: User
    users: [User]
    checkout(products: [ID]!, currency: String!, convertedAmounts: [Float]!): Checkout
    productsByCategory(category: ID): [Product]
    getProduct(_id: ID!): Product
    getProducts(limit: Int!, offset: Int!): [Product]
    getProductsFuzzy(query: String!): [Product]
    getFeaturedProducts: [Product]
    getCategories: [Category]
    getStore(id: ID!): Store
    getStores: [Store]!
    getProductsByCategory(_id: ID!): [Product]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, address: String! ): Auth
    login(email: String!, password: String!): Auth
    updateProduct(_id: ID!, quantity: Int!): Product
    addStore(name: String!, location: String!, admin: ID! ): Store
    addOrder(products: [ID]!, currency: String!, purchaseQuantities: [Int]): Order
    addExampleOrder(products: [ID]!, currency: String!, purchaseQuantities: [Int]): Order
  }
    
  `;

module.exports = typeDefs;
