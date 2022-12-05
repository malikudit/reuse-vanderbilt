const sequelize = require('./database');
const models = require('./assoc');

(async () => {
    if (process.env.NODE_ENV === 'production') {
        await sequelize.sync();
    } else if (process.env.NODE_ENV === 'dev') {
        await sequelize.sync({ force: true });
    }
})();

module.exports = {
    ...models,
    sequelize,
};
