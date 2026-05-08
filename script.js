// --- 1. HOLLOW MODE LOGIC ---
const toggleBtn = document.getElementById('hollow-toggle');
const body = document.body;

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('hollow-mode');
        
        // Update button text based on the mode
        if (body.classList.contains('hollow-mode')) {
            toggleBtn.textContent = 'Mask Off';
        } else {
            toggleBtn.textContent = 'Mask On';
        }
    });
}

// --- 2. SCROLL REVEAL LOGIC ---
const observerOptions = {
    threshold: 0.1
};

// We only declare "observer" ONCE here
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Apply the observer to all elements with the "reveal" class
document.querySelectorAll('.reveal').forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});
window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('hollow-toggle');
    const body = document.body;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            // 1. Trigger a "Spiritual Flash"
            body.classList.add('flash-effect');
            
            // 2. Toggle the mode after a tiny delay for impact
            setTimeout(() => {
                body.classList.toggle('hollow-mode');
                
                if (body.classList.contains('hollow-mode')) {
                    toggleBtn.textContent = 'Mask Off';
                } else {
                    toggleBtn.textContent = 'Mask On';
                }
            }, 50);

            // 3. Remove the flash effect
            setTimeout(() => {
                body.classList.remove('flash-effect');
            }, 300);
        });
    }

    // Scroll Reveal Logic (Same as before, keeps it sleek)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    });

    document.querySelectorAll('.reveal').forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 1s cubic-bezier(0.22, 1, 0.36, 1)";
        observer.observe(el);
    });
});
window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('hollow-toggle');
    const body = document.body;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            // Add the shake and flash
            body.classList.add('shake-active', 'flash-effect');
            
            setTimeout(() => {
                body.classList.toggle('hollow-mode');
                toggleBtn.textContent = body.classList.contains('hollow-mode') ? 'Mask Off' : 'Mask On';
            }, 100);

            // Remove effects
            setTimeout(() => {
                body.classList.remove('shake-active', 'flash-effect');
            }, 600);

            // Easter Egg
            if(body.classList.contains('hollow-mode')) {
                console.log("%cDON'T LOSE CONTROL.", "color: red; font-size: 20px; font-weight: bold;");
            }
        });
    }

    // Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
});