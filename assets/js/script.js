$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("service_h70ne0b");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio|Shanti";
            $("#favicon").attr("href", "assets/images/favicon.jpg");
        }
        else {
            document.title = "Portfolio|Shanti";
            $("#favicon").attr("href", "assets/images/favicon.jpg");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Software Development", "Frontend Development", "Backend Development", "Full Stack Development", "Web Development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(data) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    
    data.categories.forEach(category => {
        skillHTML += `
        <div class="skill-category">
          <div class="category-header">
            <i class="${category.icon}"></i>
            <h3>${category.name}</h3>
          </div>
          <div class="category-skills">
            ${category.skills.map(skill => `
              <div class="skill-item">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
              </div>
            `).join('')}
          </div>
        </div>`;
    });
    
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0,6).filter(project => project.category != "android").forEach(project => {
        // Create technologies HTML if technologies exist
        let technologiesHTML = "";
        if (project.technologies && project.technologies.length > 0) {
            technologiesHTML = `
            <div class="project-technologies">
              <h4>Technologies:</h4>
              <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
            </div>`;
        }
        
        // Get category icon
        let categoryIcon = "fas fa-code";
        if (project.category === "AI") categoryIcon = "fas fa-brain";
        else if (project.category === "BACKEND") categoryIcon = "fas fa-server";
        else if (project.category === "GAME") categoryIcon = "fas fa-gamepad";
        else if (project.category === "FULLSTACK") categoryIcon = "fas fa-layer-group";
        
        projectHTML += `
        <div class="project-card">
          <div class="project-header">
            <div class="project-title">
              <h3>${project.name}</h3>
              <div class="project-category">
                <i class="${categoryIcon}"></i>
                <span>${project.category}</span>
              </div>
            </div>
          </div>
          
          <div class="project-image">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="${project.name}" />
          </div>
          
          <div class="project-content">
            <div class="project-description">
              <p>${project.desc}</p>
            </div>
            
            ${technologiesHTML}
            
                          <div class="project-actions">
                <a href="${project.links.code}" class="project-btn" target="_blank">
                  <span>GitHub</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
          </div>
        </div>`
    });
    projectsContainer.innerHTML = projectHTML;



}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// Experience section navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.experience-nav-item');
    const detailSections = document.querySelectorAll('.experience-detail');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all nav items and detail sections
            navItems.forEach(nav => nav.classList.remove('active'));
            detailSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding detail section
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
});

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}




/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
