document.querySelectorAll('.updateOrder').forEach(button=>{
    button.addEventListener('click',function(){
        let id=this.getAttribute('data-id')
    
        Swal.fire({
            title:"update order status",
            html: `
            <select id="status" class="swal2-select">
                <option value="" disabled selected>Select Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Ordered">Ordered</option>
                <option value="Completed">Completed</option>
            </select>
        `,
            confirmButtonText: 'update',
            focusConfirm: false,
            preConfirm: () => {
                const newStatus = Swal.getPopup().querySelector('#status').value;          
               return { newStatus};
              }
        }).then((result)=>{
            if (result.isConfirmed) {
         
                fetch('/admin/orderstatus/'+id, {
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
                  Swal.fire('Status Updated')
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