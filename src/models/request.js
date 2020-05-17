const request = {
  post(endpoint, data){
    return fetch(endpoint, data).then(res=>res.json()).catch((err)=>{
      console.error(err);
    });
  }
}
export default request;