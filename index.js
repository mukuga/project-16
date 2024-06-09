const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const darkMode = document.querySelector('.dark-mode');
const sidebarOptions = document.querySelectorAll('.sidebar');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

// Tambahkan event listener untuk setiap opsi di sidebar
sidebarOptions.forEach(option => {
    option.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sideMenu.style.display = 'none';
        }
    });
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
});



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

// Get the modal
var modal = document.getElementById("infoModal");

// Get the button that opens the modal
var btn = document.getElementById("infoIcon");

// Get the <span> element that closes the modal
var span = document.getElementById("closeModal");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showPointer() {
  var pointer = document.getElementById('pointer');
  var aboutIcon = document.getElementById('About');

  // Atur posisi pointer sesuai dengan posisi aboutIcon

  // Tampilkan pointer
  pointer.classList.remove('hidden');
  pointer.style.opacity = '1';

  // Sembunyikan pointer setelah 2 detik
  setTimeout(function() {
      pointer.style.opacity = '0';
      setTimeout(function() {
          pointer.classList.add('hidden');
      }, 100); // Sesuaikan dengan durasi animasi transition
  }, 5000); // Durasi penunjuk terlihat (2 detik)
}


document.getElementById('report-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Ambil nilai dari form
  var message = document.getElementById('message').value;
  var email = document.getElementById('email').value;

  // Kirim email menggunakan EmailJS
  emailjs.send("service_rymk9wk", "template_0hmqrv4", {
      message: message,
      email: email,
  })
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
     document.getElementById('message-sent').classList.remove('hidden');
  }, function(error) {
     console.log('FAILED...', error);
  });
});














