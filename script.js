// ===============================
// PORTFOLIO WEBSITE JAVASCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // AUTO UPDATE FOOTER YEAR
    // ===============================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ===============================
    // DARK MODE
    // ===============================

    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {

        // Load saved theme

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {

            document.body.classList.add("dark-mode");

            themeToggle.textContent = "☀ Light Mode";

        }

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {

                localStorage.setItem("theme", "dark");

                themeToggle.textContent = "☀ Light Mode";

            } else {

                localStorage.setItem("theme", "light");

                themeToggle.textContent = "🌙 Dark Mode";

            }

        });

    }

    // ===============================
    // MOBILE MENU
    // ===============================

    const menuToggle = document.getElementById("menu-toggle");

    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

        });

    }

    // ===============================
    // SMOOTH SCROLL
    // ===============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

    // ===============================
    // CONTACT FORM VALIDATION
    // ===============================

    const contactForm =
        document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", (e) => {

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === "") {

                alert("Please enter your name.");

                e.preventDefault();

                return;
            }

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                e.preventDefault();

                return;
            }

            if (message.length < 10) {

                alert(
                    "Message must contain at least 10 characters."
                );

                e.preventDefault();

                return;
            }

        });

    }

    // ===============================
    // SCROLL REVEAL ANIMATION
    // ===============================

    const revealElements =
        document.querySelectorAll(
            ".card, .project-card, .about-text"
        );

    function revealOnScroll() {

        revealElements.forEach(element => {

            const windowHeight = window.innerHeight;

            const elementTop =
                element.getBoundingClientRect().top;

            const revealPoint = 100;

            if (
                elementTop <
                windowHeight - revealPoint
            ) {

                element.classList.add("show");

            }

        });

    }

    window.addEventListener(
        "scroll",
        revealOnScroll
    );

    revealOnScroll();

    // ===============================
    // BACK TO TOP BUTTON
    // ===============================

    const topBtn =
        document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 300) {

                topBtn.style.display = "block";

            } else {

                topBtn.style.display = "none";

            }

        });

        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});