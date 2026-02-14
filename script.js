const messages = [
  "Muuuuu???",
  "Really sure?? Aishwaraya mohanraj?",
  "Kolla pore mu unaa yes kudu",
  "Thirumbavumaa muuu 😠",
  "Just think about it!",
  "No sonna, I will be really sad... bubbu 😔",
  "Ok fine, I will stop asking... podiii",
  "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
  const audio = document.getElementById('bg-music');

  const navigate = () => {
    console.log('[index] navigating to yes_page.html');
    window.location.href = 'yes_page.html';
  };

  if (!audio) {
    console.warn('[index] bg-music element not found; navigating without audio');
    return navigate();
  }

  try {
    audio.volume = 0;
    const targetVol = 0.6;
    const step = 0.05;

    const playPromise = audio.play();
    console.log('[index] called audio.play()');

    const afterPlay = () => {
      console.log('[index] audio.play() resolved; setting flag + delaying nav a bit');
      sessionStorage.setItem('playMusicFromYesClick', '1');

      const iv = setInterval(() => {
        audio.volume = Math.min(targetVol, (audio.volume + step));
        if (audio.volume >= targetVol) clearInterval(iv);
      }, 100);

      setTimeout(navigate, 200);
    };

    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.then(afterPlay).catch((err) => {
        console.log('[index] playback prevented or failed:', err);
        sessionStorage.setItem('playMusicFromYesClick', '1');
        setTimeout(navigate, 50);
      });
    } else {
      sessionStorage.setItem('playMusicFromYesClick', '1');
      setTimeout(navigate, 150);
    }
  } catch (e) {
    console.warn('[index] exception in handleYesClick:', e);
    navigate();
  }
}