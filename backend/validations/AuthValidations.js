const Joi = require('joi')

function validateRegister(user){
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        surname: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().min(3).max(50).required().messages({
            'string.email': 'Geçerli bir e-posta adresi girin.',
            'string.min': 'E-posta adresi en az 3 karakter olmalıdır.',
            'string.max': 'E-posta adresi en fazla 50 karakter olmalıdır.',
            'any.required' : 'E-posta adresi gereklidir.'
        }),
        password: Joi.string().required(),
        dateOfBirth: Joi.date().less('now').required().messages({
            'date.less': 'Doğum tarihi bugünden önce olmalıdır.',
            'any.required' : 'Doğum tarihi gereklidir.'
        }),
        userName: Joi.string().min(3).max(30).required().messages({
            'string.min': 'Kullanıcı adı en az 3 karakter olmalıdır.',
            'string.max': 'Kullanıcı adı en fazla 30 karakter olmalıdır.',
            'any.required' : 'Kullanıcı adı gereklidir.'
        }),
        preferences: Joi.array().items(Joi.string()).messages({
            'array.base': 'Tercihler bir dizi olmalıdır.',
            'any.required' : 'Tercihler gereklidir.'
        }),
    });
    return schema.validate(user);
}

//acount
function validateLogin(user){
    const schema = Joi.object({
        email: Joi.string().email().min(3).max(50).required().messages({
            'string.email': 'Geçerli bir e-posta adresi girin.',
            'string.min': 'E-posta adresi en az 3 karakter olmalıdır.',
            'string.max': 'E-posta adresi en fazla 50 karakter olmalıdır.',
            'any.required' : 'E-posta adresi gereklidir.'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'Şifre boş olamaz.',
            'any.required' : 'Şifre gereklidir.'
        })

    })
    return schema.validate(user);
}


module.exports = {validateRegister, validateLogin};