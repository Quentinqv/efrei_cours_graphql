const PrismaClient = require("@prisma/client").PrismaClient
const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { makeExecutableSchema } = require("@graphql-tools/schema")

const prisma = new PrismaClient()

const typeDefs = `
type editors {
  idEditors: Int
  nameEditors: String
  games: [games]
}

type games {
  idGames: Int
  nameGames: String
  idEditors: Int
  editors: editors
  stock: [stock]
}

type stores {
  idStores: Int
  nameStores: String
  stock: [stock]
}

type stock {
  idStock: Int
  idGames: Int
  idStores: Int
  units: Int
  games: games
  stores: stores
}

type Query {
  editors: [editors]
  games: [games]
  stores: [stores]
  stock: [stock]
}
`

const resolvers = {
  Query: {
    editors: async () => {
      return await prisma.editors.findMany({
        include: {
          games: true
        }
      })
    },
    games: async () => {
      return await prisma.games.findMany({
        include: {
          editors: true,
          stock: true
        }
      })
    },
    stores: async () => {
      return await prisma.stores.findMany({
        include: {
          stock: true
        }
      })
    },
    stock: async () => {
      return await prisma.stock.findMany({
        include: {
          games: true,
          stores: true
        }
      })
    }
  },
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(4000)