fetch('http://backend.restapi.co.za/items/products')
.then(res=>res.json())
.then(data=>console.log(data))
.catch(err=>console.log(err))