const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})

const showAllBtn = document.getElementById('show-all-btn');
const analyzeContainers = document.querySelectorAll('.analyze, .analyze1, .analyze2, .analyze3');

showAllBtn.addEventListener('click', () => {
    analyzeContainers.forEach((container) => {
        container.classList.toggle('show');
    });
    showAllBtn.textContent = showAllBtn.textContent === 'Show All' ? 'Show Less' : 'Show All';
});


const showMoreBtn = document.getElementById('show-more-btn');
const hiddenSearches = document.querySelectorAll('.searches.hidden');

showMoreBtn.addEventListener('click', function() {
  hiddenSearches.forEach(search => {
    search.classList.toggle('hidden');
  });

  if (showMoreBtn.textContent === 'Show All') {
    showMoreBtn.textContent = 'Show Less';
  } else {
    showMoreBtn.textContent = 'Show All';
  }
});


const showoreBtn = document.getElementById('Show-more-btn');
const iddenSearches = document.querySelectorAll('.searcheshidden1');

showoreBtn.addEventListener('click', function() {
  iddenSearches.forEach(search => {
    search.classList.toggle('searcheshidden1');
  });

  if (showoreBtn.textContent === 'Show All') {
    showoreBtn.textContent = 'Show Less';
  } else {
    showoreBtn.textContent = 'Show All';
  }
});


const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach((link) => {
    link.addEventListener('click', () => {
        sidebarLinks.forEach((otherLink) => {
            otherLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.add('show');
});



function sendEmail(message, email) {
  emailjs.send("service_surga", "template_neraka", {
      to_email: email,
      message: message
  })
  .then(function(response) {
      console.log('Email sent:', response);
  }, function(error) {
      console.error('Email error:', error);
  });
}

const reportForm = document.getElementById('report-form');
const messageInput = document.getElementById('message');
const emailInput = document.getElementById('email');
const successMessage = document.getElementById('message-sent');

reportForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const message = messageInput.value;
  const email = emailInput.value;

  if (message === '' || email === '') {
      alert('Please fill in all required fields.');
      return;
  }

  sendEmail(message, email); // Memanggil fungsi untuk mengirim email

  console.log('Sending report...');
  console.log('Message:', message);
  console.log('Email:', email);

  successMessage.classList.remove('hidden');
  messageInput.value = '';
  emailInput.value = '';

  setTimeout(() => {
      successMessage.classList.add('hidden');
  }, 3000);
});














