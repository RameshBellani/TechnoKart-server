1. Register a User
##Method: POST
URL: http://localhost:5000/api/auth/register
Body: (JSON)
json
Copy code
{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}

2. Login a User
##Method: POST
URL: http://localhost:5000/api/auth/login
Body: (JSON)
json
Copy code
{
  "username": "admin",
  "password": "admin123"
}


3. Create a Blog Post
##Method: POST
URL: http://localhost:5000/api/posts
Headers:
Authorization: Bearer {your_token}
Body: (JSON)
json
Copy code
{
  "title": "First Post",
  "content": "Content of the first post",
  "status": "published"
}


4. Get All Blog Posts
##Method: GET
URL: http://localhost:5000/api/posts

5. Get a Blog Post by ID
##Method: GET
URL: http://localhost:5000/api/posts/{post_id}


6. Update a Blog Post
##Method: PUT
URL: http://localhost:5000/api/posts/{post_id}
Headers:
Authorization: Bearer {your_token}
Body: (JSON)
json
Copy code
{
  "title": "Updated Title",
  "content": "Updated Content",
  "status": "draft"
}


7. Delete a Blog Post
##Method: DELETE
URL: http://localhost:5000/api/posts/{post_id}
Headers:
Authorization: Bearer {your_token}

8. Create a Comment
##Method: POST
URL: http://localhost:5000/api/comments
Headers:
Authorization: Bearer {your_token}
Body: (JSON)
json
Copy code
{
  "content": "This is a comment",
  "postId": 1
}


9. Get Comments for a Blog Post
##Method: GET
URL: http://localhost:5000/api/comments/post/{post_id}

10. Approve a Comment
Method: PUT
URL: http://localhost:5000/api/comments/{comment_id}/approve
Headers:
Authorization: Bearer {your_token}


11. Delete a Comment
Method: DELETE
URL: http://localhost:5000/api/comments/{comment_id}
Headers:
Authorization: Bearer {your_token}
Example Workflow in Thunder Client:
Register an Admin User:

##Go to Thunder Client.
Create a new request.
Set method to POST and URL to http://localhost:5000/api/auth/register.
In the Body tab, select JSON and enter the JSON data for registration.
Send the request.
Login as Admin:

##Create a new request.
Set method to POST and URL to http://localhost:5000/api/auth/login.
In the Body tab, select JSON and enter the JSON data for login.
Send the request.
Copy the token from the response.
Create a Blog Post:

Create a new request.
Set method to POST and URL to http://localhost:5000/api/posts.
In the Headers tab, add Authorization with the value Bearer {your_token}.
In the Body tab, select JSON and enter the JSON data for creating a post.
Send the request.
Get All Blog Posts:

Create a new request.
Set method to GET and URL to http://localhost:5000/api/posts.
Send the request.
