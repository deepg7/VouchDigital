# CONTACT MODEL AND API'S

## MODEL

- Contains name phone and userID
- All attributes are required
- Model has 1 compound index => userID,phone
- phone must be unique
- regex phone number 10 digits

## API'S

- Create a contact => send in the phone number and name of the contact and get the contact in return on success
- Create bulk => send array of contacts and get this array return on success
- get by id => send the ID of the contact in the route parameter and get contact on success
- get many => send ?page= query and get 5 contacts accordingly on success
- get match => send ?name=&?phone= or either one of them and get contacts in return
- update => send ID in route parameter and get updated contact in return
- delete => send ID in route parameter and get contact on success
