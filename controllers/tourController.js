import Tour from '../models/tourModel';

class TourController {
  getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      // results: tours.length,
      data: {
        // tours,
      },
    });
  };

  getTour = (req, res) => {
    // const id = req.params.id * 1;
    // const tour = tours.find((el) => el.id === id);

    res.status(200).json({
      status: 'success',
      data: {
        // tour,
      },
    });
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

  updateTour(req, res) {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>',
      },
    });
  }

  deleteTour(req, res) {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
}
export default new TourController();
