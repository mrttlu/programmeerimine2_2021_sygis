import { Request, Response } from 'express';
import db from '../../db';
import responseCodes from '../general/responseCodes';
import Excuse from './interfaces';

const getAllExcuses = (req: Request, res: Response) => {
  const { category } = req.query;
  const { excuses } = db;
  if (!category) {
    return res.status(responseCodes.ok).json({
      excuses,
    });
  }
  const foundCategory = db.categories.find((element) => element.name === category);
  if (!foundCategory) {
    return res.status(responseCodes.badRequest).json({
      error: `No ${category} found`,
    });
  }
  const excusesInCategory = excuses.filter((element) => element.category === foundCategory.id);
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
  const random = Math.round(Math.random() * (db.excuses.length - 1));
  const excuse: Excuse = db.excuses[random];
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
  const excuse = db.excuses.find((element) => element.id === id);
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
  const index = db.excuses.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `Excuse not found with id: ${id}`,
    });
  }
  db.excuses.splice(index, 1);
  return res.status(responseCodes.noContent).json({});
};

const createExcuse = (req: Request, res: Response) => {
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
  const id = db.excuses.length + 1;
  const excuse: Excuse = {
    id,
    description,
    createdBy,
    category,
    visibility,
  };
  db.excuses.push(excuse);
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
  const index = db.excuses.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No excuse found with id: ${id}`,
    });
  }
  if (description) {
    db.excuses[index].description = description;
  }
  if (category) {
    db.excuses[index].category = category;
  }
  if (visibility) {
    db.excuses[index].visibility = visibility;
  }

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
