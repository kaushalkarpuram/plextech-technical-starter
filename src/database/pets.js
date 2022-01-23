const Ajv = require("ajv/dist/jtd")
const ajv = new Ajv()


const pet_schema = {
    // TODO: Complete schema
        // - Utilize Pet Schema in spec
        // - Use Ajv JSON Type Definition: https://ajv.js.org/json-type-definition.html
};

const isValid = ajv.compile(pet_schema);

// TODO: Add more test data to work with
    // - Test data must be an array of 'Pet' objects
    // - Private data (should NOT be exported)
    // - Note that since we're storing our data in-memory (not persistent),
    //    this data will reset everytime the program restarts
const data = require("./sample_starter.json");


/* CONTROLLER FUNCTIONS */

/* Adds a new Pet object to 'data'. Validates input data
    and returns true if successful, otherwise false. */
exports.createPet = function (pet) {
    // checks 'pet' according to Ajv schema you defined above
    if (!isValid(pet)) {
        return false;
    }
    // TODO: Consider edge case

    data.push(pet);
    return true;
};

/* Returns Pet object as specified by 'id' */
exports.getPetById = function (id) {
    const pet = data.find(
        element => element.id === id
    );
    // TODO: Consider edge case

    return pet;
};

// TODO: complete filter functions
exports.getPetsByStatus = null;
exports.getPetsByTags = null;

/* Executes a full replace with the input pet data. Returns true 
    if successful, otherwise false  */
exports.updatePetById = function (pet) {
    // checks 'pet' according to Ajv schema you defined above
    if (!isValid(pet)) {
        return false;
    }

    // TODO: execute a full replace based on pet.id
}

/* Deletes Pet object as specified by 'id'. Returns true 
    if successful, otherwise false  */
exports.deletePet = function (id) {
    const petIndex = data.findIndex(
        element => element.id === id
    );
    // TODO: Consider edge case

    data.splice(petIndex, 1);
    return true;
};