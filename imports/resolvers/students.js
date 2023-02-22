const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()

const students = {
  query: {
    students(root, args, context) {
      return prisma.students.findMany({
        include: {
          class: {
            include: {
              study: true,
            },
          },
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
        include: {
          class: {
            include: {
              study: true,
            },
          },
          grades: {
            include: {
              subject: true,
            },
          },
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
        include: {
          class: {
            include: {
              study: true,
            },
          },
          grades: {
            include: {
              subject: true,
            },
          },
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
        include: {
          class: {
            include: {
              study: true,
            },
          },
          grades: {
            include: {
              subject: true,
            },
          },
        },
      })
    },
    deleteStudent(root, args, context) {
      return prisma.students.delete({
        where: {
          id: args.id,
        },
        include: {
          class: {
            include: {
              study: true,
            },
          },
          grades: {
            include: {
              subject: true,
            },
          },
        },
      })
    }
  }
}

module.exports = students