import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import categoriesService from './service';
import { INewCategory, IUpdateCategory } from './interfaces';

const getAllCategories = async (req: Request, res: Response) => {
  const categories = await categoriesService.getAllCategories();
  return res.status(responseCodes.ok).json({
    categories,
  });
};

const getCategoryById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const category = await categoriesService.getCategoryById(id);
  if (!category) {
    return res.status(responseCodes.badRequest).json({
      error: `No category found with id: ${id}`,
    });
  }
  return res.status(responseCodes.ok).json({
    category,
  });
};

const deleteCategory = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const category = await categoriesService.getCategoryById(id);
  if (!category) {
    return res.status(responseCodes.badRequest).json({
      message: `Category not found with id: ${id}`,
    });
  }
  const result = await categoriesService.deleteCategory(id);
  if (!result) {
    return res.status(responseCodes.serverError).json({});
  }
  return res.status(responseCodes.noContent).json({});
};

const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const createdBy = res.locals.user.id;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Category name is required',
    });
  }
  const newCategory: INewCategory = {
    name,
    createdBy,
  };
  const id = await categoriesService.createCategory(newCategory);
  if (!id) {
    return res.status(responseCodes.serverError).json({});
  }
  return res.status(responseCodes.created).json({
    id,
  });
};

const updateCategory = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { name } = req.body;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }
  const category = await categoriesService.getCategoryById(id);
  if (!category) {
    return res.status(responseCodes.badRequest).json({
      error: `No category found with id: ${id}`,
    });
  }
  const update: IUpdateCategory = {
    id,
    name,
  };

  const result = await categoriesService.updateCategory(update);
  if (!result) {
    return res.status(responseCodes.serverError).json({});
  }
  return res.status(responseCodes.noContent).json({});
};

const categoriesController = {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
};

export default categoriesController;
