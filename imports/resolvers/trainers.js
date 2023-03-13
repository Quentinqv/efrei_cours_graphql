const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const trainers = {
  query: {
    trainers(root, args, context) {
      return prisma.trainers.findMany()
    },
    trainer(root, args, context) {
      return prisma.trainers.findUnique({
        where: {
          id: args.id,
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
      })
    },
    deleteTrainer(root, args, context) {
      return prisma.trainers.delete({
        where: {
          id: args.id,
        },
      })
    }
  }
}

module.exports = trainers