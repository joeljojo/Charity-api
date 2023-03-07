const axios = require('axios');
require('dotenv').config();

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
        message: error.message,
      });
    }
  }
}

module.exports = new Mpesa();
