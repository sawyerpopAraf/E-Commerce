document.getElementById('searchButton').addEventListener('click', function(event) {
     var nameValue=document.getElementById('byName').value 
     var brandValue=document.getElementById('byBrand').value
     console.log(brandValue) 
     var categoryValue=document.getElementById('byCategory').value 
     
     var url
     var body
     if(nameValue){
      url='/search/product'
      body=JSON.stringify({product:nameValue})
     }
     else if(brandValue){
      url='/search/brand'
      body=JSON.stringify({brand:brandValue})
     }
     else if(categoryValue){
      url='/search/category'
      body=JSON.stringify({category:categoryValue})
     }

     fetch(url,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:body
     })
     .then(res=>res.json())
     .then(data=>updateSearchTable(data.data.result))
     .catch((error)=>console.log(error))

     document.getElementById('originalTable').style.display = 'none';
     document.getElementById('searchResultsTable').style.display = 'block';
});




document.getElementById('clearButton').addEventListener('click', function(event) {
  document.getElementById('originalTable').style.display = 'block';
  document.getElementById('searchResultsTable').style.display = 'none';
  document.getElementById('byName').value=""
  document.getElementById('byBrand').value=""
  document.getElementById('byCategory').value=""

});

function updateSearchTable(products){
  var tableBody=document.querySelector('#searchResultsTable .table tbody')
  tableBody.innerHTML = ''
  products.forEach(function(product) {
    var row = `<tr>
                <td><img src="${product.imageUrl}" alt="Product Image"></td>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.brandName}</td>
                <td>${product.categoryName}</td>
                <td><button id="editProductBtn" class="btn btn-success">
                <i class="fa-regular fa-pen-to-square"></i>Edit</button></td>
               </tr>`;
    tableBody.innerHTML += row;
});
}