document.addEventListener("DOMContentLoaded", () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  const targets = document.querySelectorAll(
    ".image-container-potrait, .description, .chart-content-description-mofo, .chart-container, .story, .showcase, .speaker, .pointer-row"
  );
  targets.forEach((target) => observer.observe(target));

  // Speakers section
  const speakers = [
    {
      name: "Jane Doe",
      title: "CEO of Example Corp",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, nam ipsam nulla rerum expedita iste nemo assumenda ipsa ea illum, sequi corporis ullam saepe a ex! Doloremque repellendus fugit quibusdam!",
      image: "assets/images/Potraits/person-8.jpg",
    },
    {
      name: "Mary Smith",
      title: "Founder of Startup Inc.",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, nam ipsam nulla rerum expedita iste nemo assumenda ipsa ea illum, sequi corporis ullam saepe a ex! Doloremque repellendus fugit quibusdam!",
      image: "assets/images/Potraits/person-9.jpg",
    },
    {
      name: "Susan Johnson",
      title: "Chief Marketing Officer at Big Brand",
      bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, nam ipsam nulla rerum expedita iste nemo assumenda ipsa ea illum, sequi corporis ullam saepe a ex! Doloremque repellendus fugit quibusdam!",
      image: "assets/images/Potraits/person-6.jpg",
    },
  ];

  let currentIndex = 0;
  const imageElement = document.getElementById("current-speaker-image");
  const nameElement = document.getElementById("current-speaker-name");
  const titleElement = document.getElementById("current-speaker-title");
  const bioElement = document.getElementById("current-speaker-bio");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let intervalId;

  function updateSpeaker() {
    const currentSpeaker = speakers[currentIndex];
    imageElement.classList.add("fade-out");
    nameElement.classList.add("fade-out");
    titleElement.classList.add("fade-out");
    bioElement.classList.add("fade-out");

    setTimeout(() => {
      imageElement.src = currentSpeaker.image;
      nameElement.textContent = currentSpeaker.name;
      titleElement.textContent = currentSpeaker.title;
      bioElement.textContent = currentSpeaker.bio;

      imageElement.classList.remove("fade-out");
      nameElement.classList.remove("fade-out");
      titleElement.classList.remove("fade-out");
      bioElement.classList.remove("fade-out");
      imageElement.classList.add("fade-in");
      nameElement.classList.add("fade-in");
      titleElement.classList.add("fade-in");
      bioElement.classList.add("fade-in");
    }, 500);
  }

  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % speakers.length;
      updateSpeaker();
    }, 8000);
  }

  function showPrevSpeaker() {
    currentIndex = (currentIndex - 1 + speakers.length) % speakers.length;
    updateSpeaker();
    resetInterval();
  }

  function showNextSpeaker() {
    currentIndex = (currentIndex + 1) % speakers.length;
    updateSpeaker();
    resetInterval();
  }

  prevBtn.addEventListener("click", showPrevSpeaker);
  nextBtn.addEventListener("click", showNextSpeaker);

  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % speakers.length;
    updateSpeaker();
  }, 8000);
  updateSpeaker();

  //   Start of the partners logo section
  const carousel = document.querySelector('.partners-carousel');
    const images = carousel.querySelectorAll('img');
    images.forEach(img => {
      const clone = img.cloneNode(true);
      carousel.appendChild(clone);
    });
});
