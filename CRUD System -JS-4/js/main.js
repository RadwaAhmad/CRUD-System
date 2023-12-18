


var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDesc");
var productCategory = document.getElementById("productCat");

var searchInput = document.getElementById("searchInput");


var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");

var indexUpdate=0;

var productList =[];


if (localStorage.getItem("product")!=null){ 
    productList = JSON.parse(localStorage.getItem("product"))

    displayData()

 
}


function addProduct(){
if (validationName() == true && validationPrice() == true ) {
    var product = {
        name:productName.value,
        price: productPrice.value,
        Description: productDescription.value,
        Category: productCategory.value,
    };

    productList.unshift(product);

    localStorage.setItem("product", JSON.stringify(productList));

    clearInput();
    displayData();

    }


}



function clearInput(){

    productName.value="";
    productPrice.value="";
    productDescription.value="";
    productCategory.value="";

}

function displayData(){

    var cartona = "";

    for( i=0 ; i<productList.length ; i++ ){
        cartona += `
        <tr  class=" text-center">
        <td>${productList[i].newName ? productList[i].newName : productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].Category}</td>
        <td>${productList[i].Description}</td>
        <td>         
            <button class=" px-2 my-1 btn btn-outline-warning btn-sm " onclick=(setData(${i}))> Update </button>
            <button class=" px-2 my-1 btn btn-outline-danger btn-sm " onclick=(deleteProduct(${i}))> Delete </button>
        </td>

    </tr>`
    }

    document.getElementById("tableBody").innerHTML=cartona;
}



function deleteProduct(index){

    productList.splice(index,1);
    localStorage.setItem("product", JSON.stringify(productList));

    displayData();
}



function searchProduct(){

    var term = searchInput.value;


    var cartona = "";
    for( i=0 ; i<productList.length ; i++ ){

            if( productList[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase()) ) {

                 productList[i].newName = productList[i].name.toLocaleLowerCase().replace((term.toLocaleLowerCase()), `<span class=" text-danger">${term}</span>`)

        cartona += `
        <tr  class=" text-center">
        <td>${productList[i].newName ? productList[i].newName : productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].Description}</td>
        <td>${productList[i].Category}</td>
        <td>         
            <button class=" px-2 my-1 btn btn-outline-warning btn-sm "> Update </button>
            <button class=" px-2 my-1 btn btn-outline-danger btn-sm " onclick=(deleteProduct(${i}))> Delete </button>
        </td>

    </tr>`}
    }

    document.getElementById("tableBody").innerHTML=cartona;

}



function setData(index){

    indexUpdate = index;

    var currentProduct = productList[index]

    productName.value = currentProduct.name;
    productPrice.value = currentProduct.price;
    productDescription.value = currentProduct.Description;
    productCategory.value = currentProduct.Category;


    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
}


function updateProduct(){
    var product = {
        name:productName.value,
        price: productPrice.value,
        Description: productDescription.value,
        Category: productCategory.value,
    };

    productList.splice( indexUpdate ,  1 , product);

    localStorage.setItem("product", JSON.stringify(productList));

    displayData();
    clearInput();

    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
}





// ------  V A L I D A T I O N  --------



function validationName(){
    var messageName=document.getElementById("messageName")

    var regexName = /^[A-Z][a-z]{2,8}$/
    var text = productName.value 


    
    if (regexName.test(text) == true) {

        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid');
        messageName.classList.add("d-none")

        return true;

        
    }


    else{

        productName.classList.add('is-invalid');
        productName.classList.remove('is-valid');
        messageName.classList.remove("d-none")

        return false;
    }
  
    
   

}


function validationPrice(){
    var messagePrice = document.getElementById("messagePrice")

    var regexName = /^\d{2,6}$/
    var text = productPrice.value 


    
    if (regexName.test(text) == true) {

        productPrice.classList.add('is-valid');
        productPrice.classList.remove('is-invalid');
        messagePrice.classList.add("d-none")

        return true;

        
    }


    else{

        productPrice.classList.add('is-invalid');
        productPrice.classList.remove('is-valid');
        messagePrice.classList.remove("d-none")

        return false;
    }
  
    
   

}




// -----Global function

function emptyInput(){
     if (productName.value=="") {
        messageName.classList.add("d-none");
        productName.classList.remove('is-invalid');
        productName.classList.remove('is-valid');

    }
     if (productPrice.value=="") {
        messagePrice.classList.add("d-none");
        productPrice.classList.remove('is-invalid');
        productPrice.classList.remove('is-valid');

    }
}




















/*

// Regex ==> Regular Expression is pattern,
 consists of number of letters and spetial charachters
 returns false/NoMatch or true/Match

Syntax= /code or pattern to be checked/
anything in regex as general must be in the data or text
without any spetial charachters
**** checked as block 
ex: /a/ --> PATTERN
    ahmad --> TEXT

    Does the text has or includes the pattern?
    if yes = True
    if No = False

    AND STOPS 
    it doesn't proceed checking

ex: /[A-Z][a-z]{2,8}/

    **Anything written in square brackets used as "or"
    also "single characters"

    **Anything written in curly brackets used as "Range"
    but on the immediete previous character 

for the above example,,,,,

    first character one capital character, 
    second character from 2 to 8 small characters

-----

website:
(regex 101.com)

AT THE END ((( $ ))) 

constricts at the end the pattern after the pattern
dollar sign is used to constrict the pattern 
to the text. 


AT THE BEGINNING (((^))) power

constricts the pattern from the beginning 


(?) ====> 0 or 1
(*) ====> 0 or more.
(+) ====> 1 or more 
(\s) ===> Instead of the space 
(()) ===> Round brackets means group

(\d) ===> Digits numbers from 0 to 9
(\D) ===> Anything but numbers from 0 to 9

(\w) ===> Anything but spetial characters "no.s/letters/capital or small"
(\W) ===> the opposite of the above

to delete any reserved word in the regex
we use backslash (\)
for example the dot allows entry of any character
if i want to use it as dot only we use backslash (\)
before it


------------------------------------------------


flags in regex

- Global, to match all that matches not the first one 
foe ex:
 (/a/g) or (/a/gi) "global and insensetive" ===> matches any a not only the first  one

- insensetive , disables the case sensetevity




we can use regex with the flag in the replace 
if we want to change certain letters 

ex:
 var text = "ahmedAli"
 var x = text.replace( /a/gi , "b")
 console.log(x)

 ====> bhmedbli.





 */
