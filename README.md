# README #

# This is the repository which generates mock apis using a static JSON file. The response of the apis generated are also specified in JSON file.

### How do I get set up? ###

* Summary of set up  :
npm install
* Configuration  :
Edit the api_contacts.json file. This is a nested JSON of the form {"root":..., "cruds":[{"method":...,"response":...},...], "children":[{a JSON object having same format as above i.e. {"root":..., "cruds":[...], "children":[...]}}]}
* Dependencies
* Deployment instructions  :
node index.js

### Contribution guidelines ###

* Contrbuters 
Ved Mulkalwar ved.mulkalwar@gmail.com 