const { Pool } = require('pg'); //Pool is the client

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect()

//The values that come from somewhere else:
const cohortName = process.argv[2];
// Store all potentially malicious values in an array
const values = [`%${cohortName}%`];


const queryString = `SELECT DISTINCT teachers.name as teacher_name, cohorts.name as cohort_name
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;`
// $ is a placeholder that represents where a value should go but can't as it might be malicious
//$1 and $2 placeholders will eventually get replaced with the actual data from the values array

// pool.query is a function that accepts an SQL query as a JavaScript string
pool.query(queryString, values)
  //queryString - safe ;  values - data that may be malicious
  //It will use the values  within the query but not run values as part of the query
  .then(res => {
    res.rows.forEach(row => {
      console.log(` ${row.cohort_name}: ${row.teacher_name}`);
    })
  }).catch(err => console.error('query error', err.stack));
