const pool = require("../pool");

const createTable = () => {
  // pool.query(
  //   "CREATE TABLE IF NOT EXISTS patients (UserID SERIAL PRIMARY KEY NOT NULL, Password VARCHAR(255) NOT NULL,Email VARCHAR(255) UNIQUE NOT NULL,FirstName VARCHAR(255) NOT NULL,LastName VARCHAR(255) NOT NULL,DateOfBirth DATE NOT NULL,PhoneNumber VARCHAR(15) NOT NULL)",
  //   (error) => {
  //     if (error) {
  //       console.log(`error occurred while creating patients table ${error}`);
  //     } else {
  //       console.log("patients table created");
  //     }
  //   }
  // );
  // pool.query(
  //   "CREATE TABLE IF NOT EXISTS availableSlots (SlotID SERIAL PRIMARY KEY NOT NULL, docID VARCHAR(20), starting_time DATETIME, ending_time DATETIME DEFAULT (starting_time + INTERVAL 1 HOUR), FOREIGN KEY (docID) REFERENCES Doctors(BMDC_reg));",
  //   (error) => {
  //     if (error) {
  //       console.log(`error occurred while creating slots table ${error}`);
  //     } else {
  //       console.log("slots table created");
  //     }
  //   }
  // );
  // pool.query(
  //   "CREATE TABLE IF NOT EXISTS Booking (BookID INT AUTO_INCREMENT PRIMARY KEY NOT NULL, PatientID INT, SlotServiceID INT, DateofBooking DATE, STATUS ENUM('Pending', 'Completed'), FOREIGN KEY (PatientID) REFERENCES patients(UserID), FOREIGN KEY (SlotServiceID) REFERENCES availableSlots(SlotID));",
  //   (error) => {
  //     if (error) {
  //       console.log(`error occurred while creating slots table ${error}`);
  //     } else {
  //       console.log("booking table created");
  //     }
  //   }
  // );
  // pool.query(
  //   "CREATE TABLE IF NOT EXISTS Doctors (FullName VARCHAR(255), BMDC_reg VARCHAR(20) PRIMARY KEY NOT NULL, Specialization VARCHAR(255) NOT NULL, Email VARCHAR(255) UNIQUE NOT NULL, PhoneNumber VARCHAR(15) NOT NULL, Password VARCHAR(255) NOT NULL);",
  //   (error) => {
  //     if (error) {
  //       console.log(`error occurred while creating users table ${error}`);
  //     } else {
  //       console.log("patient table created");
  //     }
  //   }
  // );
  // pool.query(
  //   'ALTER TABLE availableSlots MODIFY COLUMN SlotID INT AUTO_INCREMENT;'
  // )
};

module.exports = createTable;
