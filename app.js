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
      image: "music6.jpg",
    },
    {
      songPath: "./songs/Alan Walker - Faded.mp3",
      image: "music7.jpg",
    },
    {
      songPath: "./songs/Coldplay - Hymn For The Weekend (Official Video).mp3",
      image: "music8.jpg",
    },
    {
      songPath: "./songs/Maroon 5 - Memories (Official Video).mp3",
      image: "music9.jpg",
    },
    {
      songPath:
        "./songs/Maroon 5 - Girls Like You ft. Cardi B (Official Music Video).mp3",
      image: "music10.jpg",
    },
  ];
  const bannerPlayButton = document.querySelector(".play-icon");
  const banner = document.querySelector(".banner");
  const volumeButton = document.querySelector(".volume-button");
  const volumeBar = document.querySelector(".volume-slider");
  const volumeContainer = document.querySelector(".volume-container");
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
  const main = document.querySelector(".main");
  const dragButton = document.querySelector(".drag-button");
  const navLinksLi = document.querySelectorAll(".nav-links li");
  const smallDevice = window.matchMedia("(min-width: 768px)");

  let isSongPlaying = false;
  let timer;
  let percent = 0;
  let isMouseDown = false;
  let isTouchDown = false;
  audio.volume = volumeBar.value / 100;

  smallDevice.addEventListener("change", (e) => {
    if (e.matches) {
      if (mobilePlayListArea.classList.contains("show-mobile-playlist-area")) {
        mobilePlayListArea.classList.toggle("show-mobile-playlist-area");
        songImage.classList.toggle("show-image");
      }
    }
  });

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

    const closeVolumeBar = () => {
      if (volumeContainer.classList.contains("show")) {
        volumeContainer.classList.toggle("show");
      }
    };
    audio.ontimeupdate = () => {
      // console.log((100 * audio.currentTime) / audio.duration);
      let progress = document.getElementById("progress");
      progress.style.width = `${Math.floor(
        (100 * audio.currentTime) / audio.duration
      )}% `;
    };

    progressContainer.addEventListener("mousedown", () => {
      isMouseDown = true;
    });
    progressContainer.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
    progressContainer.addEventListener(
      "mousemove",
      (event) => {
        console.log("mouse move");
        if (isMouseDown) {
          audio.currentTime =
            (event.offsetX / progressContainer.offsetWidth) * audio.duration;
        }
      },
      true
    );
    progressContainer.addEventListener("touchstart", (event) => {
      isTouchDown = true;
      console.log("touch start");
      if (isTouchDown) {
        let bcr = event.target.getBoundingClientRect();
        let offsetX = event.targetTouches[0].pageX - bcr.left;
        audio.currentTime =
          (offsetX / progressContainer.offsetWidth) * audio.duration;
      }
    });
    progressContainer.addEventListener("touchend", () => {
      isTouchDown = false;
      console.log("touch end");
    });

    //for mobile touch and drag
    progressContainer.addEventListener("touchmove", (event) => {
      console.log("touch move");
      if (isTouchDown) {
        let bcr = event.target.getBoundingClientRect();
        let offsetX = event.targetTouches[0].pageX - bcr.left;
        audio.currentTime =
          (offsetX / progressContainer.offsetWidth) * audio.duration;
      }
      console.log(progressContainer.offsetWidth);
    });
    progressContainer.addEventListener("mouseleave", () => {
      isMouseDown = false;
    });
    progressContainer.addEventListener("click", (event) => {
      audio.currentTime =
        (event.offsetX / progressContainer.offsetWidth) * audio.duration;
    });
    playListButton.addEventListener("click", () => {
      mobilePlayListArea.classList.toggle("show-mobile-playlist-area");
      songImage.classList.toggle("show-image");
      closeVolumeBar();
    });

    songImage.addEventListener("click", () => {
      if (navLinks.classList.contains("show")) {
        navLinks.classList.toggle("show");
        burgerButton.innerHTML = "menu";
      }
      closeVolumeBar();
    });

    volumeButton.addEventListener("click", () => {
      volumeContainer.classList.toggle("show");
      setTimeout(closeVolumeBar, 5000);
    });

    volumeBar.addEventListener("focusout", () => {
      volumeContainer.classList.toggle("show");
    });

    // focus on window

    volumeBar.addEventListener("input", () => {
      audio.volume = volumeBar.value / 100;

      if (audio.volume == 0) {
        volumeButton.innerHTML = "volume_off";
      } else {
        volumeButton.innerHTML = "volume_up";
      }
    });

    nextButton.addEventListener("click", () => {
      songChange("next");
      keepPlayPause();
    });

    prevButton.addEventListener("click", () => {
      songChange("prev");
      keepPlayPause();
    });

    audio.addEventListener("ended", () => {
      songChange("next");
      keepPlayPause();
    });

    shuffleButton.addEventListener("click", () => {
      let playListLi = document.querySelectorAll("#playlist-ul li");
      for (let li of playListLi) playListUl.removeChild(li);
      let mobilePlayListLi = document.querySelectorAll(
        "#mobile-playlist-ul li"
      );
      for (let li of mobilePlayListLi) mobilePlayListUl.removeChild(li);
      songList.sort(() => Math.random() - 0.5);

      playListGeneration();
      mobilePlayListGeneration();
      playByIndex(0);
      keepPlayPause();
      activePlay(0);
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

      playByIndex(songIndex);
    };
    const activePlay = (index) => {
      let playListLi = document.querySelectorAll("#playlist-ul li");
      playListLi.forEach((item) => {
        item.classList.remove("active-music");
      });
      playListLi[index].classList.add("active-music");

      let mobilePlayListLi = document.querySelectorAll(
        "#mobile-playlist-ul li"
      );
      mobilePlayListLi.forEach((item) => {
        item.classList.remove("active-music");
      });
      mobilePlayListLi[index].classList.add("active-music");
      mobilePlayListLi[index].focus();
      playListLi[index].focus();
      if (index === 0) {
        let activeLi = document.getElementById(`li-${index}`);
        activeLi.scrollIntoView();
        activeLi = document.getElementById(`mobile-li-${index}`);
        activeLi.scrollIntoView();
      }
    };

    const playByIndex = (songIndex) => {
      let newImageUrl = `url(./images/${songList[songIndex].image})`;
      let newSongURL = songList[songIndex].songPath;
      songImage.setAttribute("value", songIndex);
      songImage.style.backgroundImage = newImageUrl;
      audio.src = newSongURL;
      activePlay(songIndex);
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
        li.setAttribute("id", `li-${songList.indexOf(song)}`);
        playListUl.appendChild(li);
      }
      playListLi = document.querySelectorAll("#playlist-ul li");
      // added click event for each li
      // call play by index function in each click
      playListLi.forEach((li) => {
        li.addEventListener("click", () => {
          let index = Number(li.getAttribute("value"));

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
        li.setAttribute("id", `mobile-li-${songList.indexOf(song)}`);

        mobilePlayListUl.appendChild(li);
      }
      playListLi = document.querySelectorAll("#mobile-playlist-ul li");

      // added click event for each li
      // call play by index function in each click
      playListLi.forEach((li) => {
        li.addEventListener("click", () => {
          let index = Number(li.getAttribute("value"));

          playByIndex(index);
          keepPlayPause();
          playListLi.forEach((item) => {
            item.classList.remove("active-music");
          });
          li.classList.add("active-music");
          closeVolumeBar();
          if (navLinks.classList.contains("show")) {
            navLinks.classList.toggle("show");
            burgerButton.innerHTML = "menu";
          }
        });
      });
    };
    playListGeneration();
    mobilePlayListGeneration();
    activePlay(0);
  };

  player();
};

app();
