const WarpPlusKeyGenerator = require('./WarpPlusKeyGenerator-NG.js');

console.log("Creating takes a few minutes, but generally it won't exceed 1 minutes.");
WarpPlusKeyGenerator(1, true)
  .then((keys) => {
    console.log(keys);
  })
  .catch((error) => {
    console.error(error);
  })

setInterval(()=>{
  console.log("some")
},10000)