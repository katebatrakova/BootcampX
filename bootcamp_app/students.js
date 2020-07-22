const { Pool } = require('pg'); //Pool is the client

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect()

const cohortName = process.argv[2];
const cohortLimit = process.argv[3];
// const [, , cohortName, cohortLimit] = process.argv
// console.log(cohortName, '--- cohortName', cohortLimit, ' --- cohortLimit' )


// pool.query is a function that accepts an SQL query as a JavaScript string
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${cohortName}%'
LIMIT ${cohortLimit || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));








