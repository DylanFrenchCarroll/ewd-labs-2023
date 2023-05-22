//* validators/register.validator.js
import Joi from 'joi';

// const passwordRegex = new RegExp(`(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{7,20})`);
const accountSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    firebaseUid: Joi.string().min(1).max(255).required()
});

export default {account: accountSchema};
