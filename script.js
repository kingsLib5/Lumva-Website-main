//modal pop-up
document.addEventListener("DOMContentLoaded", function() {
    const cooldownDays = 1;
    const millisecondsInADay = 86400000;
    const lastShownDate = localStorage.getItem('modalLastShownDate');
    const now = new Date().getTime();
    if (!lastShownDate || now - parseInt(lastShownDate) > cooldownDays * millisecondsInADay) {
        setTimeout(function() {
            var myModal = new bootstrap.Modal(document.getElementById('newsletter-modal'));
            myModal.show();
            localStorage.setItem('modalLastShownDate', now.toString());
        }, 10000);
    }
});

//word animation
const words = ["INNOVATIVE", "EFFICIENT", "RESPONSIVE", "QUALITY", "CREATIVE", "SECURE"];
        let currentIndex = 0;
        let currentWord = 1;
        function changeWord() {
            const wordElement1 = document.getElementById('word1');
            const wordElement2 = document.getElementById('word2');
            
            if (currentWord === 1) {
                wordElement2.classList.remove('show');
                setTimeout(() => {
                    wordElement1.textContent = words[currentIndex];
                    wordElement1.classList.add('show');
                }, 500);
                currentWord = 2;
            } else {
                wordElement1.classList.remove('show');
                setTimeout(() => {
                    wordElement2.textContent = words[currentIndex];
                    wordElement2.classList.add('show');
                }, 500);
                currentWord = 1;
            }
            currentIndex = (currentIndex + 1) % words.length;
        }
        setInterval(changeWord, 1000);
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('word1').textContent = words[currentIndex];
            document.getElementById('word1').classList.add('show');
            currentIndex++;
});
//numbers
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.number');
    const animationDuration = 2000;

    // Function to animate the count
    function animateCount(element, target, duration) {
        let startTimestamp = null;
        const isDecimal = target % 1 !== 0;
        const decimals = isDecimal ? target.toString().split('.')[1].length : 0;

        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const progressRatio = Math.min(progress / duration, 1);
            const currentValue = progressRatio * target;

            element.textContent = isDecimal
                ? currentValue.toFixed(decimals)
                : Math.floor(currentValue);

            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = isDecimal
                    ? target.toFixed(decimals)
                    : target;
            }
        }

        window.requestAnimationFrame(step);
    }

    // Function to start animation when element is in view
    function startAnimation(entry) {
        const target = parseFloat(entry.target.getAttribute('data-target'));
        animateCount(entry.target, target, animationDuration);
        observer.unobserve(entry.target); // Stop observing after animation starts
    }

    // Intersection Observer to detect when elements are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation(entry);
            }
        });
    }, {
        threshold: 0.5 // Adjust as needed (0.5 means 50% of the element must be in view)
    });

    // Observe all counter elements
    counters.forEach(counter => observer.observe(counter));
});

//services
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.service-item');
    const descriptions = document.querySelectorAll('.service-description');
    const selectElement = document.querySelector('#serviceSelect');

    function setActive(targetId) {
        items.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        descriptions.forEach(description => {
            if (description.id === targetId) {
                description.classList.add('active');
            } else {
                description.classList.remove('active');
            }
        });
        if (selectElement) {
            selectElement.value = targetId;
        }
    }
    items.forEach(item => {
        item.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            setActive(targetId);
        });
    });
    selectElement.addEventListener ('change', function () {
        const targetId = this.value;
        setActive(targetId);
    });
    setActive('service1');
});
//The Scroll-to Top icon
// Wait for the DOM to load first
document.addEventListener('DOMContentLoaded', function() {
    // Get the button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Check if button exists
    if (scrollToTopBtn) {
        console.log("Scroll to top button found");

        // Show the button when the user scrolls down 20px from the top
        window.onscroll = function() { scrollFunction(); };

        function scrollFunction() {
            // Debugging log to track scroll position
            console.log("Scroll position:", window.scrollY);
            
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        }

        // When the user clicks on the button, scroll to the top of the document
        scrollToTopBtn.onclick = function() {
            console.log("Scroll to top button clicked");
            window.scrollTo({
                top: 0, 
                behavior: 'smooth' // Smooth scrolling
            });
        };
    } else {
        console.error("Scroll to top button not found");
    }
});

