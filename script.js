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
        "Cảm ơn bạn! Mình sẽ hỗ trợ ngay.",
        "Bạn muốn đặt hàng hay tư vấn thêm ạ?",
        "Ship toàn quốc trong 2-3 ngày nhé!",
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
    img.src = "img/store.png";
    userText = "Why do you use the image of a soldier?";
    reply =
      "The image of the soldier in the story from the time of Nguyễn Huệ carries deep meaning. It represents not only war, but also distance and the longing for home. In a time when he could not return to reunite with his family during Tết Nguyên Đán, the soldier carried a piece of bánh tét with him as if he were carrying a part of his family and memories. The cake was not just food, but a symbol of love and a connection to home. For this reason, the soldier becomes the first symbol of “carrying Tết away” — a simple yet powerful image that reflects the journey of preserving tradition and emotional connection, no matter the distance.📍";
  }

  if (type === "price") {
    img.src = "img/price.png";
    userText = "Giá bao nhiêu?";
    reply = "Giá từ 45k - 60k 🎉";
  }

  if (type === "ship") {
    img.src = "img/ship.png";
    userText = "TETAWAY journey was born";
    reply = "🧧 TETAWAY – ON THE GO<br>Carry Tết. Anywhere.";
  }

  if (type === "vegan") {
    img.src = "img/vegan.png";
    userText = "Có bánh chay không?";
    reply = "Có bánh tét chay 🌱";
  }

  if (type === "save") {
    img.src = "img/save.png";
    userText = "Bảo quản thế nào?";
    reply = "Để nơi khô ráo hoặc tủ lạnh ❄️";
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
