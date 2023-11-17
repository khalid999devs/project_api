const ApiError = require("../../../errors/ApiError");
const pool = require("../../../pool");
const userRoleEnum = require("../../../shared/enums");

const createBookingInDB = async (payload, userID) => {
  const { slotID, bookingDate } = payload;

  const query =
    "INSERT INTO Booking (PatientID, SlotServiceID, DateofBooking, STATUS) VALUES (?, ?, ?, ?)";
  const values = [userID, slotID, bookingDate, "Pending"];

  const [createdSlots] = await pool.promise().query(query, values);

  const selectQuery = "SELECT * FROM Booking WHERE BookID = ?";

  const selectValues = [createdSlots?.insertId];

  const [booking] = (await pool.promise().query(selectQuery, selectValues))[0];

  return booking;
};

const getAllBookingsInDB = async (user) => {
  let bookings;

  const selectQuery = `
    SELECT

    Booking.BookID,
    Booking.DateofBooking,
    Booking.STATUS,

    Booking.PatientID,
    patients.Email AS patients_Email,
    patients.FirstName,
    patients.LastName,
    patients.DateOfBirth,
    patients.PhoneNumber AS patients_PhoneNumber,

    Booking.SlotServiceID,
    availableSlots.starting_time,
    availableSlots.ending_time,

    availableSlots.docID,
    Doctors.FullName,
    Doctors.Specialization,
    Doctors.Email AS Doctors_Email,
    Doctors.PhoneNumber AS Doctors_PhoneNumber

    FROM Booking
    JOIN patients ON Booking.PatientID = patients.UserID
    JOIN availableSlots ON Booking.SlotServiceID = availableSlots.SlotID
    JOIN Doctors ON availableSlots.docID = Doctors.BMDC_reg
    WHERE ${
      user.role === userRoleEnum.Doctor
        ? "availableSlots.docID"
        : "Booking.PatientID"
    } = ?
    `;

  [bookings] = await pool
    .promise()
    .query(selectQuery, [
      user.role === userRoleEnum.Doctor ? user.BMDC_reg : user.UserID,
    ]);

  return bookings;
};

const updateBookingInDB = async (userID, bookID) => {
  let booking;

  const findQuery = `
  SELECT

  Booking.BookID,
  Booking.STATUS,
  availableSlots.docID

  FROM Booking
  JOIN availableSlots ON Booking.SlotServiceID = availableSlots.SlotID
  JOIN Doctors ON availableSlots.docID = Doctors.BMDC_reg
  WHERE availableSlots.docID = ? AND Booking.BookID = ?
  `;

  [booking] = await pool.promise().query(findQuery, [userID, bookID]);

  if (booking?.length < 1) {
    throw new ApiError(401, `Unauthorized or Booking not found by ${bookID}`);
  }

  const updateQuery = `UPDATE Booking SET STATUS = ? WHERE BookID = ?`;

  const [updateResult] = await pool
    .promise()
    .query(updateQuery, ["Completed", bookID]);

  if (updateResult?.affectedRows == 1) {
    [booking] = await pool.promise().query(findQuery, [userID, bookID]);
  }

  return booking;
};

const bookingService = {
  createBookingInDB,
  getAllBookingsInDB,
  updateBookingInDB,
};

module.exports = bookingService;
