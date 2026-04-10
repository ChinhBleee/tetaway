document.addEventListener("DOMContentLoaded", function () {
  // ==================== HEADER & MOBILE MENU ====================
  const header = document.getElementById("mainHeader");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Hamburger menu
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const spans = hamburger.querySelectorAll("span");

    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  // Close menu when clicking a link
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");

      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    });
  });

  // ==================== PRODUCT HOVER VIDEO ====================
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const img = card.querySelector("img");
    const video = card.querySelector("video");

    if (!img || !video) return;

    card.addEventListener("mouseenter", () => {
      img.style.display = "none";
      video.style.display = "block";
      video.play().catch((err) => console.log("Video play prevented:", err));
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      video.style.display = "none";
      img.style.display = "block";
    });
  });
});

// ==================== CREATE MARQUEE WITH 16 IMAGES ====================
function createMarquee() {
  const marquee = document.getElementById("marquee");
  if (!marquee) return;

  // Danh sách 16 ảnh của bạn (thay tên file cho đúng)
  const imageList = [
    "img/a.png",
    "img/aa.png",
    "img/aaa.png",
    "img/b.png",
    "img/f.png",
    "img/ff.png",
    "img/fff.png",
    "img/h.png",
    "img/hh.png",
    "img/hhh.png",
    "img/m.png",
    "img/n.png",
    "img/nn.png",
    "img/nnn.png",
    "img/t.png",
    "img/tt.png",
    "img/ttt.png",
  ];

  let html = "";

  // Tạo 2 vòng lặp để hiệu ứng chạy mượt (seamless)
  for (let i = 0; i < 2; i++) {
    imageList.forEach((src) => {
      html += `
                <img src="${src}" 
                     alt="Viet Tet Cakes Ingredient" 
                     loading="lazy">
            `;
    });
  }

  marquee.innerHTML = html;
}

// Gọi hàm khi trang load xong
createMarquee();

