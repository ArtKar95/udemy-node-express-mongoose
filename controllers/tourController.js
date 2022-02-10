import Tour from '../models/tourModel';

class TourController {
  getAllTours = async (req, res) => {
    try {
      //1. filtering
      const queryObj = { ...req.query };
      const excludedFilds = ['page', 'sort', 'limit', 'fields'];
      excludedFilds.forEach((e) => delete queryObj[e]);
      // const query = Tour.find(queryObj);

      //2. better than 1 filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      console.log(JSON.parse(queryStr));
      const query = Tour.find(JSON.parse(queryStr));

      //Other version
      // const query = Tour.find().where('price').equals(256);

      const tours = await query;

      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
          tours,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: 'file',
        message: error,
      });
    }
  };

  getTour = async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: 'file',
        message: error,
      });
    }
  };

  createTour = async (req, res) => {
    try {
      // const newTour=new Tour({});
      // newTour.save()
      const newTour = await Tour.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    } catch (error) {
      res.status(400).json({
        message: 'Invalid data',
      });
    }
  };

  updateTour = async (req, res) => {
    try {
      const { id } = req.params;
      //runValidators it is not required, its work without it
      const tour = await Tour.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: 'file',
        message: error,
      });
    }
  };

  deleteTour = async (req, res) => {
    try {
      await Tour.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      res.status(404).json({
        status: 'file',
        message: error,
      });
    }
  };
}
export default new TourController();
