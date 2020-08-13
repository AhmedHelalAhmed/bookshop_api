const Joi = require('joi');

async function validate(user, callback) {
    const user_schema = Joi.object({
        name: Joi.string().min(7).max(50).pattern(new RegExp('[ ]')).required(),
        email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z]\\w{3,32}$')).required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    });
    try {
        await user_schema.validateAsync(user);
        callback(null);
    } catch (err) {
        callback(err);
    }
}

module.exports = validate;