// ==================== CHAT WIDGET WITH MASCOT & QUICK REPLIES ====================
document.addEventListener("DOMContentLoaded", function () {
  const chatButton = document.getElementById("chatButton");
  const chatWindow = document.getElementById("chatWindow");
  const chatClose = document.getElementById("chatClose");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatBody = document.getElementById("chatBody");
  const quickBtns = document.querySelectorAll(".quick-btn");

  // Mở / đóng chat
  chatButton.addEventListener("click", () => {
    chatWindow.classList.toggle("active");
    if (chatWindow.classList.contains("active")) {
      chatInput.focus();
    }
  });

  chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active");
  });

  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `message ${type}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    scrollToBottom();
  }

  // Gửi tin nhắn thường
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    chatInput.value = "";

    // Bot trả lời ngẫu nhiên
    setTimeout(() => {
      const replies = [
        "Thank you! I will support you right away 🙌✨",
        "Would you like to place an order or need more consultation? 🛒💬",
        "We offer nationwide delivery within 2–3 days 🚚📦⏱️!",
      ];
      addMessage(replies[Math.floor(Math.random() * replies.length)], "bot");
    }, 600);
  }

  chatSend.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Click vào câu hỏi mẫu
  // quickBtns.forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     const msg = btn.getAttribute("data-msg");
  //     addMessage(msg, "user");

  //     setTimeout(() => {
  //       addMessage("Cảm ơn bạn! Mình đang hỗ trợ câu hỏi này...", "bot");
  //     }, 500);
  //   });
  // });
});
// function sendQuestion(type) {
//   const img = document.getElementById("characterImg");
//   const messages = document.getElementById("messages");

//   let reply = "";

//   if (type === "store") {
//     img.src = "img/store.png"; // 👉 ảnh bạn chuẩn bị
//     reply = "Cửa hàng chúng tôi ở Đà Nẵng 📍";
//   }

//   if (type === "price") {
//     img.src = "img/price.png";
//     reply = "Giá bánh tét từ 45k - 60k 🎉";
//   }

//   if (type === "ship") {
//     img.src = "img/ship.png";
//     reply = "Chúng tôi ship toàn quốc 🚚";
//   }

//   // thêm tin nhắn vào chat
//   const div = document.createElement("div");
//   div.className = "bot";
//   div.innerHTML = reply;

//   messages.appendChild(div);

//   // auto scroll xuống
//   messages.scrollTop = messages.scrollHeight;
// }
function handleQuick(type) {
  const img = document.getElementById("characterImg");
  const chatBody = document.getElementById("chatBody");

  let userText = "";
  let reply = "";

  if (type === "store") {
    img.src = "img/tetngu.png";
    userText = "Why is the mascot a soldier?";
    reply =
      "The mascot is a soldier 🪖 because it clearly represents the core meaning behind the story of bánh tét 🍃🎋. During the time of Nguyễn Huệ ⚔️, soldiers had to leave their homes 🏡 and could not return during Tết Nguyên Đán 🎆. By carrying bánh tét with them 🎒, they were not only bringing food 🍽️, but also love ❤️, memories 📸, and a strong connection to their families 👨‍👩‍👧‍👦. For this reason, the soldier becomes a powerful symbol 💪 of being far from home 🌏 while still carrying a piece of it wherever they go ✨. As a mascot 🎭, the soldier represents not just a character, but the journey 🛤️, emotion 💖, and deeper meaning of “carrying Tết on the go” 🎊🚶‍♂️.";
  }

  if (type === "price") {
    img.src = "img/tethothoang.png";
    userText = "Does TETAWAY have any exciting programs coming up?";
    reply =
      "Yes! TETAWAY is preparing several exciting programs for the upcoming season 🎉, including special holiday travel packages 🏝️, discounted combo deals for flights and hotels ✈️🏨, and unique cultural experience tours that allow travelers to explore local traditions and cuisine 🍜🎎, making it a perfect opportunity for customers to enjoy memorable trips with family and friends while saving money 💰✨";
  }

  if (type === "ship") {
    img.src = "img/tetcamco.png";
    userText = "TETAWAY journey was born";
    reply =
      "The TETAWAY journey was born 🌍✨ as a vision to redefine the way people explore the world, bringing together innovation, convenience, and unforgettable travel experiences into one seamless platform 🚀✈️, and from its very first steps, it aimed to inspire travelers to step out of their comfort zones, discover hidden gems, and create lasting memories with loved ones 🏝️📸, while also offering smart solutions like personalized itineraries, exclusive deals, and cultural immersion programs that truly connect people with the destinations they visit 🎎🍜, and as the journey continues to grow, TETAWAY is committed to building a global community of passionate explorers who seek not only adventure but also meaningful connections and enriching experiences across different cultures and landscapes 🌐❤️🎒";
  }

  if (type === "vegan") {
    img.src = "img/location.png";
    userText = "TETAWAY bakery nearby";
    reply =
      "I have identified your location 📍, please follow my directions carefully 🧭✨!";
  }

  if (type === "save") {
    img.src = "img/tetchicho.png";
    userText = "Hii";
    reply =
      "Hello! 👋 I'm here to help you with any questions you have about bánh tét! 🎉 Whether it's about ingredients, storage tips, or where to find the best bánh tét in town, just ask away! 🍽️🎊";
  }

  // user message
  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.innerText = userText;
  chatBody.appendChild(userDiv);

  // bot message
  const botDiv = document.createElement("div");
  botDiv.className = "message bot";
  botDiv.innerText = reply;
  chatBody.appendChild(botDiv);

  chatBody.scrollTop = chatBody.scrollHeight;
}

// ================= INTRO FLOW =================
document.addEventListener("DOMContentLoaded", function () {
  const intro = document.getElementById("intro");
  const video = document.getElementById("introVideo");
  const askBox = document.getElementById("askBox");
  const mainContent = document.getElementById("mainContent");
  const chatWindow = document.getElementById("chatWindow");
  const overlay = document.getElementById("askOverlay");

  // Ẩn main ban đầu
  if (mainContent) mainContent.style.display = "none";

  // Khi video kết thúc
  if (video) {
    video.onended = function () {
      if (intro) intro.style.display = "none";

      overlay.style.display = "block";
      askBox.style.display = "block";
      mainContent.style.display = "block";
    };
  }

  // CLICK CÓ
  window.openChat = function () {
    overlay.style.display = "none";
    askBox.style.display = "none";
    chatWindow.classList.add("active");
  };

  // CLICK KHÔNG
  window.goHome = function () {
    overlay.style.display = "none";
    askBox.style.display = "none";
  };

  askBox.classList.add("show");
});
