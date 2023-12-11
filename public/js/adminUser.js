document.querySelectorAll('.updateRole').forEach(button=>{
    button.addEventListener('click',function(){
        let id=this.getAttribute('data-id')
    
        Swal.fire({
            title:"Update role ",
            text: "Are you sure you want to change this user's role ?",
            icon: 'warning',
            showCancelButton:true,
            confirmButtonText: 'Update',
            cancelButtonText: "Cancel",
        }).then((result)=>{
            if (result.isConfirmed) {
                fetch('/admin/role/'+id, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                  
                })
                .then(response => response.json())
                .then(data => {
                  console.log(data)
                 if (data.status=="success"){
                  Swal.fire('Role Updated')
                  .then(()=>
                  location.reload()) 
                 } else if (data.message=="User is no longer activate"){
                  Swal.fire('User is no longer activate')
                 }
               })
                .catch(error => {
                 Swal.fire('Error:', error);
                });
              }
        })
    })
})

document.querySelectorAll('.deleteUser').forEach(button=>{
    button.addEventListener('click',function(){
        let id=this.getAttribute('data-id')
    
        Swal.fire({
            title:"You will delete this User",
            text: "The User will be deleted from the database",
            icon: 'warning',
            showCancelButton:true,
            confirmButtonText: 'Delete',
            cancelButtonText: "Cancel",
        }).then((result)=>{
            if (result.isConfirmed) {
                fetch('/admin/users/'+id, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                  
                })
                .then(response => response.json())
                .then(data => {
                  console.log(data)
                 if (data.status=="success"){
                  Swal.fire('User deleted')
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

document.querySelectorAll('.activeUser').forEach(button=>{
  button.addEventListener('click',function(){
      let id=this.getAttribute('data-id')
  
      Swal.fire({
          title:"Do you want to reactive this user ?",
          text: "The User will be added back to database",
          icon: 'warning',
          showCancelButton:true,
          confirmButtonText: 'Addback',
          cancelButtonText: "Cancel",
      }).then((result)=>{
          if (result.isConfirmed) {
              fetch('/admin/users/'+id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                
              })
              .then(response => response.json())
              .then(data => {
                console.log(data)
               if (data.status=="success"){
                Swal.fire('User Addedback')
                .then(()=>
                location.reload()) 
               }else if (data.message=="This user is already active"){
                Swal.fire("This user is already active")
               }
             })
              .catch(error => {
               Swal.fire('Error:', error);
              });
            }
      })
  })
})