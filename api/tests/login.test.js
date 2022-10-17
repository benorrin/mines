const login = require('../controllers/login.js');

/*
*   getUser tests
*/

test('getUser: Empty email should return error', () => {
    expect( () => {
        login.getUser('')
    }).toThrow("User not found");
});
