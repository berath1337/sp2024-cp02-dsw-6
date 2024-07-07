const btn = document.getElementById("btn");

function validateForm(event) {
    event.preventDefault(); // Prevent form submission
    const form = document.getElementById('orderForm');
    const fields = [
        { id: 'form6Example1', message: 'Please enter your first name.' },
        { id: 'form6Example2', message: 'Please enter your last name.' },
        { id: 'form6Example4', message: 'Please enter your address.' },
        { id: 'form6Example5', message: 'Please enter a valid email address.' },
        { id: 'form6Example3', message: 'Please enter your preferred day of delivery.' }
    ];

    let isValid = true;

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const feedback = input.nextElementSibling;
        if (!input.value || input.value.length <= 2) {
            input.classList.add('is-invalid');
            feedback.textContent = field.message;
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            feedback.textContent = ''; // Clear feedback message
        }
    });

    if (!validatePhoneNumber()) {
        isValid = false;
    }

    if (!validatenameLastname()) {
        isValid = false;
    }

    if (isValid) {
        alert('Order placed successfully!');
        form.reset();
    }

    function validatePhoneNumber() {
        const phoneInput = document.getElementById('form6Example6');
        const feedback = phoneInput.nextElementSibling;
        const phonePattern = /^\d{9}$/; // Example pattern for a 9-digit phone number
        if (!phonePattern.test(phoneInput.value)) {
            phoneInput.classList.add('is-invalid');
            feedback.textContent = 'Please enter a valid phone number.';
            return false;
        } else {
            phoneInput.classList.remove('is-invalid');
            feedback.textContent = ''; // Clear feedback message
            return true;
        }
    }

    function validatenameLastname() {
        const nameFields = [
            { id: 'form6Example1', message: 'First name can only contain letters.' },
            { id: 'form6Example2', message: 'Last name can only contain letters.' }
        ];
        const lettersOnlyPattern = /^[A-Za-z]+$/;
        let isValid = true;

        nameFields.forEach(field => {
            const input = document.getElementById(field.id);
            const feedback = input.nextElementSibling;
            if (!lettersOnlyPattern.test(input.value)) {
                input.classList.add('is-invalid');
                feedback.textContent = field.message;
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                feedback.textContent = ''; // Clear feedback message
            }
        });

        return isValid;
    }
}

btn.addEventListener("click", function(e) {
    validateForm(e);
});

