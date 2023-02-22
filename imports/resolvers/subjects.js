const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const subjects = {
  query: {
    subjects(root, args, context) {
      return prisma.subjects.findMany({
        include: {
          study: {
            include: {
              classes: true,
            }
          },
          grades: {
            include: {
              student: true,
            },
          },
        },
      })
    },
    subject(root, args, context) {
      return prisma.subjects.findUnique({
        where: {
          id: args.id,
        },
        include: {
          study: {
            include: {
              classes: true,
            }
          },
          grades: {
            include: {
              student: true,
            },
          },
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
        include: {
          study: {
            include: {
              classes: true,
            }
          },
          grades: {
            include: {
              student: true,
            },
          },
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
        include: {
          study: {
            include: {
              classes: true,
            }
          },
          grades: {
            include: {
              student: true,
            },
          },
        },
      })
    },
    deleteSubject(root, args, context) {
      return prisma.subjects.delete({
        where: {
          id: args.id,
        },
        include: {
          study: {
            include: {
              classes: true,
            }
          },
          grades: {
            include: {
              student: true,
            },
          },
        },
      })
    },
  },
}

module.exports = subjects