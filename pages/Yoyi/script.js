const btnIzquierda = document.querySelectorAll('.carousel-btn.izquierda');
  const btnDerecha = document.querySelectorAll('.carousel-btn.derecha');
  const carouseles = document.querySelectorAll('.carousel');

  btnIzquierda.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      carouseles[i].scrollBy({ left: -300, behavior: 'smooth' });
    });
  });

  btnDerecha.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      carouseles[i].scrollBy({ left: 300, behavior: 'smooth' });
    });
  });

  // Intentar reproducir música al primer interacción (clic, toque o scroll)
  const reproducirMusica = () => {
    const audio = document.getElementById('musica-fondo');
    if (audio && audio.paused) {
      audio.play().catch(error => console.log("Autoplay bloqueado:", error));
    }
  };

  document.addEventListener('click', reproducirMusica, { once: true });
  document.addEventListener('touchstart', reproducirMusica, { once: true });
  document.addEventListener('scroll', reproducirMusica, { once: true });
  
  // Intentar al cargar la página
  window.addEventListener('load', reproducirMusica);