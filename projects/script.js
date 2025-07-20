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
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Shanti";
            $("#favicon").attr("href", "/assets/images/favicon.jpg");
        }
        else {
            document.title = "Projects | Portfolio Shanti";
            $("#favicon").attr("href", "/assets/images/favicon.jpg");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    projects.forEach(project => {
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
        
        projectsHTML += `
        <div class="grid-item ${project.category}">
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
          </div>
        </div>`
    });
    projectsContainer.innerHTML = projectsHTML;

    // vanilla tilt.js
    // VanillaTilt.init(document.querySelectorAll(".tilt"), {
    //     max: 20,
    // });
    // // vanilla tilt.js  

    // /* ===== SCROLL REVEAL ANIMATION ===== */
    // const srtop = ScrollReveal({
    //     origin: 'bottom',
    //     distance: '80px',
    //     duration: 1000,
    //     reset: true
    // });

    // /* SCROLL PROJECTS */
    // srtop.reveal('.work .box', { interval: 200 });

    // isotope filter products - disabled since we're using CSS grid
    // var $grid = $('.box-container').isotope({
    //     itemSelector: '.grid-item',
    //     layoutMode: 'vertical',
    //     masonry: {
    //         columnWidth: '.grid-item'
    //     }
    // });

    // filter items on button click - disabled
    // $('.button-group').on('click', 'button', function () {
    //     $('.button-group').find('.is-checked').removeClass('is-checked');
    //     $(this).addClass('is-checked');
    //     var filterValue = $(this).attr('data-filter');
    //     $grid.isotope({ filter: filterValue });
    // });
}

getProjects().then(data => {
    showProjects(data);
})
// fetch projects end



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