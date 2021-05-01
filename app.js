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
    {
      songPath: "./songs/Ed Sheeran - Shape of You (Official Music Video).mp3",
      image: "music5.jpg",
    },
    {
      songPath: "./songs/Alan Walker - Faded.mp3",
      image: "music5.jpg",
    },
    {
      songPath: "./songs/Coldplay - Hymn For The Weekend (Official Video).mp3",
      image: "music5.jpg",
    },
    {
      songPath: "./songs/Maroon 5 - Memories (Official Video).mp3",
      image: "music5.jpg",
    },
    {
      songPath:
        "./songs/Maroon 5 - Girls Like You ft. Cardi B (Official Music Video).mp3",
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
  const burgerButton = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const playListButton = document.querySelector(".playlist-icon");
  const playListArea = document.querySelector(".playlist-area");
  const mobilePlayListArea = document.querySelector(".mobile-playlist-area");
  const mobilePlayListUl = document.getElementById("mobile-playlist-ul");
  const progressContainer = document.querySelector(".progress-container");
  const navLinksLi = document.querySelectorAll(".nav-links li");
  console.log(navLinksLi);

  let isSongPlaying = false;
  let timer;
  let percent = 0;
  audio.volume = volumeBar.value / 100;

  const player = () => {
    navLinksLi.forEach((li, index) => {
      li.addEventListener("click", () => {
        if (navLinks.classList.contains("show")) {
          navLinks.classList.toggle("show");
          burgerButton.innerHTML = "menu";
        }
      });
    });

    burgerButton.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      if (burgerButton.innerHTML === "menu")
        burgerButton.innerHTML = "menu_open";
      else burgerButton.innerHTML = "menu";
    });
    playButton.addEventListener("click", () => {
      checkIsSongPlaying();
    });

    bannerPlayButton.addEventListener("click", () => {
      banner.style.display = "none";
      musicPlayerArea.style.display = "flex";
    });

    audio.ontimeupdate = () => {
      // console.log((100 * audio.currentTime) / audio.duration);
      let progress = document.getElementById("progress");
      progress.style.width = `${Math.floor(
        (100 * audio.currentTime) / audio.duration
      )}% `;
    };

    progressContainer.onclick = (event) => {
      audio.currentTime =
        (event.offsetX / progressContainer.offsetWidth) * audio.duration;
    };
    playListButton.addEventListener("click", () => {
      mobilePlayListArea.classList.toggle("show-mobile-playlist-area");
      songImage.classList.toggle("show-image");
    });

    songImage.addEventListener("click", () => {
      if (navLinks.classList.contains("show")) {
        navLinks.classList.toggle("show");
        burgerButton.innerHTML = "menu";
      }
      if (volumeBar.classList.contains("show")) {
        volumeBar.classList.toggle("show");
      }
    });

    volumeButton.addEventListener("click", () => {
      volumeBar.classList.toggle("show");
      console.log("dslkhfladsk");
    });

    volumeBar.addEventListener("focusout", () => {
      volumeBar.classList.toggle("show");
    });

    // focus on window

    volumeBar.addEventListener("input", () => {
      audio.volume = volumeBar.value / 100;
      console.log(audio.volume);
      if (audio.volume == 0) {
        volumeButton.innerHTML = "volume_off";
      } else {
        volumeButton.innerHTML = "volume_up";
      }
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
      playByIndex(0);
      keepPlayPause();
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
      // added click event for each li
      // call play by index function in each click
      playListLi.forEach((li) => {
        li.addEventListener("click", () => {
          console.log(li.getAttribute("value"));
          let index = Number(li.getAttribute("value"));
          console.log(songList[index].songPath);
          playByIndex(index);
          keepPlayPause();
          playListLi.forEach((item) => {
            item.classList.remove("active-music");
          });
          li.classList.add("active-music");
        });
      });
    };
    const mobilePlayListGeneration = () => {
      let playListLi = document.querySelectorAll("#mobile-playlist-ul li");
      for (let song of songList) {
        let li = document.createElement("li");
        li.innerHTML = song.songPath.slice(8);
        li.setAttribute("value", songList.indexOf(song));
        console.log(li.getAttribute("value"));
        mobilePlayListUl.appendChild(li);
      }
      playListLi = document.querySelectorAll("#mobile-playlist-ul li");
      console.log(playListLi);
      // added click event for each li
      // call play by index function in each click
      playListLi.forEach((li) => {
        li.addEventListener("click", () => {
          console.log(li.getAttribute("value"));
          let index = Number(li.getAttribute("value"));
          console.log(songList[index].songPath);
          playByIndex(index);
          keepPlayPause();
          playListLi.forEach((item) => {
            item.classList.remove("active-music");
          });
          li.classList.add("active-music");
          if (volumeBar.classList.contains("show")) {
            volumeBar.classList.toggle("show");
          }
          if (navLinks.classList.contains("show")) {
            navLinks.classList.toggle("show");
            burgerButton.innerHTML = "menu";
          }
        });
      });
    };
    playListGeneration();
    mobilePlayListGeneration();
  };

  player();
};

app();
