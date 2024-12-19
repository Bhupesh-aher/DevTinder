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