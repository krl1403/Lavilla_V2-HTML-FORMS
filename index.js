// Dropdown togglers script
document.addEventListener("click", (event) => {
  const dropdownToggle = event.target.closest(".dropdown-toggle");

  const dropdown = dropdownToggle.parentNode;
  const menu = dropdown.querySelector(".menu");

  // Close other open dropdowns if one dropdown is selected
  const openMenus = document.querySelectorAll(".menu.open");
  openMenus.forEach((openMenu) => {
    if (openMenu !== menu) {
      openMenu.classList.remove("open");
      const openToggle = openMenu.parentNode.querySelector(".dropdown-toggle");
      openToggle.classList.remove("open");
    }
  });

  // Toggle the clicked dropdown
  menu.classList.toggle("open");
  dropdownToggle.classList.toggle("open");
});