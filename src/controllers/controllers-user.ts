import { Request, Response } from 'express';
import Joi from 'joi';
import { getUsersByEmail } from '../services/service-user';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required'
  }),
  number: Joi.alternatives().try(
    Joi.string()
      .pattern(/^[0-9]{6}$/)
      .messages({
        'string.pattern.base': 'Number must be a 6-digit number'
      }),
    Joi.string().allow('')
  )
});

let currentTimeout: NodeJS.Timeout | null = null;

export const getUserByEmailController = (req: Request, res: Response) => {
  const { email, number } = req.query;

  const validationObject = { email, number: number || '' };

  const { error } = schema.validate(validationObject, { abortEarly: false });

  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map(detail => detail.message) });
  }

  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }

  currentTimeout = setTimeout(() => {
    const results = getUsersByEmail(email as string, number as string);
    res.json(results);
  }, 5000);
};
