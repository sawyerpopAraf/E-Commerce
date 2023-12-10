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
               })
                .catch(error => {
                 Swal.fire('Error:', error);
                });
              }
        })
    })
})