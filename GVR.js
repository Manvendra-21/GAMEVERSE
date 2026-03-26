// upcoming video photo switch
function changeMedia(src) {
    let container = document.getElementById("mainMedia");
    container.innerHTML = `<img src="${src}" />`;
}
function showVideo() {
    let container = document.getElementById("mainMedia");
    container.innerHTML = `
    <video muted loop controls autoplay>
      <source src="./video_gameverse/gta6.mp4" type="video/mp4">
    </video>
  `;
    document.querySelectorAll(".media-thumbs img").forEach(img => {
        img.classList.remove("active");
    });
    event.target.classList.add("active");
}

window.onload = () => {
    setSuggestions(["Hello"]);
};

// for Login
function openPopup() {
    const popup = document.getElementById("loginPopup");
    popup.style.display = "flex";
    setTimeout(() => {
        popup.classList.add("show");
    }, 10);
}

function closePopup() {
    const popup = document.getElementById("loginPopup");
    popup.classList.remove("show");
    setTimeout(() => {
        popup.style.display = "none";
    }, 300);
}

window.onclick = function(e) {
    let popup = document.getElementById("loginPopup");
    if (e.target === popup) {
        popup.style.display = "none";
    }
}

function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("login-msg");
  if (username === "" || password === "") {
    msg.textContent = "Please fill all fields";
    return;
  }
  msg.textContent = "Login successful 🎉";
  setTimeout(() => {
    closePopup();
    msg.textContent = "";
  }, 1000);
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    handleLogin();
  }
});
