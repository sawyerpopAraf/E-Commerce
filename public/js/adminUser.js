document.querySelectorAll('.updateRole').forEach(button=>{
    button.addEventListener('click',function(){
        let id=this.getAttribute('data-id')
    
        Swal.fire({
            title:"You will update this user to Admin",
            text: "This user will get role as Admin and get access to all Admin routes",
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