const errorHandler = (err, req, res, next) => {

  //log to console for dev
  console.log('-----------------------'.red);  
  console.log('----ERROR--------------'.red);  
  console.log(`ERROR NAME:\n${err.name}\n`);
  console.log(`ERROR MESSAGE:\n${err.message}\n`);
  console.log(`ERROR STACK:\n${err.stack}`);
  console.log('-----------------------------'.red); 
  console.log('-----------------------------'.red); 

  return res.status(500).json({
    success: false,
    error: "Server Error"
  });
};

module.exports = errorHandler;
