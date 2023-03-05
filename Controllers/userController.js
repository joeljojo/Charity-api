const bcrypt = require('bcrypt');
const { uuid } = require('uuidv4');
const client = require('../Config/db');

// Register Controller
const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    isAdmin,
    isDonor,
    isChildrensHome,
  } = req.body;

  // hash password using bcrypt
  const hash = bcrypt.hashSync(password, 10);

  // Generate userID
  const userID = uuid();
  // Register if user does not exist
  try {
    client.query(
      `Select * from users  where not exists (select * from users where email =$1)`,
      [email],
      (error, result) => {
        if (error) throw error;
        if (result.rows.length > 0) {
          client.query(`Insert into users values($1,$2,$3,$4,$5,$6,$7,$8)`, [
            userID,
            firstName,
            lastName,
            email,
            hash,
            isAdmin,
            isDonor,
            isChildrensHome,
          ]);
          res.json({
            status: true,
            message: 'User Registered Successfully!',
          });
        } else {
          res.json({ status: false, message: 'User Already exists' });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Login controller
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // if email exists and compare passwords
    client.query(
      `Select * from users where email= $1`,
      [email],
      (error, result) => {
        if (error) throw error;
        // password comparison
        if (result.rows.length > 0) {
          const storedPassword = result.rows[0].password;
          const bool = bcrypt.compareSync(password, storedPassword);

          // if passwords do not match
          if (bool === false) {
            res.json({
              status: false,
              message: 'Incorrect Password!',
            });
          } else {
            // if passwords match
            res.json({
              userID: result.rows[0].userid,
              firstName: result.rows[0].firstname,
              lastName: result.rows[0].lastname,
              isAdmin: result.rows[0].isadmin,
              isDonor: result.rows[0].isdonaor,
              isChildrensHome: result.rows[0].ischildrenshome,
              message: 'Login Successfully',
            });
          }
        } else {
          // if email does not exist
          res.json({ status: false, message: 'Incorrect email!' });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// make Request Controller
const makeRequest = async (req, res) => {
  const {
    requestTitle,
    requestDescription,
    facilityName,
    numberOfChildren,
    location,
    amountRequired,
    isDonorApproved,
    isAdminApproved,
    childrensHomeId,
    donorId,
  } = req.body;
  // generate requestId randomly
  const requestID = uuid();

  try {
    client.query(
      `Insert into requests values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        requestID,
        requestTitle,
        requestDescription,
        facilityName,
        numberOfChildren,
        location,
        amountRequired,
        isDonorApproved,
        isAdminApproved,
        childrensHomeId,
        donorId,
      ]
    );
    res.json({ status: true, message: 'Request made successfully!' });
  } catch (error) {
    console.log(error);
  }
};

// fetch requests controller
const adminRequests = async (req, res) => {
  try {
    client.query(`Select * from requests`, (error, result) => {
      if (error) throw error;
      res.status(200).json(result.rows);
    });
  } catch (error) {
    console.log(error);
  }
};

// get donors controller
const getDonors = async (req, res) => {
  // select all donors
  try {
    client.query(
      `Select userid, firstname, lastname, email from users where isDonaor = true`,
      (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Get myRequests controller (requests made by childrens home)
const myAllRequests = async (req, res) => {
  const { userid } = req.body;

  try {
    client.query(
      `Select * from requests where childrenshomeid = $1`,
      [userid],
      (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerUser,
  userLogin,
  makeRequest,
  adminRequests,
  getDonors,
  myAllRequests,
};
