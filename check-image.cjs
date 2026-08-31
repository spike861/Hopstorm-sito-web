const https = require('https');
https.get('https://res.cloudinary.com/dcbomk6i8/image/upload/fl_getinfo/f_auto,q_auto:best,e_sharpen:60/hf_0001_vwo695.jpg', (res) => {
  let data1 = '';
  res.on('data', chunk => data1 += chunk);
  res.on('end', () => console.log('q_auto:best:', data1));
});
