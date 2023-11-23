function initData() {
    fetch('http://backend.restapi.co.za/items/products')
      
        .then(res => res.json())
        .then(response => {
            const brandNames = response.data.map(product => product.brand);
            console.log(brandNames);
            return brandNames; 
            for(entry of red// If you need to use brandNames later in the chain.
        })
        .catch(err => console.log(err));
}

initData()