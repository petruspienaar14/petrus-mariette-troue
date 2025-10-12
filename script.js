
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle if href is not just "#"
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Countdown Timer
function updateCountdown() {
    // Check if countdown elements exist
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Only proceed if all elements exist
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    const weddingDate = new Date('2026-04-18T15:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        // Wedding has passed
        daysElement.innerHTML = '0';
        hoursElement.innerHTML = '0';
        minutesElement.innerHTML = '0';
        secondsElement.innerHTML = '0';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.innerHTML = days.toString().padStart(2, '0');
    hoursElement.innerHTML = hours.toString().padStart(2, '0');
    minutesElement.innerHTML = minutes.toString().padStart(2, '0');
    secondsElement.innerHTML = seconds.toString().padStart(2, '0');
}

// Initialize countdown and update every second (only if elements exist)
document.addEventListener('DOMContentLoaded', function() {
    // Check if at least one countdown element exists
    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});

// RSVP Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    // Only proceed with RSVP handling if we're on the RSVP page
    if (!rsvpForm) return;

    const attendanceSelect = document.getElementById('attendance');
    const guest1Section = document.getElementById('guest1Section');
    const guest2Section = document.getElementById('guest2Section');
    const rsvpSuccess = document.getElementById('rsvpSuccess');

    // Show/hide guest 2 section based on attendance
    if (attendanceSelect) {
        attendanceSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        
        // Reset guest 2 fields when attendance changes
        const resetFields = (section) => {
            const inputs = section.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
                input.required = false;
            });
        };

        if (selectedValue === 'yes_guest') {
            guest2Section.style.display = 'block';
            guest2Section.querySelectorAll('input[type="text"]').forEach(input => input.required = true);
        } else {
            guest2Section.style.display = 'none';
            resetFields(guest2Section);
        }
    });
    }

    // Form submission
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(rsvpForm);
        const rsvpData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            attendance: formData.get('attendance'),
            guest1: {
                name: formData.get('guest1Name'),
                surname: formData.get('guest1Surname')
            },
            guest2: formData.get('attendance') === 'yes_guest' ? {
                name: formData.get('guest2Name'),
                surname: formData.get('guest2Surname')
            } : null,
            songRequest: formData.get('songRequest'),
            bibleVerse: formData.get('bibleVerse')
        };

        // Validate required fields
        if (!rsvpData.guest1.name || !rsvpData.guest1.surname || !rsvpData.attendance) {
            alert('Vul asseblief al die vereiste velde in (Naam, Van, en Bywoning).');
            return;
        }


        // Validate Guest 2 information (only if attending with guest)
        if (rsvpData.attendance === 'yes_guest' && 
            (!rsvpData.guest2.name || !rsvpData.guest2.surname)) {
            alert('Vul asseblief die tweede gas se besonderhede in.');
            return;
        }

        // Show loading state
        const submitBtn = rsvpForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Stuur...';
        submitBtn.disabled = true;

        // Prepare email data
        const emailData = {
            // Primary and secondary email recipients
            to_email: "skillie.tierfontein@gmail.com",
            cc_email: "mariettevj1@gmail.com", // Replace with the second email address
            attendance: (() => {
                switch(rsvpData.attendance) {
                    case 'no': return 'Nee, kan nie bywoon nie';
                    case 'yes': return 'Ja, sal alleen bywoon';
                    case 'yes_guest': return 'Ja, sal met \'n metgesel bywoon';
                    default: return rsvpData.attendance;
                }
            })(),
            name: rsvpData.guest1.name,
            surname: rsvpData.guest1.surname,
            guest2_name: rsvpData.guest2?.name || 'Geen metgesel',
            guest2_surname: rsvpData.guest2?.surname || 'Geen metgese',
            song_request: rsvpData.songRequest || 'Geen',
            bible_verse: rsvpData.bibleVerse || 'Geen'
        };

        // Send email using EmailJS
        // TODO: Replace SERVICE_ID and TEMPLATE_ID with your actual IDs from EmailJS
        emailjs.send("service_mgbovgr", "template_p8hlhu7", emailData)
            .then(function(response) {
                console.log("SUCCESS", response);
                
                // Store RSVP data in localStorage (for backup)
                const existingRSVPs = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
                existingRSVPs.push(rsvpData);
                localStorage.setItem('weddingRSVPs', JSON.stringify(existingRSVPs));

                // Show success message
                rsvpForm.style.display = 'none';
                rsvpSuccess.style.display = 'block';
                
                // Reset form
                rsvpForm.reset();
                guest2Section.style.display = 'none';
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to success message
                rsvpSuccess.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(function(error) {
                console.log("FAILED", error);
                alert("Daar was 'n probleem met die stuur van die RSVP. Probeer asseblief weer.");
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});


// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.detail-card, .story-content, .rsvp-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    // Only proceed with form validation if we're on a page with a form
    if (!document.querySelector('form')) return;

    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                showFieldError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = '#10b981';
                hideFieldError(this);
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#ef4444';
                showFieldError(this, 'Please enter a valid phone number');
            } else {
                this.style.borderColor = '#10b981';
                hideFieldError(this);
            }
        });
    }
});

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Add CSS for field errors
const style = document.createElement('style');
style.textContent = `
    .field-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(style);

// Utility function to get RSVP data (for admin purposes)
function getRSVPData() {
    return JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
}

// Utility function to export RSVP data as CSV
function exportRSVPData() {
    const rsvpData = getRSVPData();
    if (rsvpData.length === 0) {
        alert('No RSVP data found.');
        return;
    }
    
    const headers = ['Name', 'Email', 'Phone', 'Attendance', 'Guest1 Name', 'Guest1 Surname', 'Guest1 Image', 'Guest2 Name', 'Guest2 Surname', 'Guest2 Image', 'Song Request', 'Bible Verse', 'Timestamp'];
    const csvContent = [
        headers.join(','),
        ...rsvpData.map(rsvp => [
            `"${rsvp.name}"`,
            `"${rsvp.email}"`,
            `"${rsvp.phone || ''}"`,
            `"${rsvp.attendance}"`,
            `"${rsvp.guest1?.name || ''}"`,
            `"${rsvp.guest1?.surname || ''}"`,
            `"${rsvp.guest1?.image || ''}"`,
            `"${rsvp.guest2?.name || ''}"`,
            `"${rsvp.guest2?.surname || ''}"`,
            `"${rsvp.guest2?.image || ''}"`,
            `"${rsvp.songRequest || ''}"`,
            `"${rsvp.bibleVerse || ''}"`,
            `"${rsvp.timestamp}"`
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-rsvps.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Make utility functions available globally for admin use
window.getRSVPData = getRSVPData;
window.exportRSVPData = exportRSVPData;
