function toggleDropdown(button) {
    var types = button.nextElementSibling;
    if (types.style.display === "block") {
      types.style.display = "none";
    } else {
      types.style.display = "block";
      var items = types.getElementsByClassName("types-item");
      for (var i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function() {
          types.style.display = "none";
          button.querySelector("span").textContent = this.textContent;
        });
      }
    }
  }