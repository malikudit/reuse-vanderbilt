const Sequelize = require('sequelize');
const _ = require('lodash');

const { User, sequelize } = require('../../models');

const defaultUser = {
    'firstName': 'Jake',
    'lastName': 'Paul',
    'userName': 'jakepaul123',
    'email': 'jake.paul@vanderbilt.edu',
    'cash': true,
    'zelle': true,
    'venmo': false,
    'otherPaymentMethod': false,
    'modeOfCommunication': 'GroupMe',
    'phoneNumber': '6154206909',
    'groupMe': 'https://groupme.com/contact/83940935/QjgzriQe'
}

beforeAll(async () => {
    sequelize.options.logging = false;
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('firstName', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            delete user.firstName;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: First name is a required field');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { firstName: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: First name is a required field');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            user.firstName = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: First name is a required field');
        }
    });

    test('should not be integer', async () => {
        expect.assertions(2);
        try {
            const user = { firstName: 1234 };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: First name must be alphabetical');
        }
    });

    test('should not be boolean', async () => {
        expect.assertions(2);
        try {
            const user = { firstName: true };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: First name must be alphabetical');
        }
    });

    test('should not be less than 2 characters', async () => {
        expect.assertions(2);
        try {
            const user = { firstName: 'p' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: First name must be between 2 to 32 characters long');
        }
    });

    test('should not be more than 32 characters', async () => {
        expect.assertions(2);
        try {
            const user = { firstName: 'AlfredsThaddeusCranezzPennyworthh' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: First name must be between 2 to 32 characters long');
        }
    });

    test('should not contain special characters', async () => {
        expect.assertions(2);
        try {
            const user = { firstName: 'Alfred@Pennyworthh' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: First name must be alphabetical');
        }
    });

    test('should not contain spaces', async () => {
        expect.assertions(2);
        try {
            const user = { firstName: 'Alfred Pennyworthh' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: First name must be alphabetical');
        }
    });

    test('is alphabetical', async () => {
        expect.assertions(1);
        try {
            const user = { firstName: 'Adam' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be non-unique', async () => {
        expect.assertions(2);
        try {
            const userOne = { firstName: 'Adam' };
            const userTwo = { firstName: 'Adam', userName: 'adam123', email: 'adam@vanderbilt.edu' };
            _.defaults(userOne, defaultUser);
            _.defaults(userTwo, defaultUser);

            const createdOne = await User.create(userOne);
            delete userOne.userName;
            expect(createdOne).toMatchObject(userOne);

            const createdTwo = await User.create(userTwo);
            delete userTwo.userName;
            expect(createdTwo).toMatchObject(userTwo);
        } catch (e) {
            throw e;
        }
    });
});

describe('lastName', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            delete user.lastName;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Last name is a required field');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { lastName: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Last name is a required field');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            user.lastName = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Last name is a required field');
        }
    });

    test('should not be integer', async () => {
        expect.assertions(2);
        try {
            const user = { lastName: 1234 };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Last name must be alphabetical');
        }
    });

    test('should not be boolean', async () => {
        expect.assertions(2);
        try {
            const user = { lastName: true };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Last name must be alphabetical');
        }
    });

    test('should not contain special characters', async () => {
        expect.assertions(2);
        try {
            const user = { lastName: 'Alfred@Pennyworthh' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Last name must be alphabetical');
        }
    });

    test('should not contain spaces', async () => {
        expect.assertions(2);
        try {
            const user = { lastName: 'Alfred Pennyworthh' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Last name must be alphabetical');
        }
    });

    test('is alphabetical', async () => {
        expect.assertions(1);
        try {
            const user = { lastName: 'Adam' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('should not be less than 2 characters', async () => {
        expect.assertions(2);
        try {
            const user = { lastName: 'p' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Last name must be between 2 to 32 characters long');
        }
    });

    test('should not be more than 32 characters', async () => {
        expect.assertions(2);
        try {
            const user = { lastName: 'AlfredsThaddeusCranezzPennyworthh' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Last name must be between 2 to 32 characters long');
        }
    });

    test('can be non-unique', async () => {
        expect.assertions(2);
        try {
            const userOne = { lastName: 'Adam' };
            const userTwo = { lastName: 'Adam', userName: 'adam123', email: 'adam@vanderbilt.edu' };
            _.defaults(userOne, defaultUser);
            _.defaults(userTwo, defaultUser);

            const createdOne = await User.create(userOne);
            delete userOne.userName;
            expect(createdOne).toMatchObject(userOne);

            const createdTwo = await User.create(userTwo);
            delete userTwo.userName;
            expect(createdTwo).toMatchObject(userTwo);
        } catch (e) {
            throw e;
        }
    });
});

describe('userName', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            delete user.userName;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Username is a required field');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { userName: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Username is a required field');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            user.userName = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Username is a required field');
        }
    });

    test('should not be boolean', async () => {
        expect.assertions(2);
        try {
            const user = { userName: true };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Username must only contain alphabets and numbers');
        }
    });

    test('should not contain special characters', async () => {
        expect.assertions(2);
        try {
            const user = { userName: 'Alfred@Pennyworthh123' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Username must only contain alphabets and numbers');
        }
    });

    test('should not contain spaces', async () => {
        expect.assertions(2);
        try {
            const user = { userName: 'Alfred Pennyworthh 123' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Username must only contain alphabets and numbers');
        }
    });

    test('is alphanumeric', async () => {
        expect.assertions(1);
        try {
            const user = { userName: 'adam123' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('should not be less than 4 characters', async () => {
        expect.assertions(2);
        try {
            const user = { userName: 'md5' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Username must be between 4 to 32 characters long');
        }
    });

    test('should not be more than 32 characters', async () => {
        expect.assertions(2);
        try {
            const user = { userName: 'AlfredThadeus1Cranez5Pennyworth10' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Username must be between 4 to 32 characters long');
        }
    });

    test('must be unique', async () => {
        expect.assertions(1);
        try {
            const userOne = _.clone(defaultUser);
            const userTwo = { userName: 'jakepaul123', email: 'adam@vanderbilt.edu' };
            _.defaults(userTwo, defaultUser);

            await User.create(userOne);
            await User.create(userTwo);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.UniqueConstraintError);
        }
    });
});

describe('email', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            delete user.email;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Email address is a required field');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { email: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Email address is a required field');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            user.email = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Email address is a required field');
        }
    });

    test('should contain a single @ character', async () => {
        expect.assertions(2);
        try {
            const user = { email: 'jake@paul@vanderbilt.edu' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Email address is not well formed');
        }
    });

    test('should not contain invalid characters', async () => {
        expect.assertions(2);
        try {
            const user = { email: 'Abc..123@vanderbilt.edu' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Email address is not well formed');
        }
    });

    test('should be well formed', async () => {
        expect.assertions(1);
        try {
            const user = _.clone(defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('must have a vanderbilt.edu domain', async () => {
        expect.assertions(2);
        try {
            const user = { email: 'jake.paul@example.com' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Please use a vanderbilt.edu email address to sign up');
        }
    });

    test('must be unique', async () => {
        expect.assertions(1);
        try {
            const userOne = _.clone(defaultUser);
            const userTwo = { userName: 'adam123', email: 'jake.paul@vanderbilt.edu' };
            _.defaults(userTwo, defaultUser);

            await User.create(userOne);
            await User.create(userTwo);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.UniqueConstraintError);
        }
    });
});

describe('cash', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            delete user.cash;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Cash is a supported payment type');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { cash: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Cash is a supported payment type');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            user.cash = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Cash is a supported payment type');
        }
    });

    test('should be a well formed boolean', async () => {
        expect.assertions(2);
        try {
            const user = { cash: 'True' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Cash is not a well formed boolean value');
        }
    });

    test('can be true', async () => {
        expect.assertions(1);
        try {
            const user = { cash: true };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be false', async () => {
        expect.assertions(1);
        try {
            const user = { cash: false };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be 0 or 1', async () => {
        expect.assertions(1);
        try {
            const user = { cash: '1' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });
});

describe('venmo', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            delete user.venmo;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Venmo is a supported payment type');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { venmo: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Venmo is a supported payment type');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            user.venmo = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Venmo is a supported payment type');
        }
    });

    test('should be a well formed boolean', async () => {
        expect.assertions(2);
        try {
            const user = { venmo: 'True' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Venmo is not a well formed boolean value');
        }
    });

    test('can be true', async () => {
        expect.assertions(1);
        try {
            const user = { venmo: true };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be false', async () => {
        expect.assertions(1);
        try {
            const user = { venmo: false };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be 0 or 1', async () => {
        expect.assertions(1);
        try {
            const user = { venmo: '1' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });
});

describe('zelle', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            delete user.zelle;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Zelle is a supported payment type');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { zelle: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Zelle is a supported payment type');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            user.zelle = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Zelle is a supported payment type');
        }
    });

    test('should be a well formed boolean', async () => {
        expect.assertions(2);
        try {
            const user = { zelle: 'True' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Zelle is not a well formed boolean value');
        }
    });

    test('can be true', async () => {
        expect.assertions(1);
        try {
            const user = { zelle: true };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be false', async () => {
        expect.assertions(1);
        try {
            const user = { zelle: false };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be 0 or 1', async () => {
        expect.assertions(1);
        try {
            const user = { zelle: '1' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });
});

describe('otherPaymentMethod', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            delete user.otherPaymentMethod;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Other payment methods are supported');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { otherPaymentMethod: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Other payment methods are supported');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            user.otherPaymentMethod = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: You must specify whether Other payment methods are supported');
        }
    });

    test('should be a well formed boolean', async () => {
        expect.assertions(2);
        try {
            const user = { otherPaymentMethod: 'True' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Other payment method is not a well formed boolean value');
        }
    });

    test('can be true', async () => {
        expect.assertions(1);
        try {
            const user = { otherPaymentMethod: true };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be false', async () => {
        expect.assertions(1);
        try {
            const user = { otherPaymentMethod: false };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be 0 or 1', async () => {
        expect.assertions(1);
        try {
            const user = { otherPaymentMethod: '1' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });
});

describe('modeOfCommunication', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            delete user.modeOfCommunication;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Must specify a preferred mode of communication');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Must specify a preferred mode of communication');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(defaultUser)
            user.modeOfCommunication = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Must specify a preferred mode of communication');
        }
    });

    test('should be either Phone or GroupMe', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: 'Text' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Preferred mode of communication must be either Phone or GroupMe');
        }
    });

    test('can be Phone', async () => {
        expect.assertions(1);
        try {
            const user = { modeOfCommunication: 'Phone' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be GroupMe', async () => {
        expect.assertions(1);
        try {
            const user = { modeOfCommunication: 'GroupMe' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });
});

describe('phoneNumber', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is not required', async () => {
        expect.assertions(1);
        try {
            const user = { modeOfCommunication: 'GroupMe' };
            _.defaults(user, defaultUser);
            delete user.phoneNumber;

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be undefined', async () => {
        expect.assertions(1);
        try {
            const user = { modeOfCommunication: 'GroupMe' };
            _.defaults(user, defaultUser);
            user.phoneNumber = undefined;

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('is required when preferred mode of communication', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: 'Phone' };
            _.defaults(user, defaultUser);
            delete user.phoneNumber;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: A phone number is required if Phone is the preferred means of communication');
        }
    });

    test('should not be null when preferred', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: 'Phone', phoneNumber: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: A phone number is required if Phone is the preferred means of communication');
        }
    });

    test('should not be undefined when preferred', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: 'Phone' };
            _.defaults(user, defaultUser);
            user.phoneNumber = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: A phone number is required if Phone is the preferred means of communication');
        }
    });

    test('must be a valid phone number', async () => {
        expect.assertions(2);
        try {
            const user = { phoneNumber: '115-420-690' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: A valid US phone number is required');
        }
    });

    test('must be a valid US phone number ', async () => {
        expect.assertions(2);
        try {
            const user = { phoneNumber: '115-420-6909' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: A valid US phone number is required');
        }
    });

    test('can be unformatted', async () => {
        expect.assertions(1);
        try {
            const user = { phoneNumber: '6154206909' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;

            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be formatted', async () => {
        expect.assertions(1);
        try {
            const user = { phoneNumber: '(615)-420-6909' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            user.phoneNumber = '6154206909'; // Sequelize normalizes phone numbers before storing them

            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can have the country code', async () => {
        expect.assertions(1);
        try {
            const user = { phoneNumber: '+1-(615)-420-6909' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;
            user.phoneNumber = '6154206909'; // Sequelize normalizes phone numbers before storing them

            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });
});

describe('groupMe', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is not required', async () => {
        expect.assertions(1);
        try {
            const user = { modeOfCommunication: 'Phone' };
            _.defaults(user, defaultUser);
            delete user.groupMe;

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be undefined', async () => {
        expect.assertions(1);
        try {
            const user = { modeOfCommunication: 'Phone' };
            _.defaults(user, defaultUser);
            user.groupMe = undefined;

            const created = await User.create(user);
            delete user.userName;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('is required when preferred mode of communication', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: 'GroupMe' };
            _.defaults(user, defaultUser);
            delete user.groupMe;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: A GroupMe URL is required if GroupMe is the preferred means of communication');
        }
    });

    test('should not be null when preferred', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: 'GroupMe', groupMe: null };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: A GroupMe URL is required if GroupMe is the preferred means of communication');
        }
    });

    test('should not be undefined when preferred', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: 'GroupMe' };
            _.defaults(user, defaultUser);
            user.groupMe = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: A GroupMe URL is required if GroupMe is the preferred means of communication');
        }
    });

    test('must be a valid URL', async () => {
        expect.assertions(2);
        try {
            const user = { groupMe: 'https://groupme' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: The provided URL must be from groupme.com and use https');
        }
    });

    test('must be a valid groupme.com URL', async () => {
        expect.assertions(2);
        try {
            const user = { groupMe: 'https://google.com/contact/83940935/QjgzriQe' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: The provided URL must be from groupme.com and use https');
        }
    });

    test('must use https', async () => {
        expect.assertions(2);
        try {
            const user = { groupMe: 'http://groupme.com/contact/83940935/QjgzriQe' };
            _.defaults(user, defaultUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: The provided URL must be from groupme.com and use https');
        }
    });

    test('can be www.groupme.com', async () => {
        expect.assertions(1);
        try {
            const user = { groupMe: 'https://www.groupme.com/contact/83940935/QjgzriQe' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;

            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('allows valid groupme.com URLs', async () => {
        expect.assertions(1);
        try {
            const user = { groupMe: 'https://groupme.com/contact/83940935/QjgzriQe' };
            _.defaults(user, defaultUser);

            const created = await User.create(user);
            delete user.userName;

            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });
});