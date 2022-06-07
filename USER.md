# USER MODEL AND API'S

## MODEL

- Contains name,phone,email,password,tokens and \_id by default
- All attributes are required
- Model has no compound indexes
- email and phone must be unique
- standard email regex and phone number 10 digits
- model has 4 functions
- 1 pre save hook for hashing password and casefolding email
- 1 post remove hook for deleting related contacts
- 1 method to generate auth token
- 1 static to find user by credentials

## API'S

- SIGNUP USER => send all required attributes to signup and create user/token, receive both in response
- LOGIN USER => send email and password in body to receive user details and auth token in return
- LOGOUT USER => logout from particular device, hit the endpoint with the relevant auth token
- LOGOUT ALL => logout from all devices, hit endpoint with auth token
- PATCH USER => update user, send correct auth token and all the attributes in body which need to be updated
- DELETE USER => delete user, send correct auth token, user and all related contacts will be deleted
