# PlexTech Take-Home Technical Interview
Starter Code for the take-home portion of the PlexTech Technical Interview

API Spec: https://app.swaggerhub.com/apis-docs/AkshatJain1/Petstore

# Server Installation Instructions
1. Make sure up-to-date versions of Node and NPM are installed.
2. Run `npm install` in project directory 
3. Run `npm run dev` to run the server with Nodemon (hot-reload)

# Test Installation Instructions
1. Make sure at least Python 3.7 is installed
2. Run `pip install -r requirements.txt` in the `test` folder
3. Run `npm test` from the base folder. Starter test should succeed if the server is running

# Recommended Workflow
1. Define Pet Object Schema in `src/database/pets.js`
2. Add more test data in `src/database/pets.js`
3. Complete the controller functions in `src/database/pets.js`
4. Specify route definitions in `src/index.js` using the controller functions