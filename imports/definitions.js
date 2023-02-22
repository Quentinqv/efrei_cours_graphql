const typeDefs = `
type Classes {
  id: ID!
  createdAt: String!
  updatedAt: String!
  name: String!
  studiesId: Int!
  study: Studies
  students: [Students!]
}

type Grades {
  id: ID!
  createdAt: String!
  updatedAt: String!
  grade: Float!
  studentId: Int!
  subjectId: Int!
  student: Students
  subject: Subjects
}

type Students {
  id: ID!
  createdAt: String!
  updatedAt: String!
  lastname: String!
  firstname: String!
  classId: Int!
  class: Classes
  grades: [Grades!]
}

type Studies {
  id: ID!
  createdAt: String!
  updatedAt: String!
  name: String!
  classes: [Classes!]
  subjects: [Subjects!]
}

type Subjects {
  id: ID!
  createdAt: String!
  updatedAt: String!
  name: String!
  studyId: Int!
  study: Studies!
  grades: [Grades!]
  planning: [Planning!]
}

type Trainers {
  id: ID!
  createdAt: String!
  updatedAt: String!
  lastname: String!
  firstname: String!
  planning: [Planning!]
}

type Planning {
  id: ID!
  createdAt: String!
  updatedAt: String!
  dateStart: String!
  dateEnd: String!
  subjectId: Int!
  trainerId: Int!
  subject: Subjects
  trainer: Trainers
}

type Query {
  classes: [Classes!]
  grades: [Grades!]
  students: [Students!]
  studies: [Studies!]
  subjects: [Subjects!]
  trainers: [Trainers!]
  plannings: [Planning!]

  class(id: ID!): Classes
  grade(id: ID!): Grades
  student(id: ID!): Students
  study(id: ID!): Studies
  subject(id: ID!): Subjects
  trainer(id: ID!): Trainers
  planning(id: ID!): Planning
}

type Mutation {
  createClass(name: String!, studiesId: Int!): Classes!
  updateClass(id: ID!, name: String!, studiesId: Int!): Classes!
  deleteClass(id: ID!): Classes!

  createGrade(grade: Float!, studentId: Int!, subjectId: Int!): Grades!
  updateGrade(id: ID!, grade: Float!, studentId: Int!, subjectId: Int!): Grades!
  deleteGrade(id: ID!): Grades!

  createStudent(lastname: String!, firstname: String!, classId: Int!): Students!
  updateStudent(id: ID!, lastname: String!, firstname: String!, classId: Int!): Students!
  deleteStudent(id: ID!): Students!

  createStudy(name: String!): Studies!
  updateStudy(id: ID!, name: String!): Studies!
  deleteStudy(id: ID!): Studies!

  createSubject(name: String!, studyId: Int!): Subjects!
  updateSubject(id: ID!, name: String!, studyId: Int!): Subjects!
  deleteSubject(id: ID!): Subjects!

  createTrainer(lastname: String!, firstname: String!): Trainers!
  updateTrainer(id: ID!, lastname: String!, firstname: String!): Trainers!
  deleteTrainer(id: ID!): Trainers!

  createPlanning(dateStart: String!, dateEnd: String!, subjectId: Int!, trainerId: Int!): Planning!
  updatePlanning(id: ID!, dateStart: String!, dateEnd: String!, subjectId: Int!, trainerId: Int!): Planning!
  deletePlanning(id: ID!): Planning!
}
`

module.exports = typeDefs