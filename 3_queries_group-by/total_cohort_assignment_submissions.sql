SELECT cohorts.name as cohort_name, COUNT( assignment_submissions.*) as total_submissions
FROM students
JOIN cohorts ON cohort_id=cohorts.id
JOIN assignment_submissions ON students.id = assignment_submissions.student_id

GROUP BY cohorts.name
ORDER BY COUNT(*) DESC;