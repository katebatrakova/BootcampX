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
const cohortLimit = process.argv[3] || 5;
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`, cohortLimit];

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2; 
`;
// $ is a placeholder that represents where a value should go but can't as it might be malicious
//$1 and $2 placeholders will eventually get replaced with the actual data from the values array


// pool.query is a function that accepts an SQL query as a JavaScript string
pool.query(queryString, values)
  //queryString - safe ;  values - data that may be malicious
  //It will use the values  within the query but  not run values as part of the query
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  }).catch(err => console.error('query error', err.stack));








