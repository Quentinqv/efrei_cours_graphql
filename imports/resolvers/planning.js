const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const planning = {
  query: {
    plannings(root, args, context) {
      return prisma.planning.findMany()
    },
    planning(root, args, context) {
      return prisma.planning.findUnique({
        where: {
          id: args.id,
        },
      })
    }
  },
  mutations: {
    createPlanning(root, args, context) {
      return prisma.planning.create({
        data: {
          classId: args.classId,
          subjectId: args.subjectId,
          trainerId: args.trainerId,
        },
      })
    },
    updatePlanning(root, args, context) {
      return prisma.planning.update({
        where: {
          id: args.id,
        },
        data: {
          classId: args.classId,
          subjectId: args.subjectId,
          trainerId: args.trainerId,
        },
      })
    },
    deletePlanning(root, args, context) {
      return prisma.planning.delete({
        where: {
          id: args.id,
        },
      })
    }
  }
}

module.exports = planning