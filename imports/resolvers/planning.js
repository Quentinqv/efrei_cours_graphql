const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const planning = {
  query: {
    plannings(root, args, context) {
      return prisma.planning.findMany({
        include: {
          subject: {
            include: {
              study: true,
              grades: true,
            },
          },
          trainer: true,
        },
      })
    },
    planning(root, args, context) {
      return prisma.planning.findUnique({
        where: {
          id: args.id,
        },
        include: {
          subject: {
            include: {
              study: true,
              grades: true,
            },
          },
          trainer: true,
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
        include: {
          subject: {
            include: {
              study: true,
              grades: true,
            },
          },
          trainer: true,
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
        include: {
          subject: {
            include: {
              study: true,
              grades: true,
            },
          },
          trainer: true,
        },
      })
    },
    deletePlanning(root, args, context) {
      return prisma.planning.delete({
        where: {
          id: args.id,
        },
        include: {
          subject: {
            include: {
              study: true,
              grades: true,
            },
          },
          trainer: true,
        },
      })
    }
  }
}

module.exports = planning