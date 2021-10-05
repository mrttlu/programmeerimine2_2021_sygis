import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import categoriesService from './service';
import { Category, NewCategory, UpdateCategory } from './interfaces';

const getAllCategories = (req: Request, res: Response) => {
  const categories = categoriesService.getAllCategories();
  return res.status(responseCodes.ok).json({
    categories,
  });
};

const getCategoryById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const category = categoriesService.getCategoryById(id);
  if (!category) {
    return res.status(responseCodes.badRequest).json({
      error: `No category found with id: ${id}`,
    });
  }
  return res.status(responseCodes.ok).json({
    category,
  });
};

const deleteCategory = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const category: Category | undefined = categoriesService.getCategoryById(id);
  if (!category) {
    return res.status(responseCodes.badRequest).json({
      message: `Category not found with id: ${id}`,
    });
  }
  categoriesService.deleteCategory(category);
  return res.status(responseCodes.noContent).json({});
};

const createCategory = (req: Request, res: Response) => {
  const { name, createdBy } = req.body;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Category name is required',
    });
  }
  if (!createdBy) {
    return res.status(responseCodes.badRequest).json({
      error: 'Created by id is required',
    });
  }
  const newCategory: NewCategory = {
    name,
    createdBy,
  };
  const id = categoriesService.createCategory(newCategory);

  return res.status(responseCodes.created).json({
    id,
  });
};

const updateCategory = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { name } = req.body;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }
  const category = categoriesService.getCategoryById(id);
  if (!category) {
    return res.status(responseCodes.badRequest).json({
      error: `No category found with id: ${id}`,
    });
  }
  const update: UpdateCategory = {
    id,
    name,
  };

  categoriesService.updateCategory(update);
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
