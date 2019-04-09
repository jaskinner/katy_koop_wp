(function () {
	var button = document.querySelector(".site-menu-toggle");
	var menu = document.querySelector(".menu-wrapper");
	button.addEventListener("click", function (evt) {
		menu.classList.toggle("toggled-menu");
	});
})();

