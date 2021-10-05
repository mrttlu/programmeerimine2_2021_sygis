import {
  Request,
  Response,
  NextFunction,
} from 'express';
import categoriesService from '../categories/service';
import responseCodes from '../general/responseCodes';

const validateCreateExcuse = (req: Request, res: Response, next: NextFunction) => {
  const {
    description,
    createdBy,
    category,
    visibility,
  } = req.body;
  if (!description) {
    return res.status(responseCodes.badRequest).json({
      error: 'Excuse description is required',
    });
  }
  if (!createdBy) {
    return res.status(responseCodes.badRequest).json({
      error: 'Created by id is required',
    });
  }
  if (!category) {
    return res.status(responseCodes.badRequest).json({
      error: 'Category id is required',
    });
  }
  if (!visibility) {
    return res.status(responseCodes.badRequest).json({
      error: 'Visibility is required',
    });
  }
  const isCategory = categoriesService.getCategoryById(category);
  if (!isCategory) {
    return res.status(responseCodes.badRequest).json({
      error: 'Such category not exists',
    });
  }
  return next();
};

const excusesMiddlewares = {
  validateCreateExcuse,
};

export default excusesMiddlewares;
