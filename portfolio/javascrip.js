document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".skills-wrapper");
  const bars = document.querySelectorAll(".progress-line span");
  const circles = document.querySelectorAll(".path");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => {
          bar.style.width = getComputedStyle(bar).getPropertyValue("--target-width");
        });

        circles.forEach(circle => {
          circle.style.strokeDashoffset = getComputedStyle(circle).getPropertyValue("--target-offset");
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.4 }); 

  observer.observe(section);
});

const button3 = document.getElementsByClassName("final-buton")[0];
button3.addEventListener("click", () => {
  document.getElementById("ee-mail").value = "";
 
});
