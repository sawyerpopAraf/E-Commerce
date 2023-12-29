document.getElementById('addCategory').addEventListener('click',function(){
    Swal.fire({
        title: 'Add New Category',
        html: `
          <input type="text" id="name" class="swal2-input" placeholder="Category Name">
        
        `,
        confirmButtonText: 'Add Category',
        focusConfirm: false,
        preConfirm: () => {
          const categoryname = Swal.getPopup().querySelector('#name').value;
           if (!categoryname ) {
            Swal.showValidationMessage('Please fill in all fields');
          }
      
          return { categoryname };
        }
      }).then((result) => {
        if (result.isConfirmed) {
         
          fetch('/admin/categories/addcategory', {
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
            Swal.fire('Category Added')
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

document.querySelectorAll('.updateCategoryBtn').forEach(button=>{
    button.addEventListener('click',function(){
        let id=this.getAttribute('data-id')
    
        Swal.fire({
            title:"update category",
            html:`
            <input type="text" id="name" class="swal2-input" placeholder="Product Name">
        `,
            confirmButtonText: 'update category name',
            focusConfirm: false,
            preConfirm: () => {
                const newcategory = Swal.getPopup().querySelector('#name').value;
              if (!newcategory) {
                  Swal.showValidationMessage('Please fill in all fields');
                }
               return { newcategory};
              }
        }).then((result)=>{
            if (result.isConfirmed) {
         
                fetch('/admin/categories/updatecategory/'+id, {
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
                  Swal.fire('Category Updated')
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

document.querySelectorAll('.deleteCategoryBtn').forEach(button => {
    button.addEventListener('click', function() {
      let id = this.getAttribute('data-id');
  
      Swal.fire({
        title: "You are about to delete this Category!!!",
        text: "This category will be deleted from the database",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          fetch('/admin/categories/category/'+id, {  
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
              Swal.fire('Deleted!', 'Category deleted', 'success').then(() => {
                location.reload();
              });
            } else if(data.status==="error"){
                Swal.fire(data.message)
            }
          })
          .catch(error => {
            Swal.fire('Error', error.toString(), 'error');
          });
        }
      });
    });
  });