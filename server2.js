const PrismaClient = require("@prisma/client").PrismaClient
const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { makeExecutableSchema } = require("@graphql-tools/schema")

const prisma = new PrismaClient()

const typeDefs = `
type students {
  id: Int
  created_at: String
  updated_at: String
  lastname: String
  firstname: String
  classes: classes
}

type classes {
  id: Int
  created_at: String
  updated_at: String
  name: String
  ngroup: Int
  year: String
  students: [students]
}

type Query {
  students: [students]
  classes: [classes]

  getStudent(id: Int!): students
}

type Mutation {
  addStudent(lastname: String!, firstname: String!, class: Int!): students
  updateStudent(id: Int!, lastname: String, firstname: String, class: Int): students
  deleteStudent(id: Int!): students

  addClass(name: String!, ngroup: Int!, year: String!): classes
  updateClass(id: Int!, name: String, ngroup: Int, year: String): classes
  deleteClass(id: Int!): classes
}
`

const resolvers = {
  Query: {
    students: async () => {
      let out = await prisma.students.findMany({
        include: {
          classes: true,
        },
      })
      console.log(out);
      return out
    },
    classes: () => {
      return prisma.classes.findMany({
        include: {
          students: true,
        },
      })
    },
    getStudent: (parent, args) => {
      return prisma.students.findUnique({
        where: {
          id: args.id,
        },
        include: {
          classes: true,
        },
      })
    },
  },
  Mutation: {
    addStudent: (parent, args) => {
      return prisma.students.create({
        data: {
          lastname: args.lastname,
          firstname: args.firstname,
          class: args.class,
        },
        include: {
          classes: true,
        },
      })
    },
    updateStudent: (parent, args) => {
      return prisma.students.update({
        where: {
          id: args.id,
        },
        data: {
          lastname: args.lastname,
          firstname: args.firstname,
          class: args.class,
        },
        include: {
          classes: true,
        },
      })
    },
    deleteStudent: (parent, args) => {
      return prisma.students.delete({
        where: {
          id: args.id,
        },
        include: {
          classes: true,
        },
      })
    },
    deleteClass: async (parent, args) => {
      // Get all students in the class, then change the class to null
      await prisma.students.updateMany({
        where: {
          class: args.id,
        },
        data: {
          class: null,
        },
      })

      return prisma.classes.delete({
        where: {
          id: args.id,
        },
        include: {
          students: true,
        },
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