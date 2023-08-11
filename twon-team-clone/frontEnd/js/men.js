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
        const res= await fetch('GET',"http://[::1]:3000/api/product/?category=men");
        //console.log(res.data.data.products);
        console.log(res.data.data.products[0].images[0])
        let content ='';
        for(let i=0 ;i < res.data.data.products.length; i++){
             content+= `
             <div id="productone" class="productone showimg2">
             <em id="productDiscount" class="productDiscount">50%</em>
             <div class="addtofav" id="addtofav" onclick="addToFav()">
                 <span id="addtofavicn" class="material-symbols-outlined favicn">favorite</span>
             </div>
             <img class="productimg shown" src="../../../../ONLINE-STORE/twon-team-clone/frontEnd/${res.data.data.products[i].images[0]}">
            
             <div class="productDetails">
                 <p class="productName">${res.data.data.products[i].title}</p>
                 <em class="productSKU">${res.data.data.products[i].description}</em>
                 <div id="productPrice">
                     <span id="currentPrice">LE ${res.data.data.products[i].discount}</span>
                     <span id="OldPrice">LE ${res.data.data.products[i].price}</span>
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