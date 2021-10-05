/**
 * Excuse interface
 */
interface NewExcuse {
  description: string;
  createdBy: number;
  category: number;
  visibility: string;
}
interface UpdateExcuse {
  id: number;
  description?: string;
  category?: number;
  visibility?: string;
}

interface Excuse extends NewExcuse {
  id: number;
}

export { NewExcuse, Excuse, UpdateExcuse };
