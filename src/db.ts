import { Excuse } from './components/excuses/interfaces';

/**
 * Database interface
 */
interface Db {
  excuses: Excuse[];
}

/**
 * Mock database
 */
const db: Db = {
  excuses: [
    {
      id: 1,
      description: 'Ei viitsinud teha',
      category: 1,
      createdBy: 1,
      visibility: 'Public',
    },
    {
      id: 2,
      description: 'Ei tahtnud teha',
      category: 1,
      createdBy: 1,
      visibility: 'Public',
    },
    {
      id: 3,
      description: 'Ei jõudnud teha',
      category: 1,
      createdBy: 1,
      visibility: 'Public',
    },
    {
      id: 4,
      description: 'Ei osanud teha',
      category: 1,
      createdBy: 1,
      visibility: 'Public',
    },
    {
      id: 5,
      description: 'Ei tahtnud koristada',
      category: 2,
      createdBy: 1,
      visibility: 'Public',
    },
  ],
};

export default db;
