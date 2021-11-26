import { Request, Response } from 'express';
import excusesService from './service';
import responseCodes from '../general/responseCodes';
import { INewExcuse, IUpdateExcuse } from './interfaces';

const getAllExcuses = async (req: Request, res: Response) => {
  const excuses = await excusesService.getAllExcuses();
  if (!excuses) {
    if (excuses) {
      return res.status(responseCodes.serverError).json({});
    }
  }
  return res.status(responseCodes.ok).json({
    excuses,
  });
};

const getExcusesByCategory = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const excuses = await excusesService.getExcusesByCategory(id);
  if (!excuses) {
    return res.status(responseCodes.serverError).json({});
  }
  return res.status(responseCodes.ok).json({
    excuses,
  });
};

const getRandomExcuse = async (req: Request, res: Response) => {
  const excuse = await excusesService.getRandomExcuse();
  return res.status(responseCodes.ok).json({
    excuse,
  });
};

const getExcuseById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const excuse = await excusesService.getExcuseById(id);
  if (!excuse) {
    return res.status(responseCodes.badRequest).json({
      error: `No excuse found with id: ${id}`,
    });
  }
  return res.status(responseCodes.ok).json({
    excuse,
  });
};

const deleteExcuse = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const excuse = await excusesService.getExcuseById(id);
  if (!excuse) {
    return res.status(responseCodes.badRequest).json({
      message: `Excuse not found with id: ${id}`,
    });
  }
  const result = await excusesService.deleteExcuse(id);
  if (!result) {
    return res.status(responseCodes.serverError).json({});
  }
  return res.status(responseCodes.noContent).json({});
};

const createExcuse = async (req: Request, res: Response) => {
  const {
    description,
    createdBy,
    category,
    visibility,
  } = req.body;

  const newExcuse: INewExcuse = {
    description,
    createdBy,
    category,
    visibility,
  };
  const id = await excusesService.createExcuse(newExcuse);
  if (!id) {
    return res.status(responseCodes.serverError).json({});
  }
  return res.status(responseCodes.created).json({
    id,
  });
};

const updateExcuse = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { description, category, visibility } = req.body;
  if (!description && !category && !visibility) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }
  const excuse = await excusesService.getExcuseById(id);
  if (!excuse) {
    return res.status(responseCodes.badRequest).json({
      error: `No excuse found with id: ${id}`,
    });
  }
  const excuseToUpdate: IUpdateExcuse = {
    id,
  };
  if (description) excuseToUpdate.description = description;
  if (category) excuseToUpdate.category = category;
  if (visibility) excuseToUpdate.visibility = visibility;
  const result = await excusesService.updateExcuse(excuseToUpdate);
  if (!result) {
    return res.status(responseCodes.serverError).json({});
  }
  return res.status(responseCodes.noContent).json({});
};

const excusesController = {
  getAllExcuses,
  getExcusesByCategory,
  getRandomExcuse,
  getExcuseById,
  createExcuse,
  deleteExcuse,
  updateExcuse,
};

export default excusesController;
