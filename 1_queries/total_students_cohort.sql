SELECT COUNT (name)
FROM students 
WHERE cohort_id=1 OR cohort_id=2 OR cohort_id=3;

SELECT students.name,  cohorts.name, students.start_date as student_start_date, cohorts.start_date as cohort_start_date
FROM students 
INNER JOIN cohorts ON cohort_id=cohorts.id
WHERE students.start_date != cohorts.start_date
ORDER BY cohort_start_date;