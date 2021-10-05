import db from '../../db';
import { Category, NewCategory, UpdateCategory } from './interfaces';

const getAllCategories = () => {
  const { categories } = db;
  return categories;
};

const getCategoryById = (id: number) => {
  const category = db.categories.find((element) => element.id === id);
  return category;
};

const deleteCategory = (category: Category | undefined) => {
  if (category) {
    const index = db.categories.findIndex((element) => element.id === category.id);
    db.categories.splice(index, 1);
  }
  return true;
};

const createCategory = (newCategory: NewCategory) => {
  const id = db.users.length + 1;
  const category: Category = {
    id,
    ...newCategory,
  };

  db.categories.push(category);
  return id;
};

const updateCategory = (category: UpdateCategory) => {
  const index = db.categories.findIndex((element) => element.id === category.id);
  if (index) {
    db.categories[index].name = category.name;
  }
};

const getCategoryByName = (categoryName: string) => {
  const category = db.categories.find((element) => element.name === categoryName);
  return category;
};

const categoriesService = {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
  getCategoryByName,
};

export default categoriesService;
