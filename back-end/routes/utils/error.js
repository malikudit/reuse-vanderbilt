const handleError = function(err, options) {
    if (err.name && err.name.includes('Sequelize')) {
        return {
            errors: err.errors.map(e => {
                return {
                    field: options.primaryKey ? 
                        e.path.replace('PRIMARY', options.primaryKey) : e.path,
                    value: e.value,
                    msg: options.primaryKey ? 
                        e.message.replace('PRIMARY', options.primaryKey) : e.message
                };
            })
        };
    }
};

module.exports = {
    handleError
};