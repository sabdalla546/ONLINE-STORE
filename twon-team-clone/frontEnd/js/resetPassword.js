//import { resetPass } from './sendEmail.js';
/*function resetPass(){
   
    const RestPass = document.getElementById('RestPass').value ;
    const confirmPass = document.getElementById('confirmPass').value ;
    console.log(RestPass)
    return [RestPass,confirmPass];

}*/
const sendToken = async(password,passwordConfirm,token)=>{
    try{
        const res =await axios ({
            method:'PATCH',
            url: 'http://[::1]:3000/api/user/resetpassword/'+token,
            data:{
                password,
                passwordConfirm
            }
        });
        console.log(res);
        if (res.data.status === 'success');{
            window.location.replace('/ONLINE-STORE/twon-team-clone/frontEnd/login.html')
        }
       
    }catch(err){
        console.log(err.response.data)
    }
}

const resetPassword = async (email) => {
    try{
        const res =await axios ({
            method:'POST',
            url: "http://[::1]:3000/api/user/forgotpassword",
            data:{
              
                email,
               
            }
        });
       if (res.data.status == 'success'){

        localStorage.setItem('token', res.data.resetToken)
       }

    }catch(err){
        console.log(err)
    }
}

function forgotPass(){
    const email = document.getElementById('RestEmail').value ;
    console.log(email)
    resetPassword(email);
}
/*
document.getElementById('R-password').addEventListener('click',e=>{
   
   
    
})*/

const resetbtn = document.querySelector('.emailRestEmail');
console.log(resetbtn);
resetbtn.addEventListener('click',_ =>{
  const RestPass = document.getElementById('RestPass').value ;
  const confirmPass = document.getElementById('confirmPass').value ;
  //console.log(RestPass)
  sendToken(RestPass,confirmPass,localStorage.getItem('token'));
  /*(async ()=>{
     const token = await resetPassword();
     sendToken(RestPass,confirmPass,token);
  })()*/
 
})


