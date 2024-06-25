# Blog-Web-MERN

Step 1 -
  cd to frontend
  enter the command npm i - for installing all the dependencies

Step 2 - frontend (setting up env val=irables)
  create a env folder in the forntend, paste the below variable and pass the backend URL link
  REACT_APP_AUTH_URL
  REACT_APP_BASE_URL

  Step 2.1 - in the terminal write commend - npm start - for starting the react server

Step 3 - 
  cd to backend
  enter the command npm i - for installing all the dependencies
  Step 1.1 - after installing the dependencies, command npm start

Step 4 - backend (setting up env val=irables)
  create a env folder in the backend, paste the below variable
  DATABASE_URI
  JWT_KEY_KEY

    Step 4.1 - in the terminal write commend - npm start - for starting the node server

--------- This are the only steps required for running the project ---------

------- Mistakes from my side -------

1. Forget to ask the question before starting the interview is that. Do i need to upload the imnages in blog, as the schemas were not defined.
    - If there were images then the flow of the images would be.
    - I will use the library called multer for uploading images.
    - At the time of creating the blog I would create a uplaod image function and  first convert the name with unique strgin and  save the images in the folder and than take the url and pass it to the url schema of blog. I would also create a unique name for the iamge so that i can edit and delete it.
    - In Node side at the time of edit i would check if there is file in the req.file or just the body data, if there were any file i would edit it using the image id, same for the delete - but in delete i don't need to pass the file as the image id would be enough  
    - In react side i wold take the image and in the time of edit or delete i would pass in the id in the file objecet so that i can easily edit or delee it

2. Forget to implement express-validator in the post apis.
   
3. User Profile
   - Here i have created 2 seprate routes api/user and api/blog and in react side i have created the interceptor (baseUrl) in the route for api/blog. so beacuse of that the getuser api will not work as the token is passed with the api/blog apis and not in the /api/user.
   - To overcome this situation I have user data in the localsotrage along with the token, so i am using that data as a user detail in the getProfile page.
