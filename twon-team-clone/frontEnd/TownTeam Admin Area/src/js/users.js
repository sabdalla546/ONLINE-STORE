async function fetch(method,url,data={}){
    try{
        const res =await axios ({
            method:method,
            url: url,
            data:data
        });
        
       //console.log(catId);
        return res;
    }catch(err){
        console.log(err)
    }
    };


(async function getAllUsers(){
    const res = await fetch('GET','http://[::1]:3000/api/user/');
    let content ='';
    for(let i=0 ;i < res.data.data.length; i++){
         content+= `
         <div class="productone">
         <div class="productonedata">     
            
             <div class="productdeta">
                 <h3 class="productstitle">${res.data.data[i].name}</h3>
                 <p class="productsdesc">${res.data.data[i].email}</p>
                 <p class="productsdesc">${res.data.data[i].role}</p>
             </div> 

         </div>    
         <div>
             <a class="editbtn delete-user"  userId=${res.data.data[i]._id}>Delete</a> 
             <a class="editbtn" userId=${res.data.data[i]._id}>Edit</a> 
         </div>  
     </div>

         `
    }
    document.getElementById('userview').innerHTML= content;

    // delete user
    const deletBtn = document.querySelectorAll('.delete-user');
    for(let i= 0 ; i< deletBtn.length ;i++){
        deletBtn[i].addEventListener('click',async e=>{
            const userId= deletBtn[i].getAttribute('userId');
            console.log(userId);
            const res= await fetch('DELETE',`http://[::1]:3000/api/user/${userId}`);
            window.location.reload();
        })
       }
    console.log(deletBtn);
}) () ; 

// add admin or user

document.getElementById('add-user').addEventListener('click', async e=>{
   e.preventDefault();
    const name = document.getElementById('user-name').value ;
    const email = document.getElementById('user-email').value ;
    const role = document.getElementById('role').value ;
    const password = document.getElementById('pass').value ;
    const res = await fetch('POST','http://[::1]:3000/api/user/createUserorAdmin',{name,email,role:role,password});
    window.location.reload();
})