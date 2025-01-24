# DevTinder APIs

# Auth router
- POST /signup
- POST /login  
- POST /logout


# profile router
- GET /profile/view -   to get the profile of login user(viewing profile)
- PATCH /profile/edit   -        to update the profile
- PATCH/profile/password  -      to change the password (forgot password)

 

# connection request router

// on main page while scrolling - if i swipe left or right

- POST /request/send/interested/:userId  - right swipe (like api- tinder)
- POST /request/send/ignored/:userId  - left swipe  (like api- pass)


// api for when user will get connection request from other user

- POST - /request/review/accepted/:requestId  - request accepted
- POST - /request/review/rejected/:requestId  - request rejected


# user router

# below APIs are for users connections and recived request

- GET /user/connections      - as user who are in my connections 
- GET /user/request/received         
                               - as user other people who has send me   
                               connection request  (recieved requests)
# Feed API 

GET /user/feed - it gets you the profiles of other users on platform













# Auth router
- POST /signup
- POST /login  
- POST /logout


# profile router
- GET /profile/view 
- PATCH /profile/edit  
- PATCH /profile/password  


# Connection request router

- POST /request/send/interested/:userId 
- POST /request/send/ignored/:userId 

- i can create one api as logic of writting both api is same and above - - both api has only one different thing   - that is intersetd and ignored
- so status can either be interesed or ignored
- so we don't have to make two different APIs for interested and 
 - ignored the connection

- POST /request/send/:status/:userId  



- POST /request/review/accepted/:requestId  
- POST /request/review/rejected/:requestId  

- i can create one api as logic of writting both api is same and above  - both api has only one different thing   
- that is intersetd and ignored
- so status can either be accepted or rejected
- so we don't have to make two different APIs for accepting and 
 - rejecting the connection

- POST /request/review/:status/:requestId  



# User router

- GET /user/connections     
- GET /user/request       
- GET /user/feed     




# pagination

- /feed?page=1&limit=10 - first 10 users (from 1 to 10)

- /feed?page=2&limit=10 - next 10 users (from 11 to 20)

- /feed?page=3&limit=10 - next 10 users (from 21 to 30)

- there are two imporatant functions in mongoDB

- .skip() - how many documents do you skip from the first/starting
- .limit() - how many documents do you  want



- /feed?page=1&limit=10 - .skip(0) & .limit(10)

- /feed?page=2&limit=10 - .skip(10) & .limit(10)

- /feed?page=3&limit=10 - .skip(20) & .limit(10)


- "/feed?page=1&limit=10"

- to read this query we use 
- req.qurey.page 
- now this 1 and 10 will be in string formate 
- covert that string into number so we can pass those numbers 
- into skip() & limit() function
- here's how you can convert those numbers from string to int
- parseInt(req.params.page )

- const page = parseInt(req.params.page ) || 1;
- const page = parseInt(req.params.limit ) || 10;

- if user just calling  /feed then we should return 
- page 1 and first 10 users
- that's why we have return or condtion over there 
- and if user request   "/feed?page=2&limit=100"
- then will return the page 2 with 100 users

- if limit is not passed then we will assume that limit is 10
- and if page number is not passed then we will assume that 
- user is requesting the page 1 that's how we are doing it

- skip formula 
- (page - 1)*limit

