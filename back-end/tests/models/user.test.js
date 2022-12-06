const Sequelize = require('sequelize');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User, sequelize } = require('../../models');

const unverifiedUser = {
    'firstName': 'Jake',
    'lastName': 'Paul',
    'email': 'jake.paul@vanderbilt.edu',
    'password': 'r$H7RY2@4&$vGpQ3Fe!K',
    'state': 'Unverified',
    'cash': true,
    'zelle': true,
    'venmo': false,
    'otherPaymentMethod': false,
    'modeOfCommunication': 'GroupMe',
    'phoneNumber': '6154206909',
    'groupMe': 'https://groupme.com/contact/83940935/QjgzriQe'
}

const verifiedUser = {
    'firstName': 'Jake',
    'lastName': 'Paul',
    'email': 'jake.paul@vanderbilt.edu',
    'password': 'r$H7RY2@4&$vGpQ3Fe!K',
    'state': 'Verified',
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
            const user = _.clone(unverifiedUser)
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
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: First name is a required field');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(unverifiedUser)
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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be non-unique', async () => {
        expect.assertions(2);
        try {
            const userOne = { firstName: 'Adam' };
            const userTwo = { firstName: 'Adam', email: 'adam@vanderbilt.edu' };
            _.defaults(userOne, unverifiedUser);
            _.defaults(userTwo, unverifiedUser);

            const createdOne = await User.create(userOne);
            delete userOne.password;
            expect(createdOne).toMatchObject(userOne);

            const createdTwo = await User.create(userTwo);
            delete userTwo.password;
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
            const user = _.clone(unverifiedUser)
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
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Last name is a required field');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(unverifiedUser)
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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('should not be less than 2 characters', async () => {
        expect.assertions(2);
        try {
            const user = { lastName: 'p' };
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            const userTwo = { lastName: 'Adam', email: 'adam@vanderbilt.edu' };
            _.defaults(userOne, unverifiedUser);
            _.defaults(userTwo, unverifiedUser);

            const createdOne = await User.create(userOne);
            delete userOne.password;
            expect(createdOne).toMatchObject(userOne);

            const createdTwo = await User.create(userTwo);
            delete userTwo.password;
            expect(createdTwo).toMatchObject(userTwo);
        } catch (e) {
            throw e;
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
            const user = _.clone(unverifiedUser)
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
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Email address is a required field');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(unverifiedUser)
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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Email address is not well formed');
        }
    });

    test('should be well formed', async () => {
        expect.assertions(1);
        try {
            const user = _.clone(unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('must have a vanderbilt.edu domain', async () => {
        expect.assertions(2);
        try {
            const user = { email: 'jake.paul@example.com' };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Please use a vanderbilt.edu email address to sign up');
        }
    });

    test('must be unique', async () => {
        expect.assertions(1);
        try {
            const userOne = _.clone(unverifiedUser);
            const userTwo = { email: 'jake.paul@vanderbilt.edu' };
            _.defaults(userTwo, unverifiedUser);

            await User.create(userOne);
            await User.create(userTwo);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.UniqueConstraintError);
        }
    });
});

describe('password', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(unverifiedUser)
            delete user.password;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Password is a required field');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { password: null };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Password is a required field');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(unverifiedUser)
            user.password = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Password is a required field');
        }
    });

    test('should not be less than 8 characters', async () => {
        expect.assertions(1);
        try {
            const user = { password: '6fj@ckG' };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
        }
    });

    test('should not be more than 32 characters', async () => {
        expect.assertions(2);
        try {
            const user = { password: 'u#V#G46!wzDkXfM2$q7o5oG^Gp^JyEx!#' };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Password must be between 8 to 32 characters long');
        }
    });

    test('must have at least 1 uppercase character', async () => {
        expect.assertions(2);
        try {
            const user = { password: '%$wg4$%58c$mo4$' };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Password must include at least one uppercase, one lowercase, one number and a special character');
        }
    });

    test('must have at least 1 lowercase character', async () => {
        expect.assertions(2);
        try {
            const user = { password: 'Y!K3G%Z9B$$&9JQ' };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Password must include at least one uppercase, one lowercase, one number and a special character');
        }
    });

    test('must have at least 1 number', async () => {
        expect.assertions(2);
        try {
            const user = { password: 'AP%^CGGY&JJfbKE' };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Password must include at least one uppercase, one lowercase, one number and a special character');
        }
    });

    test('must have at least 1 special character', async () => {
        expect.assertions(2);
        try {
            const user = { password: 'RHqzV2AMpG82mET' };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Password must include at least one uppercase, one lowercase, one number and a special character');
        }
    });

    test('can be non-unique', async () => {
        expect.assertions(2);
        try {
            const userOne = { password: 'iq%*G2h@sT37JG*' };
            const userTwo = { password: 'iq%*G2h@sT37JG*', email: 'adam@vanderbilt.edu' };
            _.defaults(userOne, unverifiedUser);
            _.defaults(userTwo, unverifiedUser);

            const createdOne = await User.create(userOne);
            delete userOne.password;
            expect(createdOne).toMatchObject(userOne);

            const createdTwo = await User.create(userTwo);
            delete userTwo.password;
            expect(createdTwo).toMatchObject(userTwo);
        } catch (e) {
            throw e;
        }
    });

    test('is not stored as plain-text', async () => {
        expect.assertions(1);
        try {
            const user = _.clone(unverifiedUser);

            const created = await User.create(user);
            expect(created.password).not.toEqual(user.password);
        } catch (e) {
            throw e;
        }
    });

    test('uses salts to randomize similar passwords', async () => {
        expect.assertions(3);
        try {
            const userOne = { password: 'D2t$av^^8fmqY36S@mdNm3T^m*%*3xeQ' };
            const userTwo = { password: 'D2t$av^^8fmqY36S@mdNm3T^m*%*3xeQ', email: 'adam@vanderbilt.edu' };
            _.defaults(userOne, unverifiedUser);
            _.defaults(userTwo, unverifiedUser);

            const createdOne = await User.create(userOne);
            delete userOne.password;
            expect(createdOne).toMatchObject(userOne);

            const createdTwo = await User.create(userTwo);
            delete userTwo.password;
            expect(createdTwo).toMatchObject(userTwo);

            expect(createdOne.password).not.toEqual(createdTwo.password);
        } catch (e) {
            throw e;
        }
    });

    test('does not change on updating another field', async () => {
        expect.assertions(1);
        try {
            const user = _.clone(unverifiedUser);

            let created = await User.create(user);
            const password = created.password;

            await created.update({ firstName: 'Bean' });
            expect(created.password).toEqual(password);
        } catch (e) {
            throw e;
        }
    });

    test('allows a strong password', async () => {
        expect.assertions(1);
        try {
            const user = { password: '5JHp4*QM*G5J^@F4e9tk%qJAseNWEjyW' };
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be compared to plain-text using bcrypt', async () => {
        expect.assertions(1);
        try {
            const user = _.clone(unverifiedUser);
            const created = await User.create(user);

            const match = await bcrypt.compare(user.password, created.password);

            expect(match).toBe(true);
        } catch (e) {
            throw e;
        }
    });

    test('remains hashed when changed', async () => {
        expect.assertions(4);
        try {
            const user = _.clone(unverifiedUser);
            const created = await User.create(user);

            expect(created.password).not.toEqual(user.password);

            const oldPasswordHash = created.password;
            const newPassword = '5JHp4*QM*G5J^@F4e9tk%qJAseNWEjyW';

            await created.update({ password: newPassword });

            expect(created.password).not.toEqual(oldPasswordHash);
            expect(created.password).not.toEqual(newPassword);

            const match = await bcrypt.compare(newPassword, created.password);
            expect(match).toBe(true);
        } catch (e) {
            throw e;
        }
    });
});

