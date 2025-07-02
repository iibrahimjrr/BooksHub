const booksData = {
  Literary : [
    { 
      title: "عمارة يعقوبيان",
      description: "عمارة يعقوبيان هي رواية من تأليف الكاتب المصري علاء الأسواني. عنوان الرواية مستوحى من اسم حقيقي لعمارة تقع بشارع طلعت حرب، بنى العمارة عميد الجالية الأرمنية المليونير هاغوب يعقوبيان عام 1934، يعتبر البعض مبنى عمارة يعقوبيان الكائن بوسط القاهرة شاهد على تاريخ مصر الحديث في المائة عام الماضية، بكل ما تحمله من أزمات ونجاحات ونكبات.واية اجتماعية",
      cover: "https://cdn.abjjad.com/pub/16b2092b-1ba4-483e-963d-3e0fc814f314.jpg",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html",
      rating: 4,
      date: "2024-06-01"
    },

    { 
      title: "هيبتا",
      description: "هيبتا رواية للكاتب المصري محمد صادق تتحدث عن المراحل السبع في العلاقات العاطفية، تصدرت الرواية قوائم الأكثر مبيعًا، وحازت على لقب أفضل رواية لعام 2014 من مكتبات ألف وفيرجن ميجا ستورز في",
      cover: "https://books-library.net/files/books-library.com-10122038Pw2R5.jpg",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html" ,
      rating: 5,
      date: "2024-06-09"
    },

    { 
      title: "Add a book",
      description: "",
      cover: "http://127.0.0.1:5500/assets/img/logo%20bookshub.png",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html" 
    },
    { 
      title: "Add a book",
      description: "",
      cover: "http://127.0.0.1:5500/assets/img/logo%20bookshub.png",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html" 
    },
    { 
      title: "Add a book",
      description: "",
      cover: "http://127.0.0.1:5500/assets/img/logo%20bookshub.png",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html" 
    },
    { 
      title: "Add a book",
      description: "",
      cover: "http://127.0.0.1:5500/assets/img/logo%20bookshub.png",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html" 
    },
    { 
      title: "Add a book",
      description: "",
      cover: "http://127.0.0.1:5500/assets/img/logo%20bookshub.png",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html" 
    },
    { 
      title: "Add a book",
      description: "",
      cover: "http://127.0.0.1:5500/assets/img/logo%20bookshub.png",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html" 
    },
    { 
      title: "Add a book",
      description: "",
      cover: "http://127.0.0.1:5500/assets/img/logo%20bookshub.png",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html" 
    },
    { 
      title: "Add a book",
      description: "",
      cover: "http://127.0.0.1:5500/assets/img/logo%20bookshub.png",
      readLink: "read-book.html",
      downloadLink: "download.html",
      authorPage: "author.html" 
    },
  ],

  Horrorandmystery: [

  ],
  Humandevelopment: [

  ],
  Sarcastic: [

  ],
  ContemporaryEgyptian: [

  ],
  policy: [
    
  ]
};

const isLoggedIn = false; 

function limitWords(text, maxWords = 100) {
  const words = text.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
}

function renderBooks(day) {
  const books = booksData[day] || [];
  const list = document.getElementById("bookList");
  list.innerHTML = books.map((book, i) => `
    <li class="book-card" data-index="${i}" data-day="${day}">
      <img src="${book.cover}" alt="cover">
      <span>${book.title}</span>
    </li>
  `).join("");
}

function handleSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const list = document.getElementById("bookList");
  list.innerHTML = "";
  let found = false;

  for (const day in booksData) {
    booksData[day].forEach((book, index) => {
      if (book.title.toLowerCase().includes(query)) {
        const item = document.createElement("li");
        item.className = "book-card";
        item.setAttribute("data-day", day);
        item.setAttribute("data-index", index);
        item.innerHTML = `
          <img src="${book.cover}" alt="cover">
          <span>${book.title}</span>
        `;
        list.appendChild(item);
        found = true;
      }
    });
  }

  if (!found) {
    const message = document.createElement("li");
    message.style.textAlign = "center";
    message.style.color = "#888";
    message.textContent = "لا توجد نتائج لهذا البحث";
    list.appendChild(message);
  }
}

function openPopup(book) {
  document.getElementById("popupCover").src = book.cover;
  document.getElementById("popupTitle").textContent = book.title;
  document.getElementById("popupDescription").textContent = limitWords(book.description);

  document.getElementById("readBtn").onclick = () => window.location.href = book.readLink;
  document.getElementById("downloadBtn").onclick = () => {
    if (isLoggedIn) {
      window.location.href = book.downloadLink;
    } else {
      window.location.href = "login.html";
    }
  };
  document.getElementById("authorBtn").onclick = () => window.location.href = book.authorPage;

  document.getElementById("popupOverlay").style.display = "block";
  document.getElementById("bookPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
  document.getElementById("bookPopup").style.display = "none";
}

window.onload = () => {
  renderBooks("Literary");

  document.getElementById("searchInput").addEventListener("input", handleSearch);

  document.getElementById("dayMenu").addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      document.querySelectorAll("#dayMenu li").forEach(li => li.classList.remove("selected"));
      e.target.classList.add("selected");
      renderBooks(e.target.dataset.day);
    }
    document.getElementById("sortDropdown").addEventListener("change", function () {
  const value = this.value;
  const currentDay = document.querySelector(".menu li.selected").dataset.day;

  if (value === "highest") {
    booksData[currentDay].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (value === "lowest") {
    booksData[currentDay].sort((a, b) => (a.rating || 0) - (b.rating || 0));
  } else if (value === "latest") {
    booksData[currentDay].sort((a, b) => new Date(b.date || "2000-01-01") - new Date(a.date || "2000-01-01"));
  }

  renderBooks(currentDay);
});

  });

  document.getElementById("bookList").addEventListener("click", (e) => {
    const card = e.target.closest(".book-card");
    if (!card) return;
    const day = card.dataset.day;
    const index = card.dataset.index;
    openPopup(booksData[day][index]);
  });

  document.getElementById("closePopup").addEventListener("click", closePopup);
  document.getElementById("popupOverlay").addEventListener("click", closePopup);

  document.getElementById("profileIcon").addEventListener("click", () => {
    window.location.href = isLoggedIn ? "profile.html" : "login.html";
  });
};
