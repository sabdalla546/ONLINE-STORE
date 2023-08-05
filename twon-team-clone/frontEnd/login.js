let infobox = document.getElementById ("infobox");
let ggleLogin = document.getElementById ("ggleLogin");
let ggleLogPop = document.getElementById ("g_id_onload");
let loginArea = document.getElementById ("loginArea");
let gAccount;
let google;
let gjti = localStorage.getItem("GACCJTI")
let gAvat = localStorage.getItem("GACCAVAT")
let gName = localStorage.getItem("GACCNAME")
let ggID = localStorage.getItem("GACCID")
let gloguot = document.getElementById ("gloguot");
let signupbtn = document.getElementById ("signup-btn");
let clientName = document.getElementById ("clientName");
let clientID = document.getElementById ("clientID");
let clientMenu = document.getElementById ("client-menu");
let profileNav = document.getElementById ("profile");
let logOutbtn = document.getElementById ("logout");
let body = document.getElementById ("mainbody");


function loginByGgle(response){
gAccount = jwt_decode(response.credential)
localStorage.setItem("GACCNAME",gAccount.given_name)
localStorage.setItem("GACCAVAT",gAccount.picture)
localStorage.setItem("GACCJTI",gAccount.jti)
localStorage.setItem("GACCID",gAccount.jti.slice(0, 10))
window.location.href = "/";
}


if(gjti){
    ggleLogPop.setAttribute("data-auto_prompt", "false")
}

if(gName){
    profileNav.innerHTML=`
    <div id="gglprofile" class="gglprofile" tabindex="-1">
        <img id="loginimg" class="loginimg" src="${gAvat}">
        <div id="quickProfile" class="quickProfile">
            <h4 id="userName">Hello ${gName},</h4>
            <p id="userId">${ggID}</p>
            <a class="dashboard" href="/dashboard">Dashboard</a>
            <button class="logoutbtn" onclick="glogOut()">Logout</button>
        </div>
    </div>
    `
    // logOutbtn.innerHTML=`<button class="logoutbtn" onclick="glogOut()">Logout</button>`

}

// document.getElementById("quickProfile").style.display="flex" 


setTimeout( function(){ 
$(document).ready(function(){
    $(document).click(function(e){
        if ($(e.target).is('#loginimg')) {
            return document.getElementById("quickProfile").style.display="flex";
        }
        else
        {
            document.getElementById("quickProfile").style.display="none";
        }
    });
});
}  , 1000 );


// function showmenu(){
//     document.getElementById("quickProfile").style.display="flex";
// }

function glogOut(){
    localStorage. clear();
    window.location.href = "/";
}


// body.onclick = function(){
//     document.getElementById("quickProfile").style.display="none";
// };


// {
//     "iss": "https://accounts.google.com",
//     "nbf": 1689249369,
//     "aud": "700982963268-gjtar2fecfrodp39dh5g0d3nr5lrm47j.apps.googleusercontent.com",
//     "sub": "107194412677219313195",
//     "email": "ads@blackoxdesign.com",
//     "email_verified": true,
//     "azp": "700982963268-gjtar2fecfrodp39dh5g0d3nr5lrm47j.apps.googleusercontent.com",
//     "name": "BlackOx Advertising",
//     "picture": "https://lh3.googleusercontent.com/a/AAcHTtejRW8i8TW72z661BwNufiS9f7r7coMk-7B_Gk0alFL=s96-c",
//     "given_name": "BlackOx",
//     "family_name": "Advertising",
//     "iat": 1689249669,
//     "exp": 1689253269,
//     "jti": "3d9a16c3e2567e73227201b59da7a754d012d3a4"
// }




//DECODING//
!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var n="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(n){var t=String(n).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var r,o,i=0,a=0,d="";o=t.charAt(a++);~o&&(r=i%4?64*r+o:o,i++%4)?d+=String.fromCharCode(255&r>>(-2*i&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return d};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(n(e).replace(/(.)/g,(function(e,n){var t=n.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return n(t)}}function r(e){this.message=e}function o(e,n){if("string"!=typeof e)throw new r("Invalid token specified");var o=!0===(n=n||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new r("Invalid token specified: "+e.message)}}r.prototype=new Error,r.prototype.name="InvalidTokenError",window&&("function"==typeof window.define&&window.define.amd?window.define("jwt_decode",(function(){return o})):window&&(window.jwt_decode=o))}));





