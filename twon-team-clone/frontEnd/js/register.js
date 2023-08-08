const register = async(name,email,password,passwordConfirm)=>{
    try{
        const res =await axios ({
            method:'POST',
            url: "http://[::1]:3000/api/user/register",
            data:{
                name,
                email,
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


const reg = document.getElementById("btnRegister");
console.log(reg)
document.getElementById("btnRegister").addEventListener('click',e =>{
    const name = document.getElementById('R-userName').value ;
    const email = document.getElementById('R-email').value ;
    const password = document.getElementById('R-password').value ;
    const passwordConfirm = document.getElementById('pass-conf').value ;
    console.log('114')
    register(name,email,password,passwordConfirm);
});