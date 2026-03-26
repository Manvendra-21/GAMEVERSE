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
    document.getElementById("loginPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("loginPopup").style.display = "none";
}

window.onclick = function(e) {
    let popup = document.getElementById("loginPopup");
    if (e.target === popup) {
        popup.style.display = "none";
    }
}