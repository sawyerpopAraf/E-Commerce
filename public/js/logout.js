document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault();
    fetch('/logout', {
        method: 'POST',
        credentials: 'include' 
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = '/'; 
        } else {
            console.error('Logout failed:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});