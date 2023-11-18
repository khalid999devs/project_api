const pool = require('../../../pool');
const userRoleEnum = require('../../../shared/enums');

const createSlotsInDB = async (payload, docID) => {
  const { starting_time } = payload;

  const query =
    'INSERT INTO availableSlots (docID, starting_time) VALUES (?, ?)';
  const values = [docID, starting_time];

  const [createdSlots] = await pool.promise().query(query, values);

  const selectQuery = 'SELECT * FROM availableSlots WHERE slotID = ?';

  const selectValues = [createdSlots?.insertId];

  const [slot] = (await pool.promise().query(selectQuery, selectValues))[0];

  return slot;
};

const getAllSlotsFromDB = async (user) => {
  let slot;

  const selectQuery = `
    SELECT
  
    availableSlots.SlotID,
    availableSlots.docID AS BMDC_reg,
    availableSlots.starting_time,
    availableSlots.ending_time,
  
    Doctors.FullName,
    Doctors.Specialization,
    Doctors.Email,
    Doctors.PhoneNumber
  
    FROM availableSlots
    JOIN Doctors ON availableSlots.docID = Doctors.BMDC_reg
    ${user.role === userRoleEnum.Doctor ? 'WHERE availableSlots.docID = ?' : ''}
    `;

  [slot] = await pool
    .promise()
    .query(selectQuery, [
      user.role === userRoleEnum.Doctor ? user.BMDC_reg : null,
    ]);

  return slot;
};

const deleteSlotServ = async (id) => {
  const query = 'delete from availableSlots where SlotID=?';
  const values = [id];

  const [result] = await pool.promise().query(query, values);

  return result;
};

const prescription = async (data) => {
  const { PatientID, Medicine, Rx, CC, Treatment_Plan, O_E, docName, DocID } =
    data;
  const query =
    'INSERT INTO prescription (PatientID, DocID, Date, Medicine,RX,CC,Treatment_Plan,O_E,docName) VALUES (?,?,?,?,?,?,?,?,?);';
  const values = [
    PatientID,
    DocID,
    new Date().toISOString().slice(0, 10),
    Medicine,
    Rx,
    CC,
    Treatment_Plan,
    O_E,
    docName,
  ];

  const [createdSlots] = await pool.promise().query(query, values);
  return createdSlots;
};

const SlotsService = {
  createSlotsInDB,
  getAllSlotsFromDB,
  deleteSlotServ,
  prescription,
};

module.exports = SlotsService;
