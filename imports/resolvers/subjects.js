const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const subjects = {
  query: {
    subjects(root, args, context) {
      return prisma.subjects.findMany()
    },
    subject(root, args, context) {
      return prisma.subjects.findUnique({
        where: {
          id: args.id,
        },
      })
    },
  },
  mutations: {
    createSubject(root, args, context) {
      return prisma.subjects.create({
        data: {
          name: args.name,
          studyId: args.studyId,
        },
      })
    },
    updateSubject(root, args, context) {
      return prisma.subjects.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          studyId: args.studyId,
        },
      })
    },
    deleteSubject(root, args, context) {
      return prisma.subjects.delete({
        where: {
          id: args.id,
        },
      })
    },
  },
}

module.exports = subjects