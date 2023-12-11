document.getElementById('addProduct').addEventListener('click',function(){
    Swal.fire({
        title: 'Add New Product',
        html: `
          <input type="text" id="name" class="swal2-input" placeholder="Product Name">
          <input type="number" id="price" class="swal2-input" placeholder="Price">
          <input type="text" id="description" class="swal2-input" placeholder="Description">
          <input type="text" id="imageUrl" class="swal2-input" placeholder="Image URL">
          <input type="number" id="quantity" class="swal2-input" placeholder="Quantity">
          <input type="text" id="brandId" class="swal2-input" placeholder="Brand ID">
          <input type="text" id="categoryId" class="swal2-input" placeholder="Category ID">
        `,
        confirmButtonText: 'Add Product',
        focusConfirm: false,
        preConfirm: () => {
          const name = Swal.getPopup().querySelector('#name').value;
          const price = Swal.getPopup().querySelector('#price').value;
          const description = Swal.getPopup().querySelector('#description').value;
          const imageUrl = Swal.getPopup().querySelector('#imageUrl').value;
          const quantity = Swal.getPopup().querySelector('#quantity').value;
          const brandId = Swal.getPopup().querySelector('#brandId').value;
          const categoryId = Swal.getPopup().querySelector('#categoryId').value;
      
        
          if (!name || !price || !description || !imageUrl || !quantity || !brandId || !categoryId) {
            Swal.showValidationMessage('Please fill in all fields');
          }
      
          return { name, price, description, imageUrl, quantity, brandId, categoryId };
        }
      }).then((result) => {
        if (result.isConfirmed) {
         
          fetch('/admin/addproduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(result.value)
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
           if (data.status=="success"){
            Swal.fire('Product Added')
            .then(()=>
            location.reload()) 
           }
         })
          .catch(error => {
           Swal.fire('Error:', error);
          });
        }
      });
})

document.querySelectorAll('.editProductBtn').forEach(button=>{
    button.addEventListener('click',function(){
        let productId=this.getAttribute('data-id')
    
        Swal.fire({
            title:"update product",
            html:`
            <input type="text" id="name" class="swal2-input" placeholder="Product Name">
            <input type="number" id="price" class="swal2-input" placeholder="Price">
            <input type="text" id="description" class="swal2-input" placeholder="Description">
            <input type="text" id="imageUrl" class="swal2-input" placeholder="Image URL">
            <input type="number" id="quantity" class="swal2-input" placeholder="Quantity">
            <input type="text" id="brandId" class="swal2-input" placeholder="Brand ID">
            <input type="text" id="categoryId" class="swal2-input" placeholder="Category ID">
            `,
            confirmButtonText: 'Add Product',
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value;
                const price = Swal.getPopup().querySelector('#price').value;
                const description = Swal.getPopup().querySelector('#description').value;
                const imageUrl = Swal.getPopup().querySelector('#imageUrl').value;
                const quantity = Swal.getPopup().querySelector('#quantity').value;
                const brandId = Swal.getPopup().querySelector('#brandId').value;
                const categoryId = Swal.getPopup().querySelector('#categoryId').value;
            
               if (!name || !price || !description || !imageUrl || !quantity || !brandId || !categoryId) {
                  Swal.showValidationMessage('Please fill in all fields');
                }
            
                return { name, price, description, imageUrl, quantity, brandId, categoryId };
              }
        }).then((result)=>{
            if (result.isConfirmed) {
         
                fetch('/admin/updateproduct/'+productId, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                  body: JSON.stringify(result.value)
                })
                .then(response => response.json())
                .then(data => {
                  console.log(data)
                 if (data.status=="success"){
                  Swal.fire('Product Updated')
                  .then(()=>
                  location.reload()) 
                 }
                 else if(data.status=="error"){
                  Swal.fire(data.message)
                 }
               })
                .catch(error => {
                 Swal.fire('Error:', error);
                });
              }
        })
    })
})

document.querySelectorAll('.deleteProductBtn').forEach(button => {
  button.addEventListener('click', function() {
    let id = this.getAttribute('data-id');

    Swal.fire({
      title: "Do you want to delete this Product?",
      text: "Delete the product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('/admin/deleteproduct/'+id, {  
          method:'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
          
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
       })
        .then(data => {
          if (data.status === "success") {  
            Swal.fire('Deleted!', 'Product deleted', 'success').then(() => {
              location.reload();
            });
          } 
        })
        .catch(error => {
          Swal.fire('Error', error.toString(), 'error');
        });
      }
    });
  });
});

document.querySelectorAll('.reactiveProductBtn').forEach(button => {
  button.addEventListener('click', function() {
    let id = this.getAttribute('data-id');

    Swal.fire({
      title: "Do you want to reactive this product?",
      text: "Reactive the product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('/admin/reactiveproduct/'+id, {  
          method:'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        .then(response => {
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(data.message || 'Unknown error');
            });
          }
          return response.json();
        })
        .then(data => {
          if (data.status === "success") {  
            Swal.fire('Product is no longer deleted').then(() => location.reload());
          }
          else if(data.status==="error"){
            Swal.fire('Error',data.message)
          }
        })
        .catch(error => {
          Swal.fire('Error', error.toString(), 'error');
        });
      }
    });
  });
});
