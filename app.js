const app = () => {
  const bannerPlayButton = document.querySelector(".play-icon");
  const banner = document.querySelector(".banner");
  const volumeButton = document.querySelector(".volume-button");
  const volumeBar = document.querySelector(".volume-slider");
  const musicPlayerArea = document.querySelector(".music-player-area");
  const nextButton = document.querySelector(".play-buttons span:nth-child(4)");
  const playButton = document.getElementById("play");
  const songImage = document.querySelector(".song-image");
  const audio = document.getElementById("audio");
  console.log(audio);

  const songList = [
    {
      songPath: "./songs/Alone_320(PaglaSongs).mp3",
      image: "music1.jpg",
    },
    {
      songPath: "./songs/Believer Mp3 Imagine Dragons.mp3",
      image: "music2.jpg",
    },
  ];

  playButton.addEventListener("click", () => {
    console.log("hi");
    audio.play();
  });

  bannerPlayButton.addEventListener("click", () => {
    banner.style.display = "none";
    musicPlayerArea.style.display = "flex";
  });
  volumeButton.addEventListener("click", () => {
    volumeBar.classList.toggle("show");
    console.log("dslkhfladsk");
  });
  volumeBar.addEventListener("change", () => {
    console.log(volumeBar.value);
  });
  nextButton.addEventListener("click", () => {
    console.log("hsldfsdk");
    songIndex = Number(songImage.getAttribute("value"));
    console.log(songIndex);

    songIndex = ++songIndex % songList.length;
    console.log(songIndex);
    let newImageUrl = `url(./images/${songList[songIndex].image})`;
    songImage.setAttribute("value", songIndex);
    console.log(newImageUrl);
    songImage.style.backgroundImage = newImageUrl;
  });
};
app();
