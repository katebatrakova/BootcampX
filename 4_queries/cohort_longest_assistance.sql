SELECT cohorts.name, AVG(completed_at-started_at) as average_duration
FROM assistance_requests
JOIN students ON (student_id = students.id)
JOIN cohorts ON (students.cohort_id = cohorts.id)
GROUP BY cohorts.name
ORDER BY average_duration DESC
LIMIT 1;