describe('state', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('is required', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(unverifiedUser);
            delete user.state;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: User must be in a valid state at all times');
        }
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { state: null };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: User must be in a valid state at all times');
        }
    });

    test('should not be undefined', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(unverifiedUser);
            user.state = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: User must be in a valid state at all times');
        }
    });

    test('can be unverified', async () => {
        expect.assertions(1);
        try {
            const user = _.clone(unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be verified', async () => {
        expect.assertions(1);
        try {
            const user = _.clone(verifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('must support at least one payment method', async () => {
        expect.assertions(2);
        try {
            const user = { cash: false, venmo: false, zelle: false, otherPaymentMethod: false };
            _.defaults(user, verifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('Validation error: Must support at least one payment method');
        }
    });
});

describe('cash', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { cash: null };
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be false', async () => {
        expect.assertions(1);
        try {
            const user = { cash: false };
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be 0 or 1', async () => {
        expect.assertions(1);
        try {
            const user = { cash: '1' };
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
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

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { venmo: null };
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be false', async () => {
        expect.assertions(1);
        try {
            const user = { venmo: false };
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be 0 or 1', async () => {
        expect.assertions(1);
        try {
            const user = { venmo: '1' };
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
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

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { zelle: null };
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be false', async () => {
        expect.assertions(1);
        try {
            const user = { zelle: false };
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be 0 or 1', async () => {
        expect.assertions(1);
        try {
            const user = { zelle: '1' };
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
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

    test('should not be null', async () => {
        expect.assertions(2);
        try {
            const user = { otherPaymentMethod: null };
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be false', async () => {
        expect.assertions(1);
        try {
            const user = { otherPaymentMethod: false };
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be 0 or 1', async () => {
        expect.assertions(1);
        try {
            const user = { otherPaymentMethod: '1' };
            _.defaults(user, unverifiedUser);

            const created = await User.create(user);
            delete user.password;
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

    test('is required for unverified users', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(unverifiedUser);
            delete user.modeOfCommunication;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Must specify a preferred mode of communication');
        }
    });

    test('is required for verified users', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(verifiedUser);
            delete user.modeOfCommunication;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Must specify a preferred mode of communication');
        }
    });

    test('should not be null for unverified users', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: null };
            _.defaults(user, unverifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Must specify a preferred mode of communication');
        }
    });

    test('should not be null for verified users', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: null };
            _.defaults(user, verifiedUser);

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Must specify a preferred mode of communication');
        }
    });

    test('should not be undefined for unverified users', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(unverifiedUser);
            user.modeOfCommunication = undefined;

            await User.create(user);
        } catch (e) {
            expect(e).toBeInstanceOf(Sequelize.ValidationError);
            expect(e.message).toBe('notNull Violation: Must specify a preferred mode of communication');
        }
    });

    test('should not be undefined for verified users', async () => {
        expect.assertions(2);
        try {
            const user = _.clone(verifiedUser);
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
            _.defaults(user, unverifiedUser);

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
            _.defaults(user, verifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be GroupMe', async () => {
        expect.assertions(1);
        try {
            const user = { modeOfCommunication: 'GroupMe' };
            _.defaults(user, verifiedUser);

            const created = await User.create(user);
            delete user.password;
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
            _.defaults(user, verifiedUser);
            delete user.phoneNumber;

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be undefined', async () => {
        expect.assertions(1);
        try {
            const user = { modeOfCommunication: 'GroupMe' };
            _.defaults(user, verifiedUser);
            user.phoneNumber = undefined;

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('is required when preferred mode of communication', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: 'Phone' };
            _.defaults(user, verifiedUser);
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
            _.defaults(user, verifiedUser);

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
            _.defaults(user, verifiedUser);
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
            _.defaults(user, verifiedUser);

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
            _.defaults(user, verifiedUser);

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
            _.defaults(user, verifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be formatted', async () => {
        expect.assertions(1);
        try {
            const user = { phoneNumber: '(615)-420-6909' };
            _.defaults(user, verifiedUser);

            const created = await User.create(user);
            delete user.password;
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
            _.defaults(user, verifiedUser);

            const created = await User.create(user);
            delete user.password;
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
            _.defaults(user, verifiedUser);
            delete user.groupMe;

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('can be undefined', async () => {
        expect.assertions(1);
        try {
            const user = { modeOfCommunication: 'Phone' };
            _.defaults(user, verifiedUser);
            user.groupMe = undefined;

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('is required when preferred mode of communication', async () => {
        expect.assertions(2);
        try {
            const user = { modeOfCommunication: 'GroupMe' };
            _.defaults(user, verifiedUser);
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
            _.defaults(user, verifiedUser);

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
            _.defaults(user, verifiedUser);
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
            _.defaults(user, verifiedUser);

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
            _.defaults(user, verifiedUser);

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
            _.defaults(user, verifiedUser);

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
            _.defaults(user, verifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });

    test('allows valid groupme.com URLs', async () => {
        expect.assertions(1);
        try {
            const user = { groupMe: 'https://groupme.com/contact/83940935/QjgzriQe' };
            _.defaults(user, verifiedUser);

            const created = await User.create(user);
            delete user.password;
            expect(created).toMatchObject(user);
        } catch (e) {
            throw e;
        }
    });
});