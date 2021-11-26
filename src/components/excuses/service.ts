/* eslint-disable no-console */
import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import { IExcuse, INewExcuse, IUpdateExcuse } from './interfaces';

const getAllExcuses = async (): Promise<IExcuse[] | false> => {
  try {
    const [excuses]: [IExcuse[], FieldPacket[]] = await pool.query(
      `SELECT
        E.id, E.description, E.dateCreated, E.dateUpdated, U.email AS createdBy, C.name AS category
        FROM
          excuses E
        INNER JOIN
          users U ON E.users_id = U.id
        INNER JOIN
          categories C ON E.categories_id = C.id
        WHERE
          E.dateDeleted IS NULL;`,
    );
    return excuses;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getRandomExcuse = async (): Promise<IExcuse | false> => {
  try {
    const [excuses]: [IExcuse[], FieldPacket[]] = await pool.query(
      `SELECT
        E.id, E.description, E.description, E.dateCreated, E.dateUpdated, U.email AS createdBy, C.name AS category
        FROM
          excuses E
        INNER JOIN
          users U ON E.users_id = U.id
        INNER JOIN
          categories C ON E.categories_id = C.id
        WHERE
          E.dateDeleted IS NULL
        ORDER BY RAND()
        LIMIT 1;`,
    );
    return excuses[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getExcuseById = async (id: number): Promise<IExcuse | false> => {
  try {
    const [excuses]: [IExcuse[], FieldPacket[]] = await pool.query(
      `SELECT
        E.id, E.description, E.description, E.dateCreated, E.dateUpdated, U.email AS createdBy, C.name AS category
        FROM
          excuses E
        INNER JOIN
          users U ON E.users_id = U.id
        INNER JOIN
          categories C ON E.categories_id = C.id
        WHERE
          E.dateDeleted IS NULL AND E.id = ?
        LIMIT 1;`, [id],
    );
    return excuses[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createExcuse = async (newExcuse: INewExcuse): Promise<number | false> => {
  try {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(`
      INSERT INTO excuses
        SET
          description = ?,
          categories_id = ?,
          users_id = ?,
          visibility = ?
      `,
    [
      newExcuse.description,
      newExcuse.category,
      newExcuse.createdBy,
      newExcuse.visibility,
    ]);
    return result.insertId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteExcuse = async (id: number): Promise<boolean> => {
  try {
    await pool.query('UPDATE excuses SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateExcuse = async (excuseToUpdate: IUpdateExcuse): Promise<boolean> => {
  try {
    await pool.query(`
      UPDATE excuses SET ? WHERE id = ?
    `, [
      excuseToUpdate,
      excuseToUpdate.id,
    ]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getExcusesByCategory = async (id: number): Promise<IExcuse[] | false> => {
  try {
    const [excuses]: [IExcuse[], FieldPacket[]] = await pool.query(`
    SELECT
      E.id, E.description, U.email AS createdBy, C.name AS category
      FROM
        excuses E
      INNER JOIN
        users U ON E.users_id = U.id
      INNER JOIN
        categories C ON E.categories_id = C.id
      WHERE
        E.dateDeleted IS NULL AND C.id = ?;`,
    [id]);
    return excuses;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const excusesService = {
  getAllExcuses,
  getRandomExcuse,
  getExcuseById,
  createExcuse,
  deleteExcuse,
  updateExcuse,
  getExcusesByCategory,
};

export default excusesService;
