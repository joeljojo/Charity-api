const express = require('express');
const bcrypt = require('bcrypt');
const { uuid } = require('uuidv4');
const client = require('../Config/db');

const router = express();

// Register Controller
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

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
          client.query(`Insert into users values($1,$2,$3,$4,$5)`, [
            userID,
            firstName,
            lastName,
            email,
            hash,
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

module.exports = { registerUser };
