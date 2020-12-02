const axios = require('axios');
const express = require('express');

const keys = require('../config/keys');

const baseCloudUrl = 'https://cloud.iexapis.com/stable/';
const baseSandboxUrl = 'https://sandbox.iexapis.com/stable/';

const router = express.Router();

router.get('/tickervalidation', async (req, res) => {
  const { ticker } = req.query;

  const compUrl = `${baseCloudUrl}tops/last?symbols=${ticker}&token=${keys.IEX_CLOUD_TOKEN}`;

  const iexRes = await axios.get(compUrl);
  const { data } = iexRes;

  if (data.length < 1) {
    return res.status(404).json({ msg: 'Symbol does not exist', data });
  }

  res.status(201).json({ msg: `${ticker}: Valid ticker symbol`, data });
});

router.get('/watchlist/validation', async (req, res) => {
  const { ticker } = req.query;

  const compUrl = `${baseCloudUrl}tops/last?symbols=${ticker}&token=${keys.IEX_CLOUD_TOKEN}`;

  const iexRes = await axios.get(compUrl);
  const { data } = iexRes;

  if (data.length < 1) {
    return res.status(404).json({ msg: 'Symbol does not exist', data });
  }

  res.status(201).json({ msg: `${ticker}: Valid ticker symbol`, data });
});

router.get('/watchlist/data', async (req, res) => {
  const { tickerArr } = req.query;
  console.log('tickerArr', tickerArr);

  const compUrl = `${baseCloudUrl}tops/last?symbols=${tickerArr}&token=${keys.IEX_CLOUD_TOKEN}`;

  const iexRes = await axios.get(compUrl);
  const { data } = iexRes;

  if (data.length < 1) {
    return res.status(404).json({ msg: 'There is no data at this times' });
  }

  res.status(200).json({ data });
});

module.exports = router;
