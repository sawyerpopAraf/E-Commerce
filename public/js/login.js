$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        var formObject = {};
        var formData = $(this).serializeArray();
        $.each(formData, function() {
            formObject[this.name] = this.value;
        });
        console.log(formObject);

        $.ajax({
            url: '/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formObject),
            success: function(data) {
                if (data.status == "fail") {
                    alert("Right username/password required");
                } else if (data.status == "success") {
                    if (data.data.role == "User") {
                        alert("You are not authorized to this page");
                    } else if (data.data.role == "Admin") {
                        // Token is now stored in an HTTP-only cookie, so we don't need to store it in localStorage.
                        window.location.href = '/admin/products'; // Redirect if admin
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                alert('An error occurred during login');
            }
        });
    });
});



