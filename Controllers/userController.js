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

// Login route
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    client.query(
      `Select * from users where email= $1`,
      [email],
      (error, result) => {
        if (error) throw error;
        const storedPassword = result.rows[0].password;
        const bool = bcrypt.compareSync(password, storedPassword);
        if (bool === false) {
          res.json({
            status: false,
            message: 'Incorrect Username or Password',
          });
        } else {
          res.json({
            userID: result.rows[0].userid,
            firstName: result.rows[0].firstname,
            lastName: result.rows[0].lastname,
            isAdmin: result.rows[0].isAdmin,
            isDonor: result.rows[0].isDonor,
            isChildrensHome: result.isChildrensHome,
            status: true,
            message: 'Login Successfully',
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, userLogin };
