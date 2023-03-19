// Connect to a mysql database
var mysql = require('mysql');

// CONNECT TO THE DATABASE efrei_app_gestion
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// DEFINITIONS
// Create a list of first names
var firstNames = [
  "John",
  "Jane",
  "Bob",
  "Alice",
  "Joe",
  "Mary",
  "Tom",
  "Sally",
  "Mike",
  "Sarah",
  "Bill",
  "Jill",
  "Steve",
  "Sue"
]

// Create a list of last names
var lastNames = [
  "Smith",
  "Jones",
  "Williams",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris"
]

// Create a list of class names such as "Master of Science in Computer Science"
var studies = [
  "Master of Science in Computer Science",
  "Master of Science in Mathematics",
  "Master of Science in Physics",
  "Master of Science in Chemistry",
  "Master of Science in Biology",
  "Master of Science in Psychology",
  "Master of Science in Economics",
  "Master of Science in Business Administration",
  "Master of Science in Marketing"
]

// Create a list of subjects
var subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Psychology",
  "Economics",
  "Business Administration",
  "Marketing"
]

// Create a list of classes that belong to a study such as "MSCS - GRP1"
var classes = [
  "MSCS - GRP1",
  "MSCS - GRP2",
  "MSCS - GRP3",
  "MSM - GRP1", 
  "MSM - GRP2",
  "MSM - GRP3",
  "MSP - GRP1",
  "MSP - GRP2",
  "MSP - GRP3",
  "MSC - GRP1",
  "MSC - GRP2",
  "MSC - GRP3",
  "MSB - GRP1",
  "MSB - GRP2",
  "MSB - GRP3",
  "MSM - GRP1",
  "MSM - GRP2",
  "MSM - GRP3",
  "MSMA - GRP1",
  "MSMA - GRP2",
  "MSMA - GRP3"
]

/**
 * Delete database then create it again with prisma
 */
async function clearDb() {
  // db name is efrei_app_gestion
  connection.query("DROP DATABASE IF EXISTS efrei_app_gestion", function (err, result) {
    if (err) throw err;
    console.log("Database deleted");
  });
  // Push the database using npm run prisma_db_push with promisify
  const { promisify } = require('util');
  const exec = promisify(require('child_process').exec);
  
  await exec('npm run prisma_db_push');
}

// Import all studies into the mysql database with the var "connection"
function importStudies() {
  // Select the database
  connection.query("USE efrei_app_gestion", function (err, result) {
    if (err) throw err;
    console.log("Database selected");
  });

  for (var i = 0; i < studies.length; i++) {
    connection.query("INSERT INTO studies (name) VALUES ('" + studies[i] + "')", function (err, result) {
      if (err) throw err;
    });
  }
  console.log("Studies inserted");
}

/**
 * Import all classes
 * Each class belongs to a study with studiesId
 */
function importClasses() {
  for (var i = 0; i < classes.length; i++) {
    var studyId = Math.floor(Math.random() * studies.length) + 1;
    connection.query("INSERT INTO classes (name, studiesId) VALUES ('" + classes[i] + "', '" + studyId + "')", function (err, result) {
      if (err) throw err;
    });
  }
  console.log("Classes inserted");
}

// Create a list of students with a random first name and last name and class
function importStudents() {
  for (var i = 0; i < 100; i++) {
    var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    var classId = Math.floor(Math.random() * classes.length) + 1;
    connection.query("INSERT INTO students (firstname, lastname, classId) VALUES ('" + firstName + "', '" + lastName + "', '" + classId + "')", function (err, result) {
      if (err) throw err;
    });
  }
  console.log("Students inserted");
}

function importTrainers() {
  for (var i = 0; i < 100; i++) {
    var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    connection.query("INSERT INTO trainers (firstname, lastname) VALUES ('" + firstName + "', '" + lastName + "')", function (err, result) {
      if (err) throw err;
    });
  }
  console.log("Trainers inserted");
}

/**
 * Import all subjects
 * Each subject belongs to a study with studyId
 */
function importSubjects() {
  for (var i = 0; i < subjects.length; i++) {
    var studyId = Math.floor(Math.random() * studies.length) + 1;
    connection.query("INSERT INTO subjects (name, studyId) VALUES ('" + subjects[i] + "', '" + studyId + "')", function (err, result) {
      if (err) throw err;
    });
  }
  console.log("Subjects inserted");
}

/**
 * Import all grades
 * Each grade belongs to a student with studentId and a subject with subjectId
 */
function importGrades() {
  for (var i = 0; i < 100; i++) {
    var studentId = Math.floor(Math.random() * 100) + 1;
    var subjectId = Math.floor(Math.random() * subjects.length) + 1;
    var grade = Math.floor(Math.random() * 20) + 1;
    connection.query("INSERT INTO grades (grade, studentId, subjectId) VALUES ('" + grade + "', '" + studentId + "', '" + subjectId + "')", function (err, result) {
      if (err) throw err;
    });
  }
  console.log("Grades inserted");
}

/**
 * Import all planning
 * Each planning belongs to a trainer with trainerId and a subject with subjectId
 * Each planning has a dateStart and a dateEnd with format YYYY-MM-DD
 */
function importPlanning() {
  for (var i = 0; i < 100; i++) {
    var trainerId = Math.floor(Math.random() * 100) + 1;
    var subjectId = Math.floor(Math.random() * subjects.length) + 1;
    var dateStart = new Date(Math.random() * (new Date().getTime() - new Date(2019, 0, 1).getTime()) + new Date(2019, 0, 1).getTime()).toISOString().split('T')[0];
    var dateEnd = new Date(Math.random() * (new Date().getTime() - new Date(2019, 0, 1).getTime()) + new Date(2019, 0, 1).getTime()).toISOString().split('T')[0];
    connection.query("INSERT INTO planning (dateStart, dateEnd, trainerId, subjectId) VALUES ('" + dateStart + "', '" + dateEnd + "', '" + trainerId + "', '" + subjectId + "')", function (err, result) {
      if (err) throw err;
    });
  }
  console.log("Planning inserted");
}

async function main() {
  await clearDb();
  importStudies();
  importClasses();
  importStudents();
  importTrainers();
  importSubjects();
  importGrades();
  importPlanning();
  console.log("Done");
}

main()