# PETSNAP 

Description

This is a social media app for all pet lovers. The users first need to create an account  and login to view the content. 
After the user is authenticated they have the options of : 
- Adding a new pet including( name, image, description, breed and hobbies).
- Searching for pets already in the database.
- Liking other posts.
- Commenting on their own posts as well as others.
- Replying to comments.
- Live chatting with other users. 

Installation
In order to start the app after opening up the code on your favorite editor.
The first step is to run rails:db migrate db:seed to get the database ready. 
Then run Rails S on the first terminal and npm start --prefix client on the second one. 


Technologies 

——————————————————————————

Frontend
Using React, PetSnap is a single page application. The user can click on the Add More button if they want to see more than 5 posts per page. 
Below is the React components tree: 

![image](https://user-images.githubusercontent.com/63808442/224517380-12e4c71d-db05-43e0-883e-77871efce823.png)

 
Other frontend technologies include :
Bootstrap, Matrial UI and react-share.


Backend

The backend was created using Ruby on Rails. 

API Endpoints : 

Name	API EndPoint	HTTP Verb	Purpose
Index	Users/	Get	Displays list of all users
Show	Users/:id	Get	Shows info about one user
Update	Animals/:id	Patch	Edits an animal
Destroy	Comments/:id	Delete	Delete a comment
Create	/signup	Create	Create a user
Destroy	/logout	Destroy	Logs out user
Create	/comments	Post	Post a comment
Create	/reviews/:comment_id/replies	Post	Adds a new Reply
Destroy	Comments/:comment_id	Delete	Delete a comment
Create	/update_comment_likes	Create	Like a comment

<img width="471" alt="image" src="https://user-images.githubusercontent.com/63808442/224517400-1e0340d8-2e52-42aa-a711-7be54b299d24.png">


Association Routes :

<img width="468" alt="image" src="https://user-images.githubusercontent.com/63808442/224517414-b8bff3dc-dc18-4035-a55c-c483bf49af84.png">


Credits
Klajdo Qasolli - https://github.com/KlajdoQ/PawBook
