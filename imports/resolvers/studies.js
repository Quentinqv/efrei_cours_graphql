const studies = {
  query: {
    studies(root, args, context) {
      return prisma.studies.findMany()
    },
    study(root, args, context) {
      return prisma.studies.findUnique({
        where: {
          id: args.id,
        },
      })
    },
  },
  mutations: {
    createStudy(root, args, context) {
      return prisma.studies.create({
        data: {
          name: args.name,
        },
      })
    },
    updateStudy(root, args, context) {
      return prisma.studies.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      })
    },
    deleteStudy(root, args, context) {
      return prisma.studies.delete({
        where: {
          id: args.id,
        },
      })
    },
  },
}

module.exports = studies