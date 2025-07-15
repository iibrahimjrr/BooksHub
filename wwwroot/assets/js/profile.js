window.addEventListener("DOMContentLoaded", function () {
  fetch("/api/profile/me")
    .then(res => {
      if (!res.ok) throw new Error("Not logged in");
      return res.json();
    })
    .then(data => {
      document.getElementById("avatarImg").src = data.profileImagePath || "assets/img/default-avatar.png";
      document.getElementById("nameDisplay").textContent = data.name;
      document.getElementById("usernameDisplay").textContent = "@" + data.username;
      document.getElementById("emailDisplay").textContent = data.email;
    })
    .catch(err => {
      console.error("Failed to load profile:", err);
      alert("Please login first.");
      window.location.href = "login.html";
    });
});


document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".menu-item").forEach(el => el.classList.remove("active"));
    item.classList.add("active");
    document.getElementById("tab-content").innerHTML = `<p>${item.dataset.section} content loaded</p>`;
  });
});

document.querySelectorAll(".tabs button").forEach(tab => {
  tab.addEventListener("click", () => {
    const content = tab.dataset.tab;
    document.getElementById("tab-content").innerHTML = `<p>Displaying ${content} data...</p>`;
  });
});

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
  localStorage.clear(); 
  window.location.href = "login.html"; 
});
