function updateTime() {
  const now = new Date();
  const dateElement = document.querySelector(".date");
  const timeElement = document.querySelector(".time");

  const dateOptions = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
  };

  const timeOptions = {
      hour: "2-digit",
      minute: "2-digit"
  };

  dateElement.textContent = now.toLocaleDateString("ko-KR", dateOptions);
  timeElement.textContent = now.toLocaleTimeString("ko-KR", timeOptions);
}

// 매 초마다 시간을 갱신합니다.
setInterval(updateTime, 1000);

function navigateToPlogging() {
  // 다른 페이지로 이동합니다.
  window.location.href = "plogging.html";
}

function getRandomPercent() {
  return Math.floor(Math.random() * 100) + 1;
}

function adjustBoxHeight() {
  const boxes = document.querySelectorAll(".box_1, .box_2, .box_3");

  boxes.forEach(function(box) {
    const percentElement = box.querySelector(".percent");
    const randomPercent = getRandomPercent();
    percentElement.textContent = randomPercent + "%"; // Display random percentage
    const percentValue = randomPercent;
    const maxHeight = 200; // Maximum height desired
    const minHeight = 50;  // Minimum height desired

    const calculatedHeight = (percentValue / 100) * (maxHeight - minHeight) + minHeight;
    box.style.height = calculatedHeight + "px";
  });
}

document.addEventListener("DOMContentLoaded", function() {
  adjustBoxHeight();
});
