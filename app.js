const app = () => {
  let songList = [
    {
      songPath: "./songs/Alone_320(PaglaSongs).mp3",
      image: "music1.jpg",
    },
    {
      songPath: "./songs/Believer Mp3 Imagine Dragons.mp3",
      image: "music2.jpg",
    },
    {
      songPath: "./songs/Friends - Marshmello, Anne Marie.mp3",
      image: "music3.jpg",
    },
    {
      songPath:
        "./songs/Alan Walker, Sabrina Carpenter & Farruko - On My Way.mp3",
      image: "music4.jpg",
    },
    {
      songPath:
        "./songs/Luis Fonsi, Daddy Yankee - Despacito ft. Justin Bieber.mp3",
      image: "music5.jpg",
    },
  ];
  const bannerPlayButton = document.querySelector(".play-icon");
  const banner = document.querySelector(".banner");
  const volumeButton = document.querySelector(".volume-button");
  const volumeBar = document.querySelector(".volume-slider");
  const musicPlayerArea = document.querySelector(".music-player-area");
  const nextButton = document.querySelector(".play-buttons span:nth-child(4)");
  const playButton = document.getElementById("play");
  const prevButton = document.getElementById("prev");
  const songImage = document.querySelector(".song-image");
  const audio = document.getElementById("audio");
  const shuffleButton = document.getElementById("shuffle");
  const playListUl = document.getElementById("playlist-ul");

  let isSongPlaying = false;

  const player = () => {
    playButton.addEventListener("click", () => {
      checkIsSongPlaying();
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
      songChange("next");
      keepPlayPause();
    });

    prevButton.addEventListener("click", () => {
      songChange("prev");
      keepPlayPause();
    });

    shuffleButton.addEventListener("click", () => {
      console.log("hi");
      let playListLi = document.querySelectorAll("#playlist-ul li");
      for (let li of playListLi) playListUl.removeChild(li);
      songList.sort(() => Math.random() - 0.5);

      playListGeneration();
    });

    const checkIsSongPlaying = () => {
      if (isSongPlaying) {
        isSongPlaying = false;
        playButton.innerHTML = "play_circle";
        audio.pause();
      } else {
        isSongPlaying = true;

        playButton.innerHTML = "pause_circle";

        audio.play();
      }
    };

    const songChange = (destination) => {
      songIndex = Number(songImage.getAttribute("value"));

      switch (destination) {
        case "prev":
          songIndex = Math.abs(--songIndex) % songList.length;
          break;

        case "next":
          songIndex = ++songIndex % songList.length;
          break;

        default:
          console.log("error");
          break;
      }
      console.log(songIndex);
      playByIndex(songIndex);
    };

    const playByIndex = (songIndex) => {
      console.log("play by index");
      let newImageUrl = `url(./images/${songList[songIndex].image})`;
      let newSongURL = songList[songIndex].songPath;
      songImage.setAttribute("value", songIndex);
      songImage.style.backgroundImage = newImageUrl;
      audio.src = newSongURL;
    };
    const keepPlayPause = () => {
      if (isSongPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    };
    const playListGeneration = () => {
      let playListLi = document.querySelectorAll("#playlist-ul li");
      for (let song of songList) {
        let li = document.createElement("li");
        li.innerHTML = song.songPath.slice(8);
        li.setAttribute("value", songList.indexOf(song));
        console.log(li.getAttribute("value"));
        playListUl.appendChild(li);
      }
      playListLi = document.querySelectorAll("#playlist-ul li");
      playListLi.forEach((li) => {
        li.addEventListener("click", () => {
          console.log(li.getAttribute("value"));
          let index = Number(li.getAttribute("value"));
          console.log(songList[index].songPath);
          playByIndex(index);
          keepPlayPause();
        });
      });
    };
    playListGeneration();
  };

  player();
};

app();
