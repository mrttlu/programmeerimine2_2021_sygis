import db from '../../db';
import { Category } from '../categories/interfaces';
import { Excuse, NewExcuse, UpdateExcuse } from './interfaces';

const getAllExcuses = () => {
  const { excuses } = db;
  return excuses;
};

const getRandomExcuse = () => {
  const random = Math.round(Math.random() * (db.excuses.length - 1));
  const excuse: Excuse = db.excuses[random];
  return excuse;
};

const getExcuseById = (id: number) => {
  const excuse = db.excuses.find((element) => element.id === id);
  return excuse;
};

const createExcuse = (newExcuse: NewExcuse) => {
  const id = db.excuses.length + 1;
  const excuse: Excuse = {
    id,
    ...newExcuse,
  };
  db.excuses.push(excuse);
  return id;
};

const deleteExcuse = (id: number) => {
  const index = db.excuses.findIndex((element) => element.id === id);
  db.excuses.splice(index, 1);
  return true;
};

const updateExcuse = (excuseToUpdate: UpdateExcuse) => {
  const index = db.excuses.findIndex((element) => element.id === excuseToUpdate.id);
  if (excuseToUpdate.description) {
    db.excuses[index].description = excuseToUpdate.description;
  }
  if (excuseToUpdate.category) {
    db.excuses[index].category = excuseToUpdate.category;
  }
  if (excuseToUpdate.visibility) {
    db.excuses[index].visibility = excuseToUpdate.visibility;
  }
};

const getExcusesByCataegory = (category: Category) => {
  const excusesInCategory = db.excuses.filter((element) => element.category === category.id);
  return excusesInCategory;
};

const excusesService = {
  getAllExcuses,
  getRandomExcuse,
  getExcuseById,
  createExcuse,
  deleteExcuse,
  updateExcuse,
  getExcusesByCataegory,
};

export default excusesService;
