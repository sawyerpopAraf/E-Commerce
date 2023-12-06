console.log("Script outside loaded");

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Script loaded");

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        console.log("Form submitted");
        e.preventDefault();

        const formData = new FormData(this);
        fetch('/login', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === 'success') {
                localStorage.setItem('jwt', data.token);

                if (data.role === 'Admin') {
                    window.location.href = '/admin'; // Redirect to the admin page
                } else {
                    alert('You are not Admin');
                }
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login');
        });
    });
});

