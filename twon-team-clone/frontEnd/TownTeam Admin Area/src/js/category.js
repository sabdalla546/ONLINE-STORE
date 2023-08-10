async function editCategoryFun(title,categoryId){
    try{
        const res =await axios ({
            method:'PUT',
            url: `http://localhost:3000/api/category/${categoryId}`,
            data:{
                title
            }
        });
       //console.log(catId);
        
    }catch(err){
        console.log(err)
    }
    };

    async function deleteCategory(catId){
        try{
            const res =await axios ({
                method:'DELETE',
                url: `http://localhost:3000/api/category/${catId}`
                
            });
           console.log(catId);
            
        }catch(err){
            console.log(err)
        }
        };

        
(async function getCategories(){
    try{
        const res =await axios ({
            method:'GET',
            url: "http://localhost:3000/api/category",
           
        });
        let content = '';
        console.log(res.data);
        for(let i =0 ;i < res.data.data.length ; i++){
            content+= `
            <div class="catergort-items">
            <div class="categoryitm">${res.data.data[i].title}</div>
            <div>
            <button class="edit-category" category-id=${res.data.data[i]._id}>edit</button>
            <button class="delete-category" category-id=${res.data.data[i]._id}>delete</button>
           
            </div>
            </div>
            
            `
        }
        document.getElementById('render-category').innerHTML = content;
       
       // delete catergory by id

        const deleteBtn=document.querySelectorAll('.delete-category');
        for(let i=0 ; i< deleteBtn.length ; i++){
            deleteBtn[i].addEventListener('click',e=>{
                const categoryId= deleteBtn[i].getAttribute('category-id');
                console.log(categoryId);
                deleteCategory(categoryId);
                window.location.reload()
            })
        }
          //     edit category

        const editCategory =  document.querySelectorAll('.edit-category'); 
        for(let i=0 ; i< editCategory.length ; i++){
            editCategory[i].addEventListener('click',e=>{
                const categoryId= editCategory[i].getAttribute('category-id');
                console.log(categoryId);
                const showEdit = document.getElementById('contenar-edit');
                showEdit.style.display= 'block';
                const saveBtn = document.querySelector('.edit-category-html button');
                saveBtn.addEventListener('click', e=>{
                    const newValue = document.querySelector('.edit-category-html input').value ;
                    editCategoryFun(newValue,categoryId);
                    showEdit.style.display= 'none';
                     window.location.reload()
                })
                
                
               
            })
        }
    }catch(err){
        console.log(err)
    }
    })();

    async function addCategory(title){
        try{
            const res =await axios ({
                method:'POST',
                url: "http://localhost:3000/api/category",
                data:{
                   title
                }
            });
           
            
        }catch(err){
            console.log(err)
        }
        };
       
           
     // add category   
    document.getElementById('add-category').addEventListener('click',e=>{
        e.preventDefault;
        const newCategory= document.getElementById('new-category').value ;
        addCategory(newCategory);
        
    });

