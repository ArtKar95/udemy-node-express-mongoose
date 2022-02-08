import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config({ path: './config.env' });

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
