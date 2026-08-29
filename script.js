const yearElement = document.getElementById("year");

if (yearElement) {
	yearElement.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia
	? window.matchMedia("(prefers-reduced-motion: reduce)").matches
	: false;
const revealElements = document.querySelectorAll(
	".hero, .leaders-section, .profile-showcase, .profil2-showcase, .unggulan-showcase, .gallery-showcase, .news-showcase, .admission-showcase, .services-showcase, .footer"
);

revealElements.forEach((element) => {
	element.setAttribute("data-reveal", "");
	element.querySelectorAll(
		".leader-card, .curriculum-card, .profile-panel, .visi-misi-card, .facility-item, .unggulan-card, .gallery-photo, .location-card, .news-card, .service-card, .address-card"
	).forEach((item, index) => {
		item.setAttribute("data-reveal-item", "");
		item.style.setProperty("--motion-delay", `${Math.min(index * 80, 480)}ms`);
	});
});

const revealObserver = "IntersectionObserver" in window
	? new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12 }
		)
	: null;

revealElements.forEach((element) => {
	if (prefersReducedMotion || !revealObserver) {
		element.classList.add("is-visible");
	} else {
		revealObserver.observe(element);
	}
});

document.querySelectorAll("a, button").forEach((interactiveElement) => {
	interactiveElement.addEventListener("click", () => {
		interactiveElement.classList.remove("click-pulse");
		void interactiveElement.offsetWidth;
		interactiveElement.classList.add("click-pulse");
	});
});

const headerElement = document.querySelector(".header");

if (headerElement) {
	const updateHeaderState = () => {
		headerElement.classList.toggle("is-scrolled", window.scrollY > 12);
	};

	updateHeaderState();
	window.addEventListener("scroll", updateHeaderState, { passive: true });
}
