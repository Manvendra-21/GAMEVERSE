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

// chatbot

window.onload = () => {
    setSuggestions(["Hello"]);
};

const games = {
    "gta v": {
        name: "GTA V",
        info: "A massive open-world crime sandbox where you live the lives of three criminals in Los Santos 🌆🔫. Packed with insane heists 💰, chaotic freedom 🚗💥, and endless action — GTA V delivers one of the most iconic and explosive gaming experiences ever made."
    },
    "rdr2": {
        name: "RDR2",
        info: "An emotional, cinematic wild west journey following Arthur Morgan 🐎🌄. With breathtaking realism 🌅, deep storytelling ❤️‍🔥, and unmatched world detail — RDR2 is not just a game, it’s a powerful experience of loyalty, survival, and honor."
    },
    "elden ring": {
        name: "Elden Ring",
        info: "A dark fantasy masterpiece where brutal combat ⚔️ meets open-world exploration 🌫️🏰. Face terrifying bosses 🐉, uncover secrets, and forge your own legend in one of the most challenging and rewarding RPGs ever created."
    },
    "minecraft": {
        name: "Minecraft",
        info: "A limitless sandbox where creativity has no boundaries 🧱🌍. Build, explore, survive, or create entire worlds — from simple homes 🏠 to massive cities 🏙️ — Minecraft is pure imagination brought to life."
    }
};

let stage = "start";
function toggleChat() {
    document.getElementById("chatbot").classList.toggle("active");
}

document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

function addMessage(text, type) {
    let chat = document.getElementById("chat-body");
    let msg = document.createElement("div");
    msg.className = "msg " + type;
    msg.innerText = text;
    chat.appendChild(msg);
    chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth"
    });
}

function showTyping() {
    let chat = document.getElementById("chat-body");
    let typing = document.createElement("div");
    typing.className = "msg bot-msg typing";
    typing.id = "typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chat.appendChild(typing);
}
function removeTyping() {
    let t = document.getElementById("typing");
    if (t) t.remove();
}

function setSuggestions(options) {
    let box = document.querySelector(".suggestions");
    box.innerHTML = "";
    options.forEach(opt => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => quickMsg(opt);
        box.appendChild(btn);
    });
}

function quickMsg(text) {
    document.getElementById("user-input").value = text;
    sendMessage();
}

function sendMessage() {
    let input = document.getElementById("user-input");
    let text = input.value.trim().toLowerCase();
    if (text === "") return;
    addMessage(text, "user-msg");
    input.value = "";
    showTyping();
    let delay = Math.random() * 1000 + 1000;
    setTimeout(() => {
        removeTyping();
        handleFlow(text);
    }, delay);
}

function handleFlow(input) {
    if (stage === "start") {
        addMessage("I am GV MasterBot 🤖 How can I help you today?", "bot-msg");
        setSuggestions(["Recommend a game", "Game info", "Upcoming games"]);
        stage = "main";
        return;
    }

    if (input.includes("back") || input.includes("main")) {
        stage = "main";
        addMessage("Back to main menu 🔙", "bot-msg");
        setSuggestions(["Recommend a game", "Game info", "Upcoming games"]);
        return;
    }

    if (stage === "main") {
        if (input.includes("recommend")) {
            addMessage("What genre are you feeling today? 🎮🔥", "bot-msg");
            setSuggestions(["Action", "RPG", "Horror", "Racing", "Back"]);
            stage = "recommend";
            return;
        }
        if (input.includes("info")) {
            addMessage("Ask me about any game 😎", "bot-msg");
            setSuggestions(Object.values(games).map(g => g.name).concat(["Back"]));
            stage = "info";
            return;
        }
        if (input.includes("upcoming")) {
            addMessage("🔥 Showing you the most awaited upcoming game...", "bot-msg");
            goToUpcoming();
            setSuggestions(["Main menu"]);
            return;
        }
    }

    if (stage === "recommend") {
        if (input.includes("recommend again")) {
            addMessage("Choose a genre again 🎮", "bot-msg");
            setSuggestions(["Action", "RPG", "Horror", "Racing", "Back"]);
            return;
        }
        if (input.includes("action")) {
            addMessage("🔥 GTA V, RDR2, God of War", "bot-msg");
        }
        else if (input.includes("rpg")) {
            addMessage("🧙 Elden Ring, Witcher 3, Skyrim", "bot-msg");
        }
        else if (input.includes("horror")) {
            addMessage("👻 Outlast, Resident Evil, Amnesia", "bot-msg");
        }
        else if (input.includes("racing")) {
            addMessage("🏎️ Forza Horizon 5, NFS, F1", "bot-msg");
        }
        setSuggestions(["Recommend again", "Main menu", "Back"]);
        return;
    }

    if (stage === "info") {
        if (input.includes("more info")) {
            addMessage("Tell me another game 😎", "bot-msg");
            setSuggestions(Object.values(games).map(g => g.name).concat(["Back"]));
            return;
        }
        let foundGame = Object.keys(games).find(key => input.includes(key));
        if (foundGame) {
            addMessage(games[foundGame].info, "bot-msg");
        } else {
            addMessage("Game not found 😅 Try another one!", "bot-msg");
        }
        setSuggestions(["More info", "Main menu"]);
        return;
    }
    addMessage("Hmm 🤔 I didn't get that. Try using the suggestions below 👇", "bot-msg");
}

function goToUpcoming() {
    document.getElementById("Upcoming").scrollIntoView({
        behavior: "smooth"
    });
}