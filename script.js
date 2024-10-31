$(document).ready(function() {
    // Toggle dropdown on click for mobile devices
    $('.dropdown-toggle').on('click touchstart', function(event) {
        event.preventDefault(); 
        
        // Slide toggle the dropdown
        $(this).next('.dropdown').slideToggle();
        
        // Toggle the rotated class for the dropping icon
        $(this).find('.dropping').toggleClass('rotate');
    });

    // Close the dropdown if clicked outside
    $(document).on('click touchstart', function(event) {
        if (!$(event.target).closest('.navbar a').length) {
            $('.dropdown').slideUp(); // Slide up the dropdown menu
            $('.dropping').removeClass('rotate'); 
        }
    });

    // Move the notes on "What we do?"
    const $items = $('.trip-list div').css('opacity', 0);
    $(window).scroll(function() {
        $items.each(function(i) {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
                $(this)
                    .css('position', 'relative')
                    .css('left', i % 2 ? '30px' : '-30px')
                    .animate({
                        left: 0,
                        opacity: 1
                    }, 500);
            }
        });
    }).scroll();

    // Animation for the right contents of the contact HTML
    const $rightContents = $('.right-contents');

    function checkVisibility() {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        const elementTop = $rightContents.offset().top;

        if (elementTop < scrollTop + windowHeight) {
            $rightContents.addClass('show'); // Add the 'show' class
            $(window).off('scroll', checkVisibility); // Remove the scroll event listener
        }
    }

    $(window).on('scroll', checkVisibility); // Check visibility on scroll
    checkVisibility(); // Initial check when the page loads

    // Moving departments of contact us!
    $(window).on('scroll', function() {
        $('.contact-department').each(function() {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < windowBottom - 100) { 
                $(this).addClass('visible');
            }
        });
    });

    // Destination fade-in effect
    $('.row').each(function() {
        var element = this;
        new Waypoint({
            element: element,
            handler: function() {
                $(element).addClass('fade-in');
            },
            offset: '80%' 
        });
    });
});

// Script for submissions
document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    // Function to mark the valid input
    function markInvalid(input) {
        input.style.borderColor = "red";
    }

    // Function to reset the border color for input
    function resetBorder(input) {
        input.style.borderColor = "";
    }

    // Validation functions
    function validateName() {
        if (fullName.value.trim() === "") {
            markInvalid(fullName);
            return false;
        }
        resetBorder(fullName);
        return true;
    }

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            markInvalid(email);
            return false;
        }
        resetBorder(email);
        return true;
    }

    function validatePhone() {
        const phonePattern = /^\+?[0-9\s-]{7,15}$/;
        if (!phonePattern.test(phone.value.trim())) {
            markInvalid(phone);
            return false;
        }
        resetBorder(phone);
        return true;
    }

    function validatePassword() {
        if (password.value.trim().length < 8) {
            markInvalid(password);
            return false;
        }
        resetBorder(password);
        return true;
    }

    function validateConfirmPassword() {
        if (confirmPassword.value !== password.value) {
            markInvalid(confirmPassword);
            return false;
        }
        resetBorder(confirmPassword);
        return true;
    }

    // Form submission handler
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            signupForm.submit(); // Submit if all fields are valid
        }
    });

    // Real-time validation to clear the red border on focus
    [fullName, email, phone, password, confirmPassword].forEach(input => {
        input.addEventListener("input", () => resetBorder(input));
    });
});
