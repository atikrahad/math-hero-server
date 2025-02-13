import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation check if everything all right next() ->
      const parsedBody = await schema.parseAsync({
        body: req.body,
      });
      req.body = parsedBody.body;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;