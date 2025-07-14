window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("avatarImg").src = localStorage.getItem("avatar") || "default-avatar.png";
  document.getElementById("nameDisplay").textContent = localStorage.getItem("name") || "Name";
  document.getElementById("usernameDisplay").textContent = "@" + (localStorage.getItem("username") || "username");
  document.getElementById("emailDisplay").textContent = localStorage.getItem("email") || "Email";
});

// التنقل في القائمة الجانبية
document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".menu-item").forEach(el => el.classList.remove("active"));
    item.classList.add("active");
    document.getElementById("tab-content").innerHTML = `<p>${item.dataset.section} content loaded</p>`;
  });
});

// التبويبات
document.querySelectorAll(".tabs button").forEach(tab => {
  tab.addEventListener("click", () => {
    const content = tab.dataset.tab;
    document.getElementById("tab-content").innerHTML = `<p>Displaying ${content} data...</p>`;
  });
});

// البحث
document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const name = (localStorage.getItem("name") || "").toLowerCase();
  if (query && name.includes(query)) {
    document.getElementById("tab-content").innerHTML = `<p>Found profile: ${localStorage.getItem("name")}</p>`;
  } else {
    document.getElementById("tab-content").innerHTML = `<p>No matching profile found</p>`;
  }
});

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.clear(); // مسح كل البيانات
  window.location.href = "login.html"; // الرجوع لصفحة التسجيل
});
