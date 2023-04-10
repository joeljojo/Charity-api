const axios = require('axios');
require('dotenv').config();
const { currentTimestamp } = require('../Utils/timestamp');

class Mpesa {
  // Generate Authentication token
  async authenticationToken(req, res, next) {
    const consumerKey = process.env.CONSUMER_KEY;
    const consumerSecret = process.env.CONSUMER_SECRET;

    const url = process.env.OAUTH_TOCKEN_URL;

    // from the secret and and consumer key
    const buffer = Buffer.from(`${consumerKey}:${consumerSecret}`);
    const auth = `Basic ${buffer.toString('base64')}`;

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      });

      req.token = data.access_token;
      return next();
    } catch (error) {
      return res.send({
        success: false,
        message: error.response.statusText,
      });
    }
  }

  // Lipanampesa Controller
  async onlineLipaNaMpesa(req, res) {
    const { token } = req;
    const { Amount } = req.body;
    const auth = `Bearer ${token}`;

    // get timestamp
    const timestamp = currentTimestamp();

    const url = process.env.LIPA_NA_MPESA_URL;
    const businessShortCode = process.env.BUSINESS_SHORT_CODE;
    const passKey = process.env.PASS_KEY;

    // eslint-disable-next-line new-cap
    const password = new Buffer.from(
      `${businessShortCode}${passKey}${timestamp}`
    ).toString('base64');
    const transactionType = 'CustomerPayBillOnline'; // used to identify the transaction when sending request
    const amount = Amount; // Amount transacted
    const partyA = process.env.PHONE_NUMBER; // Phone number sending the money
    const partyB = process.env.BUSINESS_SHORT_CODE; // orhanozation shortcode (Paybill)
    const phoneNumber = process.env.PHONE_NUMBER; // mobile number to receive the stk Pin Prompt
    const callBackUrl = `${process.env.CALLBACK_URL}/lipa-na-mpesa-callback`; // receive notifications from M-Pesa API
    const accountReference = 'Lipa Charity'; // Identifies the transactions
    const transactionDescription = 'Mpesa Online Payment'; // Additional information

    try {
      const { data } = await axios
        .post(
          url,
          {
            BusinessShortCode: businessShortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: transactionType,
            Amount: amount,
            PartyA: partyA,
            PartyB: partyB,
            PhoneNumber: phoneNumber,
            CallBackURL: callBackUrl,
            AccountReference: accountReference,
            TransactionDesc: transactionDescription,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .catch(console.log);

      return res.json({
        success: true,
        message: data,
        status: true,
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.response.statusText,
        status: false,
      });
    }
  }

  // Lipanampesa callback url
  async lipaNaMpesaCallback(req, res) {
    // GEtting transaction description
    const message = req.body.Body.stkCallback.ResultDesc;

    return res.send({
      success: true,
      message,
    });
  }
}

module.exports = new Mpesa();
