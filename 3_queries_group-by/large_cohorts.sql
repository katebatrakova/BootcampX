SELECT cohorts.name as cohort_name, COUNT(*) as student_count
FROM students 
JOIN cohorts ON cohort_id=cohorts.id
GROUP BY cohorts.name
HAVING count(*)>=18
ORDER BY COUNT(*) ASC;