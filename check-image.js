const https = require('https');
https.get('https://res.cloudinary.com/dcbomk6i8/image/upload/fl_getinfo/hf_0001_vwo695.jpg', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
