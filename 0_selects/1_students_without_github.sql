SELECT id, name, email, cohort_id 
FROM students 
WHERE Github IS NULL 
ORDER BY cohort_id;