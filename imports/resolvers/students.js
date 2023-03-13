const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const students = {
  query: {
    students(root, args, context) {
      return prisma.students.findMany({
        include: {
          grades: {
            include: {
              subject: true,
            },
          },
        },
      })
    },
    student(root, args, context) {
      return prisma.students.findUnique({
        where: {
          id: args.id,
        },
      })
    }
  },
  mutations: {
    createStudent(root, args, context) {
      return prisma.students.create({
        data: {
          name: args.name,
          classId: args.classId,
        },
      })
    },
    updateStudent(root, args, context) {
      return prisma.students.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          classId: args.classId,
        },
      })
    },
    deleteStudent(root, args, context) {
      return prisma.students.delete({
        where: {
          id: parseInt(args.id),
        },
      })
    }
  }
}

module.exports = students