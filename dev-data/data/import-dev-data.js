import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import Tour from '../../models/tourModel.js';

dotenv.config({ path: './config.env' });

const __dirname = path.resolve();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Db connected successfully');
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

const tours = JSON.parse(
  readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);
// console.log(tours);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
