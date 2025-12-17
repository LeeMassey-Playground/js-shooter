const howToBtn = document.querySelector('.how-to-toggle');
const instructions = document.querySelector('.instructions');

howToBtn.addEventListener('click', () => {
    instructions.classList.toggle('open');
    howToBtn.textContent = instructions.classList.contains('open') ? 'Close Instructions' : 'How to play';
});