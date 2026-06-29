'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// certification variables
const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img-tag]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalCompany = document.querySelector('[data-modal-company]');
const modalDate = document.querySelector('[data-modal-date]');
const modalDesc = document.querySelector('[data-modal-desc]');
const modalCertBtn = document.querySelector('[data-modal-cert-btn]');

const certPopup = document.getElementById('cert-popup');
const certImgHolder = document.getElementById('cert-img-holder');
const popupLightboxLink = document.querySelector('[data-popup-lightbox-link]');

const preloadedImages = {};
testimonialsItems.forEach(item => {
  const highResImgUrl = item.getAttribute('data-cert-img');
  if (highResImgUrl && !preloadedImages[highResImgUrl]) {
    const img = new Image();
    img.src = highResImgUrl; 
    preloadedImages[highResImgUrl] = img;
  }
});

// Handle open event for certificate description modals
testimonialsItems.forEach(item => {
  item.addEventListener('click', function () {
    const title = this.getAttribute('data-cert-title');
    const company = this.getAttribute('data-cert-company');
    const dateText = this.getAttribute('data-cert-date');
    const dateTimeVal = this.getAttribute('data-cert-datetime');
    const description = this.querySelector('[data-testimonials-text] p').textContent.trim();
    const avatarSrc = this.querySelector('[data-testimonials-avatar]').src;
    
    const certificateImg = this.getAttribute('data-cert-img');
    const externalVerificationUrl = this.getAttribute('data-cert-url');

    // Inject active context details into text modal UI slots
    modalTitle.textContent = title;
    modalCompany.textContent = company;
    modalDesc.textContent = description;
    modalDate.textContent = dateText;
    modalDate.setAttribute('datetime', dateTimeVal);
    modalImg.src = avatarSrc;
    modalImg.alt = company;

    // Map high-res asset routing functions inside target execution bounds
    modalCertBtn.onclick = function (event) {
      event.preventDefault();
      openCertPopup(certificateImg, externalVerificationUrl);
    };
  requestAnimationFrame(() => {
    modalContainer.classList.add('active');
    overlay.classList.add('active');
    });
  });
});

// Secondary High-Res Certificate Popups Layout Manager
function openCertPopup(imgSrc, verificationUrl) {
  certImgHolder.src = imgSrc;
  popupLightboxLink.href = verificationUrl;
  certPopup.classList.add('active');
}

function closeCertPopup() {
  certPopup.classList.remove('active');
}

function closeModal() {
  modalContainer.classList.remove('active');
  overlay.classList.remove('active');
}

modalCloseBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
// const navigationLinks = document.querySelectorAll("[data-nav-link]");
// const pages = document.querySelectorAll("[data-page]");

// // add event to all nav link
// for (let i = 0; i < navigationLinks.length; i++) {
//   navigationLinks[i].addEventListener("click", function () {

//     for (let i = 0; i < pages.length; i++) {
//       if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
//         pages[i].classList.add("active");
//         navigationLinks[i].classList.add("active");
//         window.scrollTo(0, 0);
//       } else {
//         pages[i].classList.remove("active");
//         navigationLinks[i].classList.remove("active");
//       }
//     }

//   });
// }



const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {

    const target = this.innerHTML.toLowerCase();

    // remove active from everything first
    navigationLinks.forEach(link => link.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    // activate clicked nav link
    this.classList.add("active");

    // activate matching page
    pages.forEach(page => {
      if (page.dataset.page === target) {
        page.classList.add("active");
        window.scrollTo(0, 0);
      }
    });

  });
});


emailjs.init("Xs3FkFoMKPjjJJTQv");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {

    event.preventDefault();

    emailjs.sendForm(
      "service_u1hpq4r",
      "template_to90gqd",
      this
    )
    .then(() => {
      alert("Message sent successfully!");
      this.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send message.");
    });

});