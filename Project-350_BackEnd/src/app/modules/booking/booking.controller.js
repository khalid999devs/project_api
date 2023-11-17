const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const { use } = require("./booking.route");
const bookingService = require("./booking.service");

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const user = req.verifiedUser;

  const result = await bookingService.createBookingInDB(
    bookingData,
    user?.UserID
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const user = req.verifiedUser;

  const result = await bookingService.getAllBookingsInDB(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${
      result.length < 1
        ? "No Bookings found."
        : "Bookings retrieved successfully."
    }`,
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const user = req.verifiedUser;
  const { id } = req.params;

  const result = await bookingService.updateBookingInDB(user.BMDC_reg, id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings updated",
    data: result,
  });
});

const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};

module.exports = bookingController;
