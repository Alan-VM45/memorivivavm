document.querySelectorAll('.photo-carousel').forEach((carousel) => {
	const photoNumbers = carousel.dataset.photos.split(',').map(Number);
	const slides = [];

	for (let index = 0; index < photoNumbers.length; index += 1) {
		const slide = document.createElement('div');
		slide.className = 'carousel-slide';
		slide.setAttribute('role', 'group');
		slide.setAttribute('aria-roledescription', 'diapositiva');
		slide.setAttribute('aria-label', `${slides.length + 1} de ${photoNumbers.length}`);
		slide.hidden = slides.length > 0;

		const frame = document.createElement('figure');
		const image = document.createElement('img');
		image.src = `photos/${photoNumbers[index]}.jpeg`;
		image.alt = `Foto ${photoNumbers[index]} de los recuerdos de Vilma y su familia`;
		image.loading = slides.length === 0 ? 'eager' : 'lazy';
		image.decoding = 'async';
		frame.append(image);
		slide.append(frame);

		slides.push(slide);
		carousel.append(slide);
	}

	const controls = document.createElement('div');
	controls.className = 'carousel-controls';
	controls.setAttribute('role', 'group');
	controls.setAttribute('aria-label', 'Controles del carrusel');

	const previous = document.createElement('button');
	previous.className = 'carousel-button';
	previous.type = 'button';
	previous.setAttribute('aria-label', 'Fotos anteriores');
	previous.textContent = '\u2039';

	const status = document.createElement('span');
	status.className = 'carousel-status';
	status.setAttribute('aria-live', 'polite');

	const next = document.createElement('button');
	next.className = 'carousel-button';
	next.type = 'button';
	next.setAttribute('aria-label', 'Fotos siguientes');
	next.textContent = '\u203a';

	let currentSlide = 0;
	const showSlide = (index) => {
		currentSlide = (index + slides.length) % slides.length;
		slides.forEach((slide, slideIndex) => {
			slide.hidden = slideIndex !== currentSlide;
		});
		status.textContent = `${currentSlide + 1} / ${slides.length}`;
	};

	previous.addEventListener('click', () => showSlide(currentSlide - 1));
	next.addEventListener('click', () => showSlide(currentSlide + 1));
	controls.append(previous, status, next);
	carousel.append(controls);
	showSlide(0);
});

const musicToggle = document.querySelector('.music-toggle');
const backgroundAudio = document.querySelector('#mami-audio');

const updateMusicToggle = () => {
	const isPlaying = !backgroundAudio.paused;
	musicToggle.classList.toggle('is-playing', isPlaying);
	musicToggle.setAttribute('aria-pressed', String(isPlaying));
	musicToggle.setAttribute('aria-label', `${isPlaying ? 'Pausar' : 'Reproducir'} Yo sé que volverás de Luis Miguel`);
	musicToggle.title = `${isPlaying ? 'Pausar' : 'Reproducir'} canción`;
};

musicToggle.addEventListener('click', async () => {
	if (backgroundAudio.paused) {
		try {
			await backgroundAudio.play();
		} catch {
			updateMusicToggle();
		}
	} else {
		backgroundAudio.pause();
	}
});

backgroundAudio.addEventListener('play', updateMusicToggle);
backgroundAudio.addEventListener('pause', updateMusicToggle);
backgroundAudio.addEventListener('ended', updateMusicToggle);
