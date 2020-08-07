export const handleFail = (type, error) => {
  let errorMsg = "Something went wrong.";
  if (error.response) {
    // Request made and server responded
    errorMsg = error.response.data.error || errorMsg;
  } else if (error.request) {
    // The request was made but no response was received
    errorMsg = "Cannot connect to server.";
  }else{
    // Something happened in setting up the request 
    errorMsg = "Cannot connect to server.";
  }
  return {
    type: type,
    payload: errorMsg,
  };
};