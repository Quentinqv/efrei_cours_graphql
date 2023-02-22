const studies = {
  query: {
    studies(root, args, context) {
      return prisma.studies.findMany({
        include: {
          subjects: {
            include: {
              grades: true,
              planning: true,
            },
          },
          classes: {
            include: {
              students: true,
            },
          },
        },
      })
    },
    study(root, args, context) {
      return prisma.studies.findUnique({
        where: {
          id: args.id,
        },
        include: {
          subjects: {
            include: {
              grades: true,
              planning: true,
            },
          },
          classes: {
            include: {
              students: true,
            },
          },
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
        include: {
          subjects: {
            include: {
              grades: true,
              planning: true,
            },
          },
          classes: {
            include: {
              students: true,
            },
          },
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
        include: {
          subjects: {
            include: {
              grades: true,
              planning: true,
            },
          },
          classes: {
            include: {
              students: true,
            },
          },
        },
      })
    },
    deleteStudy(root, args, context) {
      return prisma.studies.delete({
        where: {
          id: args.id,
        },
        include: {
          subjects: {
            include: {
              grades: true,
              planning: true,
            },
          },
          classes: {
            include: {
              students: true,
            },
          },
        },
      })
    },
  },
}

module.exports = studies