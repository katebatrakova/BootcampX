SELECT  cohorts.name, SUM(completed_at-started_at) as total_assistance_duration
FROM assistance_requests
JOIN students ON (student_id = students.id)
JOIN cohorts ON (students.cohort_id = cohorts.id)
GROUP BY cohorts.name
ORDER BY total_assistance_duration;