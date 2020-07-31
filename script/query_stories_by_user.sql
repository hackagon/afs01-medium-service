SELECT
  *
FROM user
LEFT JOIN story ON user.id = story.user_id 
WHERE
  user.id = <%- user_id %>;