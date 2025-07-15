let selectedFake = null;
let realFile = null;

document.getElementById("realImage").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    realFile = file;
    selectedFake = null;
    const reader = new FileReader();
    reader.onload = function(evt) {
      localStorage.setItem("profileImage", evt.target.result);
      previewImage(evt.target.result);
      removeFakeSelection();
    };
    reader.readAsDataURL(file);
  }
});

function selectFakeImage(imgElement) {
  selectedFake = imgElement.src;
  realFile = null;
  localStorage.setItem("profileImage", selectedFake); 
  previewImage(selectedFake);
  removeFakeSelection();
  imgElement.classList.add("selected");
}

function removeFakeSelection() {
  document.querySelectorAll(".fake-images img").forEach(img => {
    img.classList.remove("selected");
  });
}

function previewImage(src) {
  const preview = document.getElementById("preview");
  preview.src = src;
  preview.hidden = false;
}

document.getElementById("saveBtn").addEventListener("click", function() {
  if (!localStorage.getItem("profileImage")) {
    alert("من فضلك اختر أو ارفع صورة أولاً");
    return;
  }
  window.location.href = "profile.html"; 
});
