const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const grades = {
  query: {
    grades(root, args, context) {
      return prisma.grades.findMany()
    },
    grade(root, args, context) {
      return prisma.grades.findUnique({
        where: {
          id: args.id,
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
      })
    },
    deleteGrade(root, args, context) {
      return prisma.grades.delete({
        where: {
          id: args.id,
        },
      })
    },
  },
}

module.exports = grades