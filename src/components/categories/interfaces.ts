import { RowDataPacket } from 'mysql2';
/**
 * Category interface
 */

interface INewCategory {
  name: string;
  createdBy: number;
}

interface ICategory extends INewCategory, RowDataPacket {
  id: number;
}

interface IUpdateCategory {
  id: number;
  name: string;
}

export { INewCategory, ICategory, IUpdateCategory };
