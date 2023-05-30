/* Example in Node.js */
const axios = require('axios');

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': '703b16f4-db85-4130-8b19-fb09c6f0de29c',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json.quote);
    json.data.forEach((i) => {
        console.log(i.quote)
    })
    resolve(json);
  }
});