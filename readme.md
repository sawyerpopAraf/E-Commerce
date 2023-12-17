[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/PSnw0W2M)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12967767&assignment_repo_type=AssignmentRepo)

![](http://143.42.108.232/pvt/Noroff-64.png)
# Noroff
## Back-end Development Year 1
### EP - Course Assignment

Startup code for Noroff back-end development 1 - EP course (e-commerce).

Instruction for the course assignment is in the LMS (Moodle) system of Noroff.
[https://lms.noroff.no](https://lms.noroff.no)

![](http://143.42.108.232/pvt/important.png)

You will not be able to make any submission after the deadline of the course assignment. Make sure to make all your commit **BEFORE** the deadline

![](http://143.42.108.232/pvt/help_small.png)

If you are unsure of any instructions for the course assignment, contact out to your teacher on **Microsoft Teams**.

**REMEMBER** Your Moodle LMS submission must have your repository link **AND** your Github username in the text file.

---env file example
HOST = "localhost"
ADMIN_USERNAME = "ProjectAdmin"
ADMIN_PASSWORD = "Yourpassword"
DATABASE_NAME = "Ecommerce"
DIALECT = "mysql"
PORT = "3000"
TOKEN_SECRET=JWT TOKEN SECRET

Instruction:
--Run 'NPM I INSTALL' 

--Create JWT token secret token and inclued it in env file. 

--Create a database on Mysql called "Ecommerce" .

-- You can use either localhost:3000/doc (Swagger) or Postman to populate initial data. You must send the Admin's password in the body when sending a request due to securtiry reason. 
  
   NB:To login with /doc(Swagger), you only need to apply the 'login' (username or email) and 'password' to the body of the request. Ignore the 'email' parameter.

Front-end:
Users : Clicking the button that indicates editing the role will change the user's status to either 'User' or 'Admin'.
Products: Products and Users are both soft deleted, meaning you can reactivate them after deletion.

Nodejs version:
v18.16.0


REFERENCES:
1.unique generated order number 
https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

2.JWT token in Front-end
https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id

3.Transaction in Sequelize (used for checkout function)
https://www.ultimateakash.com/blog-details/IiwzPGAKYAo=/How-to-implement-Transactions-in-Sequelize-&-Node.Js-(Express)

4. The creation of this project was mainly inspired by two of my earlier projects and study materials from Noroff.
https://github.com/sawyerpopAraf/Database-job (mostly frontend)
https://github.com/sawyerpopAraf/APIbackend-job (mostly backend)

I have other codes that are created or inspired by helped of AI , since i have only the screen shot of these references , i will include these on my reflection report , under the Challenges.