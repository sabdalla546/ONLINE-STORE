

    (async function getCategories(){
        try{
            const res =await axios ({
                method:'GET',
                url: "http://localhost:3000/api/category",
               
            });
            let content = '';
            console.log(res.data.data.length);
            for(let i =0 ;i < res.data.data.length ; i++){
                content+= `
               
                <p>${res.data.data[i].title}</p>
               
                
                `
            }
            document.getElementById('show-categories').innerHTML = content;
           
           // delete catergory by id
    
          
          
        }catch(err){
            console.log(err)
        }
        })();

      function showMe(){
        document.getElementById('show-container').style.display= 'block';
      }