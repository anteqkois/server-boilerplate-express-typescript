import { NextFunction, Request, Response } from 'express';
import {
  ApiError,
  isApiError
} from './ApiError';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new ApiError('Api endpoint not found', 404);
  next(err);
};

const catchAsyncErrors =
  (
    handler: (
      req: Request<any, any, any, any>,
      res: Response,
      next: NextFunction
    ) => void
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };

const catchErrors =
  (
    handler: (
      req: Request<any, any, any, any>,
      res: Response,
      next: NextFunction
    ) => void
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };

// next pamram must be always
const handleErrors = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.dir(err);

  if (isApiError(err)) {
    return res
      .status(err.status || 500)
      .send({ error: true, message: err.message });
  }
  // if (isValidationError(err) || isApiError(err)) {
  //   errorLogger.error('', err);
  //   return res
  //     .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
  //     .send({ error: [err] });
  // }
  // if (isOperationalErrorArray(err)) {
  //   errorLogger.error('Error array', err);
  //   return res
  //     .status(err[0].status || StatusCodes.INTERNAL_SERVER_ERROR)
  //     .json({ error: err });
  // }
  // if (err instanceof ZodError) {
  //   const error = ValidationError.fromZodErrorArray(err.issues);
  //   errorLogger.error('ZodError', error);
  //   return res.status(422).json({
  //     error,
  //   });
  // }

  // Check if err have status code
  if (
    err &&
    typeof err === 'object' &&
    'status' in err &&
    typeof err.status === 'number'
  ) {
    res.status(err.status);
  } else {
    res.status(500);
  }

  return res.json({
    error: true,
    message: 'Something went wrong on server, try later.',
  });
};

export {
  notFound,
  catchAsyncErrors,
  catchErrors,
  handleErrors,
};