// Function to handle newsletter form submission
document.getElementById('subscribeBtn').addEventListener('click', function() {
    const newsletterFormData = {
        email: document.getElementById('newsletter-email').value,
        formType: 'newsletter' // Specify the form type as "newsletter"
    };

    // Check if email is entered
    if (newsletterFormData.email) {
        fetch('http://localhost:3000/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newsletterFormData),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById('newsletter-email').value = ''; // Clear the email field after submission

            // Refresh the newsletter section by invoking showTable
            showTable('newsletter'); // Refresh the newsletter data dynamically
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter your email address.');
    }
});
 

//         // Function to save data to local storage
//         function saveToLocalStorage(formName, data) {
//             const existingData = JSON.parse(localStorage.getItem(formName)) || [];
//             existingData.push(data);
//             localStorage.setItem(formName, JSON.stringify(existingData));
//         }
    
//         // Handle submission for Contact Form
//         document.getElementById('submitContactForm').addEventListener('click', function() {
//             const firstName = document.getElementById('contact-first-name').value;
//             const lastName = document.getElementById('contact-last-name').value;
//             const email = document.getElementById('contact-email').value;
//             const message = document.getElementById('contact-message').value;
    
//             if (firstName && lastName && email && message) {
//                 const data = { firstName, lastName, email, message };
//                 saveToLocalStorage('contactForm', data);
//                 alert('Contact Form Submitted!');
//                 // Reset form fields
//                 document.getElementById('contact-first-name').value = '';
//                 document.getElementById('contact-last-name').value = '';
//                 document.getElementById('contact-email').value = '';
//                 document.getElementById('contact-message').value = '';
//             } else {
//                 alert('Please fill in all fields.');
//             }
//         });
    
//         // Handle submission for Modal Form
//         document.getElementById('sendMessageBtn').addEventListener('click', function() {
//             const firstName = document.getElementById('GIT-first-name').value;
//             const lastName = document.getElementById('GIT-last-name').value;
//             const email = document.getElementById('GIT-email').value;
//             const message = document.getElementById('GIT-message').value;
    
//             if (firstName && lastName && email && message) {
//                 const data = { firstName, lastName, email, message };
//                 saveToLocalStorage('modalForm', data);
//                 alert('Modal Form Submitted!');
//                 // Reset form fields
//                 document.getElementById('GIT-first-name').value = '';
//                 document.getElementById('GIT-last-name').value = '';
//                 document.getElementById('GIT-email').value = '';
//                 document.getElementById('GIT-message').value = '';
//                 document.getElementById('GIT-checkbox').checked = false; // Uncheck the checkbox
//                 const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
//                 modal.hide(); // Hide the modal after submission
//             } else {
//                 alert('Please fill in all fields.');
//             }
//         });
    
//         // Handle submission for Newsletter Form
//         document.getElementById('subscribeBtn').addEventListener('click', function() {
//             const email = document.getElementById('newsletter-email').value;
    
//             if (email) {
//                 const data = { email };
//                 saveToLocalStorage('newsletter', data);
//                 alert('Newsletter Subscribed!');
//                 // Reset the email field
//                 document.getElementById('newsletter-email').value = '';
//             } else {
//                 alert('Please enter your email address.');
//             }
//         });
// //stored-data
// function populateTable(data) {
//     if (!data.length) {
//         return `<p>No submissions found.</p>`;
//     }
//     let tableHTML = `<table class="table table-striped">
//         <thead class="table-header">
//             <tr>${Object.keys(data[0]).map(key => `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`).join('')}</tr>
//         </thead>
//         <tbody>`;
//     data.forEach(item => {
//         tableHTML += `<tr>${Object.values(item).map(value => `<td>${value}</td>`).join('')}</tr>`;
//     });
//     tableHTML += `</tbody></table>`;
//     return tableHTML;
// }

// function showTable(formType) {
//     const data = JSON.parse(localStorage.getItem(formType + 'Form')) || [];
//     const tableContainer = document.getElementById('tableContainer');
//     if (formType === 'contact') {
//         tableContainer.innerHTML = `<h2>Contact Form Submissions</h2>` + populateTable(data);
//     } else if (formType === 'modal') {
//         tableContainer.innerHTML = `<h2>Get in Touch Submissions</h2>` + populateTable(data);
//     } else if (formType === 'newsletter') {
//         const newsletterData = data.map(item => ({ email: item.email }));
//         tableContainer.innerHTML = `<h2>Newsletter Subscriptions</h2>` + populateTable(newsletterData);
//     }
// }

// window.onload = function() {
//     showTable('contact'); // Show contact form submissions by default
// };
// //stored form page
//     function populateTable(data) {
//         if (!data.length) {
//             return `<p>No submissions found.</p>`;
//         }
//         let tableHTML = `<table class="table table-striped">
//             <thead class="table-header">
//                 <tr>${Object.keys(data[0]).map(key => `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`).join('')}</tr>
//             </thead>
//             <tbody>`;
//         data.forEach(item => {
//             tableHTML += `<tr>${Object.values(item).map(value => `<td>${value}</td>`).join('')}</tr>`;
//         });
//         tableHTML += `</tbody></table>`;
//         return tableHTML;
//     }

//     function showTable(formType) {
//         const data = JSON.parse(localStorage.getItem(formType + 'Form')) || [];
//         const tableContainer = document.getElementById('tableContainer');
//         if (formType === 'contact') {
//             tableContainer.innerHTML = `<h2>Contact Form Submissions</h2>` + populateTable(data);
//         } else if (formType === 'modal') {
//             tableContainer.innerHTML = `<h2>Get in Touch Submissions</h2>` + populateTable(data);
//         } else if (formType === 'newsletter') {
//             const newsletterData = data.map(item => ({ email: item.email }));
//             tableContainer.innerHTML = `<h2>Newsletter Subscriptions</h2>` + populateTable(newsletterData);
//         }
//     }

//     window.onload = function() {
//         showTable('contact'); // Show contact form submissions by default
//     };
        
    
   // Function to handle form submission for "Contact Us"
    document.getElementById('submitContactForm').addEventListener('click', function() {
    const contactFormData = {
        firstName: document.getElementById('contact-first-name').value,
        lastName: document.getElementById('contact-last-name').value,
        email: document.getElementById('contact-email').value,
        message: document.getElementById('contact-message').value,
        formType: 'contact'
    };

    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactFormData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);

        // Clear form inputs after successful submission
        document.getElementById('contact-first-name').value = '';
        document.getElementById('contact-last-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-message').value = '';
    })
    .catch(error => console.error('Error:', error));
});

// Function to handle form submission for "Get In Touch"
document.getElementById('sendMessageBtn').addEventListener('click', function() {
    const modalFormData = {
        firstName: document.getElementById('GIT-first-name').value,
        lastName: document.getElementById('GIT-last-name').value,
        email: document.getElementById('GIT-email').value,
        message: document.getElementById('GIT-message').value,
        formType: 'modal'
    };

    fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(modalFormData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);

        // Clear form inputs after successful submission
        document.getElementById('GIT-first-name').value = '';
        document.getElementById('GIT-last-name').value = '';
        document.getElementById('GIT-email').value = '';
        document.getElementById('GIT-message').value = '';
    })
    .catch(error => console.error('Error:', error));
});

