const { Pool } = require('pg'); //Pool is the client

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect()

const cohortName = process.argv[2];
const query = `SELECT DISTINCT teachers.name as teacher_name, cohorts.name as cohort_name
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = '${cohortName}'
ORDER BY teachers.name;`


pool.query(query)
.then(res => {
  res.rows.forEach(row => {
    console.log(` ${row.cohort_name}: ${row.teacher_name}`);
  })
}).catch(err => console.error('query error', err.stack));
