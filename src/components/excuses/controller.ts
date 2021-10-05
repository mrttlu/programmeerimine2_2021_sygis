import { Request, Response } from 'express';
import excusesService from './service';
import categoriesService from '../categories/service';
import responseCodes from '../general/responseCodes';
import { NewExcuse, UpdateExcuse } from './interfaces';

const getAllExcuses = (req: Request, res: Response) => {
  const { category } = req.query;
  const excuses = excusesService.getAllExcuses();
  if (!category) {
    return res.status(responseCodes.ok).json({
      excuses,
    });
  }
  const foundCategory = categoriesService.getCategoryByName(category.toString());
  if (!foundCategory) {
    return res.status(responseCodes.badRequest).json({
      error: `No ${category} found`,
    });
  }
  const excusesInCategory = excusesService.getExcusesByCataegory(foundCategory);
  if (!excusesInCategory || excusesInCategory.length < 1) {
    return res.status(responseCodes.badRequest).json({
      error: `No excuses found in ${category}`,
    });
  }
  return res.status(responseCodes.ok).json({
    excuses: excusesInCategory,
  });
};

const getRandomExcuse = (req: Request, res: Response) => {
  const excuse = excusesService.getRandomExcuse();
  return res.status(responseCodes.ok).json({
    excuse,
  });
};

const getExcuseById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const excuse = excusesService.getExcuseById(id);
  if (!excuse) {
    return res.status(responseCodes.badRequest).json({
      error: `No excuse found with id: ${id}`,
    });
  }
  return res.status(responseCodes.ok).json({
    excuse,
  });
};

const deleteExcuse = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const excuse = excusesService.getExcuseById(id);
  if (!excuse) {
    return res.status(responseCodes.badRequest).json({
      message: `Excuse not found with id: ${id}`,
    });
  }
  excusesService.deleteExcuse(id);
  return res.status(responseCodes.noContent).json({});
};

const createExcuse = (req: Request, res: Response) => {
  const {
    description,
    createdBy,
    category,
    visibility,
  } = req.body;

  const newExcuse: NewExcuse = {
    description,
    createdBy,
    category,
    visibility,
  };
  const id = excusesService.createExcuse(newExcuse);
  return res.status(responseCodes.created).json({
    id,
  });
};

const updateExcuse = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { description, category, visibility } = req.body;
  if (!description && !category && !visibility) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }
  const excuse = excusesService.getExcuseById(id);
  if (!excuse) {
    return res.status(responseCodes.badRequest).json({
      error: `No excuse found with id: ${id}`,
    });
  }
  const excuseToUpdate: UpdateExcuse = {
    id,
    description,
    category,
    visibility,
  };
  excusesService.updateExcuse(excuseToUpdate);
  return res.status(responseCodes.noContent).json({});
};

const excusesController = {
  getAllExcuses,
  getRandomExcuse,
  getExcuseById,
  createExcuse,
  deleteExcuse,
  updateExcuse,
};

export default excusesController;
