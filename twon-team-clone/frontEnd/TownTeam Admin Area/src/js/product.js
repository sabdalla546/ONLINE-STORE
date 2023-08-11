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

    
(async function getAllProduct(){
   const res= await fetch('GET',"http://[::1]:3000/api/product/");
   //console.log(res.data.data.products);
   console.log(res.data.data.products[0].images[0])
   let content ='';
   for(let i=0 ;i < res.data.data.products.length; i++){
        content+= `
        <div class="productone">
        <div class="productonedata">     
            <img class="productsimg" src="../../../../../../ONLINE-STORE/twon-team-clone/frontEnd/${res.data.data.products[i].images[0]}">
            <div class="productdeta">
                <h3 class="productstitle">${res.data.data.products[i].title}</h3>
                <p class="productsdesc">${res.data.data.products[i].category}</p>
                <p class="productsdesc">${res.data.data.products[i].color}</p>
                <span class="productsdesc">${res.data.data.products[i].price}</span>
                <span class="productsdesc">${res.data.data.products[i].discount}</span>
                <p class="productsdesc">${res.data.data.products[i].quantity}</p>
            </div> 
        </div>    
        <div>
        <a class="editbtn">Edit</a>   
        <a class="editbtn edit-product" productId="${res.data.data.products[i]._id}">Delete</a>
        </div>   
    </div>
        `
   }
   document.getElementById('productsview').innerHTML= content;
   const deletProduct = document.querySelectorAll('.edit-product');
   for(let i= 0 ; i< deletProduct.length ;i++){
    deletProduct[i].addEventListener('click',async e=>{
        const productId= deletProduct[i].getAttribute('productId');
        console.log(productId);
        const res= await fetch('DELETE',`http://[::1]:3000/api/product/${productId}`);
        window.location.reload();
    })
   }
   console.log(deletProduct);
})();

