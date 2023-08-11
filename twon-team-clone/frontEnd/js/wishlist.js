async function fetch(method,url,data={}){
    try{
        const res =await axios ({
            method:method,
            url: url,
            data:data,
            
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('user-token')}`
                
                }
              
        });
          
      

        return res;
    }catch(err){
        console.log(err)
    }
    };

    (async function getAllProduct(){
        const res= await fetch('GET',"http://[::1]:3000/api/user/wishList");
        //console.log(res.data.data.products);
        console.log(res.data.wishList)
        let content ='';
        for(let i=0 ;i < res.data.wishList.length; i++){
             content+= `
             <div id="productone" class="productone showimg2">
             <em id="productDiscount" class="productDiscount">50%</em>
             <div class="addtofav" id="addtofav" onclick="addToFav()">
                 <span id="addtofavicn" class="material-symbols-outlined favicn" product-id='${res.data.wishList[i]._id}'>favorite</span>
             </div>
             <img class="productimg shown" src="../../../../ONLINE-STORE/twon-team-clone/frontEnd/${res.data.wishList[i].images[0]}">
            
             <div class="productDetails">
                 <p class="productName">${res.data.wishList[i].title}</p>
                 <em class="productSKU">${res.data.wishList[i].description}</em>
                 <div id="productPrice">
                     <span id="currentPrice">LE ${res.data.wishList[i].discount}</span>
                     <span id="OldPrice">LE ${res.data.wishList[i].price}</span>
                 </div>
                 <div id="productRating">
                     <span class="material-symbols-outlined ratingfull">star</span>
                     <span class="material-symbols-outlined ratingfull">star</span>
                     <span class="material-symbols-outlined ratingfull">star</span>
                     <span class="material-symbols-outlined ratingfull">star</span>
                     <span class="material-symbols-outlined ratinghalf">star_half</span>
                 </div>
                 <button class="addToCart">Add To Cart</button>
             </div>
         </div>
             `
        }
        document.getElementById('productsArea').innerHTML= content;
        
     })(); 