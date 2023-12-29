document.getElementById('addBrand').addEventListener('click',function(){
    Swal.fire({
        title: 'Add New Brand',
        html: `
          <input type="text" id="name" class="swal2-input" placeholder="Brand Name">
        
        `,
        confirmButtonText: 'Add Brand',
        focusConfirm: false,
        preConfirm: () => {
          const brandname = Swal.getPopup().querySelector('#name').value;
           if (!brandname ) {
            Swal.showValidationMessage('Please fill in all fields');
          }
      
          return { brandname };
        }
      }).then((result) => {
        if (result.isConfirmed) {
         
          fetch('/admin/brands/addbrand', {
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
            Swal.fire('Brand Added')
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

document.querySelectorAll('.updateBrandBtn').forEach(button=>{
    button.addEventListener('click',function(){
        let id=this.getAttribute('data-id')
    
        Swal.fire({
            title:"update brand",
            html:`
            <input type="text" id="name" class="swal2-input" placeholder="Product Name">
        `,
            confirmButtonText: 'update brand name',
            focusConfirm: false,
            preConfirm: () => {
                const newbrand = Swal.getPopup().querySelector('#name').value;
                
            
               if (!newbrand) {
                  Swal.showValidationMessage('Please fill in all fields');
                }
            
                return { newbrand};
              }
        }).then((result)=>{
            if (result.isConfirmed) {
         
                fetch('/admin/brands/updatebrand/'+id, {
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
                  Swal.fire('Brand Updated')
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

document.querySelectorAll('.deleteBrandBtn').forEach(button => {
    button.addEventListener('click', function() {
      let id = this.getAttribute('data-id');
  
      Swal.fire({
        title: "You are about to delete this brand!!!",
        text: "This brand will be deleted from the database",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          fetch('/admin/brands/deletebrand/'+id, {  
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
              Swal.fire('Deleted!', 'Brand deleted', 'success').then(() => {
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
  