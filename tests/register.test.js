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


/*
*   validatePassword tests
*/

test('validatePassword: Empty password should return error', () => {
    expect( () => {
        register.validatePassword('')
    }).toThrow("Password field is empty");
});

test('validatePassword: Password less than 8 characters should return error', () => {
    expect( () => {
        register.validatePassword('abcdefg')
    }).toThrow("Password must be more than 8 characters");
});

test('validatePassword: Password without number should return error', () => {
    expect( () => {
        register.validatePassword('johnsmith!')
    }).toThrow("Password must contain a number");
});

test('validatePassword: Password without symbol should return error', () => {
    expect( () => {
        register.validatePassword('johnsmith1')
    }).toThrow("Password must contain a symbol");
});

test('validatePassword: Valid password should return true', () => {
    expect( register.validatePassword('johnsmith1#') ).toBe(true);
});

test('validatePassword: Valid password of 8 characters should return true', () => {
    expect( register.validatePassword('johnsm1#') ).toBe(true);
});