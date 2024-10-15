// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navbarMenu = document.querySelector('.navbar-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    navbarMenu.classList.toggle('active');
});

// Form Submission Handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Capture form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple validation
    if (name === '' || email === '' || message === '') {
        document.getElementById('formMessage').innerText = 'Please fill in all fields.';
        document.getElementById('formMessage').style.color = 'red';
        return;
    }

    // Send data to the server
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('formMessage').innerText = 'Message sent successfully!';
            document.getElementById('formMessage').style.color = 'green';
        } else {
            document.getElementById('formMessage').innerText = 'Failed to send message.';
            document.getElementById('formMessage').style.color = 'red';
        }
        
        // Hide the message after 3 seconds
        setTimeout(() => {
            document.getElementById('formMessage').innerText = '';
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('formMessage').innerText = 'Failed to send message.';
        document.getElementById('formMessage').style.color = 'red';
        
        // Hide the message after 3 seconds
        setTimeout(() => {
            document.getElementById('formMessage').innerText = '';
        }, 3000);
    });

    // Clear the form
    document.getElementById('contactForm').reset();
});
