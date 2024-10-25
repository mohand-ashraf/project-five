// check if there's local storage color option
let mainColor = localStorage.getItem("color_option");

if(mainColor !== null){
    document.documentElement.style.setProperty("--main-color" , mainColor);
    // remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if(element.dataset.color === mainColor){
            element.classList.add("active");
        };
    });
};

// random background option 
let backgroundOption = true;

//variable to control background interval
let backgroundInterval;

// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background local storage is not empty
if(backgroundLocalItem !== null) {
    if(backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else{
        backgroundOption = false;
    };
    // remove active class from all spans
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");
    });
    if(backgroundLocalItem === 'true') {
        document.querySelector(".random-background .yes").classList.add("active");
    } else{
        document.querySelector(".random-background .no").classList.add("active");
    }
};

// toggle spin class on icon
document.querySelector(".toggle-setting .fa-gear").onclick = function () {
    // toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");
    // toggle class open on main setting box
    document.querySelector(".setting-box").classList.toggle("open");
};

// switch color
const colorsLi = document.querySelectorAll(".colors-list li");

// loop on all list items
colorsLi.forEach( li => {
    //click on every list items
    li.addEventListener("click" , (e) => {
        //set color in root
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color);
        // set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});

// switch random background option
const randomBackEl = document.querySelectorAll(".random-background span");

// loop on all spans
randomBackEl.forEach( span => {
    //click on every span
    span.addEventListener("click" , (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option" , true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option" , false);
        }
    });
});

// select landing-page element
let landingPage = document.querySelector(".landing-page");

// get array of imgs
let imgsArray = ["01.jpg" , "02.jpg" , "03.jpg" , "04.jpg"];

// function to randomize images

function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(function () {
            // get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // change background img url 
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 10000);
    };
};
randomizeImgs();


let animationTriggered = false;

function animateSkills() {
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill) => {
        setTimeout(() => {
            const targetWidth = skill.getAttribute('data-width');
            skill.style.width = targetWidth;
        });
    });
}

function resetSkills(){
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.style.width = '0';
    });
}

window.addEventListener('scroll' , function() {
    const skillsSection = this.document.getElementById('skillsSection');
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if( sectionPosition < windowHeight && sectionPosition > 0){
        if(!animationTriggered) {
            animateSkills();
            animationTriggered = true;
        }
    } else {
        resetSkills();
        animationTriggered = false;
    }
});


// create popup with the image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click' , (e) => {
    // create overlay element 
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = 'popup-overlay';
    // append overlay to the body 
    document.body.appendChild(overlay);
    // create popup 
    let popupBox = document.createElement("div");
    // add class to the popup box
    popupBox.className = 'popup-box';

    if (img.alt !== null) {
        let imgHeading = document.createElement("h3");
        // create text for heading
        let imgText = document.createTextNode(img.alt);
        // append the text to the heading
        imgHeading.appendChild(imgText);
        // append the heading to the popup box
        popupBox.appendChild(imgHeading);
    };

    //create the image
    let popupImage = document.createElement("img");
    // set image source
    popupImage.src = img.src;
    // add image to popup box
    popupBox.appendChild(popupImage);
    // append the popup box to body
    document.body.appendChild(popupBox);
    // create close span 
    let closeButton = document.createElement("span");
    // create the close button text
    let closeButtonText = document.createTextNode("X");
    // append text to close button
    closeButton.appendChild(closeButtonText);
    // add class to close button
    closeButton.className = 'close-button';
    // add closs button to popup box 
    popupBox.appendChild(closeButton);
    
    });
});

// close popup
document.addEventListener('click' , function (e){
    
    if (e.target.className == 'close-button'){
        // remove the current popup
        e.target.parentNode.remove();
        //remove overlay 
        document.querySelector(".popup-overlay").remove();
    }
});

// select all bullets
const allbullets = document.querySelectorAll(".nav-bullets .bullet");

allbullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// select all links
const allLinks = document.querySelectorAll(".links a");

allLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// handle active state 
function handleActive(ev) {
    // remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // add active class on self
    ev.target.classList.add("active");
};

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option")

if(bulletLocalItem !== null){
    
    bulletsSpan.forEach((span) => {
        span.classList.remove("active");
    });
    if(bulletLocalItem === "block"){
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option" , 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option" , 'none');
        }
        handleActive(e);
    });
});


// reset button 
document.querySelector(".reset-options") .onclick = function () {

    // localStorage.clear();    // طريقة تانية بتمسح كل الي في اللوكال استورتش 

    localStorage.removeItem("bullets_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("color_option");
    window.location.reload();
};

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    // stop propagation
    e.stopPropagation();
    // toggle class "menu-active" on button
    this.classList.toggle("menu-active");
    // toggle class "open" on button
    tLinks.classList.toggle("open");
};

// click anywhere outside menu and toggle button
document.addEventListener("click" , (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks) {
        // check if menu is open
        if(tLinks.classList.contains("open")){
            // toggle class "menu-active" on button
            toggleBtn.classList.toggle("menu-active");
            // toggle class "open" on button
            tLinks.classList.toggle("open");
        }
    }
});

// stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}