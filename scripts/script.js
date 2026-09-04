document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  navToggle.addEventListener("click", function () {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  const courseList = document.getElementById("courseList");
  const creditsTotal = document.getElementById("creditsTotal");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function renderCourses(filter) {
    let filtered = courses;
    if (filter !== "all") {
      filtered = courses.filter(function (course) {
        return course.subject.toLowerCase() === filter;
      });
    }

    courseList.innerHTML = "";

    filtered.forEach(function (course) {
      const item = document.createElement("li");
      item.className = "course-card" + (course.completed ? " is-completed" : "");

      let badge = "";
      if (course.completed) {
        badge = '<span class="course-badge">Completed</span>';
      }

      item.innerHTML =
        '<span class="course-code">' + course.subject + " " + course.number + "</span>" +
        '<h3 class="course-title">' + course.title + "</h3>" +
        '<p class="course-credits">' + course.credits + " credits</p>" +
        badge;

      courseList.appendChild(item);
    });

    const totalCredits = filtered.reduce(function (sum, course) {
      return sum + course.credits;
    }, 0);

    creditsTotal.textContent = "The total credits for the courses listed above is " + totalCredits;
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove("is-active");
      });
      button.classList.add("is-active");
      renderCourses(button.dataset.filter);
    });
  });

  renderCourses("all");
});
