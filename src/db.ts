import { User } from './components/users/interfaces';
import { Category } from './components/categories/interfaces';
import { Excuse } from './components/excuses/interfaces';

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
      email: 'juku@juurikas.ee',
      password: '$2b$10$nevnzRS0jBjFh.KEYSoQ6u75M7FdLA7vXEgbbV9iHfU7W/.6W9hFa',
      role: 'Admin',
    },
    {
      id: 2,
      firstName: 'Mari',
      lastName: 'Maasikas',
      email: 'mari@maasikas.ee',
      password: '$2b$10$FY6sDSftFysyuOVqIpgc..qr./DoTxFCUUZALvqXUF98nz8/wlNeO',
      role: 'User',
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
