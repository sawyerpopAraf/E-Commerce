// Function to handle the search by name
function searchByName(name) {
    fetch('/search/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers like authorization if needed
      },
      body: JSON.stringify({ product: name })
    })
    .then(response => response.json())

    .then(data => {
      console.log('Search by name results:', data);
      // Handle the results here
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  // Function to handle the search by brand
  function searchByBrand(brand) {
    fetch('/search/brand', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers like authorization if needed
      },
      body: JSON.stringify({ brand: brand })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Search by brand results:', data);
      // Handle the results here
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  // Function to handle the search by category
  function searchByCategory(category) {
    fetch('/search/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers like authorization if needed
      },
      body: JSON.stringify({ category: category })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Search by category results:', data);
      // Handle the results here
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  // Event listeners for the search fields
  document.getElementById('searchFieldByName').addEventListener('input', function(event) {
    searchByName(event.target.value);
  });
  
  document.getElementById('searchFieldBrand').addEventListener('change', function(event) {
    searchByBrand(event.target.value);
  });
  
  document.getElementById('searchFieldCategory').addEventListener('change', function(event) {
    searchByCategory(event.target.value);
  });
  