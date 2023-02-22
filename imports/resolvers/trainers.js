const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const trainers = {
  query: {
    trainers(root, args, context) {
      return prisma.trainers.findMany({
        include: {
          planning: true,
        },
      })
    },
    trainer(root, args, context) {
      return prisma.trainers.findUnique({
        where: {
          id: args.id,
        },
        include: {
          planning: true,
        },
      })
    }
  },
  mutations: {
    createTrainer(root, args, context) {
      return prisma.trainers.create({
        data: {
          name: args.name,
        },
        include: {
          planning: true,
        },
      })
    },
    updateTrainer(root, args, context) {
      return prisma.trainers.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
        include: {
          planning: true,
        },
      })
    },
    deleteTrainer(root, args, context) {
      return prisma.trainers.delete({
        where: {
          id: args.id,
        },
        include: {
          planning: true,
        },
      })
    }
  }
}

module.exports = trainers