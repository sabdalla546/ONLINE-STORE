const login = async(email,password)=>{
    try{
        const res =await axios ({
            method:'POST',
            url: "http://[::1]:3000/api/user/login",
            data:{
                email,
                password
            }
        });
        //console.log(res.data.user)
        if(res.data.status=== 'success'){
            if(res.data.data.user.role == 'admin' || res.data.user.role == 'super admin'){
                window.location.replace('/ONLINE-STORE/twon-team-clone/frontEnd/TownTeam%20Admin%20Area/index.html');
            }else{
               
                    window.location.replace('/ONLINE-STORE/twon-team-clone/frontEnd/index.html');
                  
            }
          
        }
        console.log(res);
    }catch(err){
        console.log(err)
    }
    }


document.getElementById('login').addEventListener('click',e =>{
    const email = document.getElementById('userName').value ;
    const password = document.getElementById('pass').value ;
    login(email,password)
});

const loginGoogle = async()=>{
    try{
        const res =await axios ({
            method:'GET',
            url: "http://localhost:3000/api/user/google",
        });
        
    }catch(err){
        console.log(err)
    }
}
// login with google
const googleBtn = document.querySelector('.sociallogin');
googleBtn.addEventListener('click',_ =>{
    loginGoogle()
})