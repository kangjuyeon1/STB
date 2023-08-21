// Ambil nilai time count terakhir dari localStorage
  const lastTimeCount = localStorage.getItem('lastTimeCount');
  const lastTimeCountElement = document.getElementById('lastTimeCount');
  const hours = Math.floor(lastTimeCount / 3600);
  const minutes = Math.floor((lastTimeCount % 3600) / 60);
  const seconds = lastTimeCount % 60;
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  lastTimeCountElement.textContent = formattedTime;

    let totalSeconds = 0;
    const timecountElement = document.querySelector(".timecount");
    
    function updateTime() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timecountElement.textContent = formattedTime;
    totalSeconds++;
    }

    function setInitialPositions() {
    const images = document.querySelectorAll(".imgs img");
    const radius = 100;
    const numImages = images.length;
    const angleIncrement = (360 / numImages) * (Math.PI / 180);
    let currentAngle = 0;
    
    for (let i = 0; i < numImages; i++) {
    const angle = currentAngle + i * angleIncrement;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    images[i].style.transform = `translate(${x}px, ${y}px)`;
    }
    
    setInterval(() => {
    currentAngle += 0.01; // 조절 가능한 값으로, 숫자를 늘리면 더 빠른 회전이 가능합니다.
    for (let i = 0; i < numImages; i++) {
    const angle = currentAngle + i * angleIncrement;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    images[i].style.transform = `translate(${x}px, ${y}px)`;
    }
    }, 16); // 16ms 간격으로 업데이트하여 부드럽게 움직입니다. 
    }
    
    setInitialPositions();
    
    function navigateToQR() {
    // 다른 페이지로 이동합니다.
    window.location.href = "QR";
    }
    // Get the value from the .widget element
    const weightElement = document.querySelector(".weight");
    const weightValue = parseFloat(weightElement.textContent);

    // Calculate the points and update the footer
    const points = weightValue * 10;
    const pointTextElement = document.getElementById("pointText");
    pointTextElement.textContent = `+ ${points.toFixed(2)}P`;