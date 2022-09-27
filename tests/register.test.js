const register = require('../controllers/register.js');

/*
*   validateUsername tests
*/

test('validateUsername: Empty email should return error', () => {
    expect( () => {
        register.validateUsername('')
    }).toThrow("Username field is empty");
});

test('validateUsername: Invalid email should return error', () => {
    expect( () => {
        register.validateUsername('johnsmith')
    }).toThrow("Username is not a valid email address");
});

test('validateUsername: Invalid email edgecase should return error', () => {
    expect( () => {
        register.validateUsername('johnsmith@@google.com')
    }).toThrow("Username is not a valid email address");
});

test('validateUsername: Valid email should return true', () => {
    expect( register.validateUsername('johnsmith@google.com') ).toBe(true);
});