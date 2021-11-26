import { RowDataPacket } from 'mysql2';
/**
 * Excuse interface
 */
interface INewExcuse {
  description: string;
  createdBy: number;
  category: number;
  visibility: string;
}
interface IUpdateExcuse {
  id: number;
  description?: string;
  category?: number;
  visibility?: string;
}

interface IExcuse extends INewExcuse, RowDataPacket {
  id: number;
}

export { INewExcuse, IExcuse, IUpdateExcuse };
