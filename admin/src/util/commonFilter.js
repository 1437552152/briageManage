export  function filterParams(obj){
    let params={};
    for(let item in obj){
        if(obj[item]){
         params[item]=obj[item]
        }
      }
      return params;
}