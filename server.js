const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const typeDefs = require("./imports/definitions.js")
const subjects = require("./imports/resolvers/subjects.js")
const classes = require("./imports/resolvers/classes.js")
const grades = require("./imports/resolvers/grades.js")
const studies = require("./imports/resolvers/studies.js")
const students = require("./imports/resolvers/students.js")
const trainers = require("./imports/resolvers/trainers.js")
const planning = require("./imports/resolvers/planning.js")

// --------------------------------------------
// GraphQL Schema
// --------------------------------------------
const resolvers = {
  Query: {
    ...subjects.query,
    ...classes.query,
    ...grades.query,
    ...studies.query,
    ...students.query,
    ...trainers.query,
    ...planning.query,
  },
  Mutation: {
    ...subjects.mutations,
    ...classes.mutations,
    ...grades.mutations,
    ...studies.mutations,
    ...students.mutations,
    ...trainers.mutations,
    ...planning.mutations,
  }
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

// --------------------------------------------
// Express Server
// --------------------------------------------

const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(4000)