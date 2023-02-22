const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const grades = {
  query: {
    grades(root, args, context) {
      return prisma.grades.findMany({
        include: {
          subject: {
            include: {
              study: true,
              planning: true,
            },
          },
          student: {
            include: {
              class: true,
            },
          },
        },
      })
    },
    grade(root, args, context) {
      return prisma.grades.findUnique({
        where: {
          id: args.id,
        },
        include: {
          subject: {
            include: {
              study: true,
              planning: true,
            },
          },
          student: {
            include: {
              class: true,
            },
          },
        },
      })
    },
  },
  mutations: {
    createGrade(root, args, context) {
      return prisma.grades.create({
        data: {
          grade: args.grade,
          studentId: args.studentId,
          subjectId: args.subjectId,
        },
        include: {
          subject: {
            include: {
              study: true,
              planning: true,
            },
          },
          student: {
            include: {
              class: true,
            },
          },
        },
      })
    },
    updateGrade(root, args, context) {
      return prisma.grades.update({
        where: {
          id: args.id,
        },
        data: {
          grade: args.grade,
          studentId: args.studentId,
          subjectId: args.subjectId,
        },
        include: {
          subject: {
            include: {
              study: true,
              planning: true,
            },
          },
          student: {
            include: {
              class: true,
            },
          },
        },
      })
    },
    deleteGrade(root, args, context) {
      return prisma.grades.delete({
        where: {
          id: args.id,
        },
        include: {
          subject: {
            include: {
              study: true,
              planning: true,
            },
          },
          student: {
            include: {
              class: true,
            },
          },
        },
      })
    },
  },
}

module.exports = grades