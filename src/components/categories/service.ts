/* eslint-disable no-console */
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { ICategory, INewCategory, IUpdateCategory } from './interfaces';
import pool from '../../database';

const getAllCategories = async (): Promise<ICategory[] | false> => {
  try {
    const [categories]: [ICategory[], FieldPacket[]] = await pool.query(
      `SELECT C.id, C.name, C.dateCreated, C.dateUpdated, U.email AS createdBy
        FROM categories C
        INNER JOIN users U on C.users_id = U.id 
        WHERE C.dateDeleted IS NULL;`,
    );
    return categories;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getCategoryById = async (id: number): Promise<ICategory | false> => {
  try {
    const [categories]: [ICategory[], FieldPacket[]] = await pool.query(
      `SELECT C.id, C.name, C.dateCreated, C.dateUpdated, U.email AS createdBy
        FROM categories C
        INNER JOIN users U on C.users_id = U.id 
        WHERE C.id = ? AND C.dateDeleted IS NULL
        LIMIT 1;`, [id],
    );
    return categories[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteCategory = async (id: number): Promise<boolean> => {
  try {
    await pool.query('UPDATE categories SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createCategory = async (newCategory: INewCategory): Promise<number | false> => {
  try {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO categories SET name = ?, users_id = ?', [newCategory.name, newCategory.createdBy]);
    return result.insertId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateCategory = async (category: IUpdateCategory): Promise<boolean> => {
  try {
    await pool.query('UPDATE categories SET name = ? WHERE id = ?', [category.name, category.id]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const categoriesService = {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
};

export default categoriesService;
