(async function (){
    try{
        const res = await fetch ('http://[::1]:3000/api/product');
        const data = await res.json();
        console.log(data)
    }catch(err){
        console.log(err)
    }
}());

async function postJSON(url,data,method) {
    try {
      const response = await fetch(url, {
        method: method, // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  /*
  const data = { "title": "polo3" };
  postJSON("http://[::1]:3000/api/category",data);
  postJSON("http://[::1]:3000/api/user/register",{
    "name" : "test22",
    "email": "ahmedhossamtest688417@gmail.com",
    "password": "ahmed#1710",
    "passwordConfirm": "ahmed#1710"
  })*/
  postJSON("http://[::1]:3000/api/user/login",{
    
    "email": "ahmedhossamtest688417@gmail.com",
    "password": "ahmed#1710",
  
  },"POST");