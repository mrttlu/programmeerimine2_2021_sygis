/**
 * Category interface
 */

interface NewCategory {
  name: string;
  createdBy: number;
}

interface Category extends NewCategory {
  id: number;
}

interface UpdateCategory {
  id: number;
  name: string;
}

export { NewCategory, Category, UpdateCategory };
