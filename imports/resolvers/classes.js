const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const classes = {
  // This is the resolver for the field "classes" in the type "Query"
  query: {
    classes(root, args, context) {
      return prisma.classes.findMany()
    },
    class(root, args, context) {
      return prisma.classes.findUnique()
    },
  },
  // This is the resolver for the field "classes" in the type "Mutation"
  mutations: {
    createClass(root, args, context) {
      return prisma.classes.create({
        data: {
          name: args.name,
          studyId: args.studyId,
        },
      })
    },
    updateClass(root, args, context) {
      return prisma.classes.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          studyId: args.studyId,
        },
      })
    },
    deleteClass(root, args, context) {
      return prisma.classes.delete({
        where: {
          id: args.id,
        },
      })
    },
  },
}

module.exports = classes