import User from './components/users/interfaces';

/**
 * Category interface
 */
interface Category {
  id: number;
  name: string;
  createdBy: number;
}

/**
 * Excuse interface
 */
interface Excuse {
  id: number;
  description: string;
  createdBy: number;
  category: number;
  visibility: string;
}

/**
 * Database interface
 */
interface Db {
  users: User[];
  categories: Category[];
  excuses: Excuse[];
}

/**
 * Mock database
 */
const db: Db = {
  users: [
    {
      id: 1,
      firstName: 'Juku',
      lastName: 'Juurikas',
    },
    {
      id: 2,
      firstName: 'Mari',
      lastName: 'Maasikas',
    },
  ],
  categories: [
    {
      id: 1,
      name: 'Koolitööd',
      createdBy: 1,
    },
    {
      id: 2,
      name: 'Kodu',
      createdBy: 2,
    },
    {
      id: 3,
      name: 'Töö',
      createdBy: 2,
    },
  ],
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
