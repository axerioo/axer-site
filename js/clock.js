window.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('body');
    const footer = document.querySelector('footer');
    const text = document.querySelector('.text');

    const clock = () => {
        let time = new Date().toLocaleTimeString();
        text.textContent = time;
    }
    setInterval(clock, 1000);

    page.onclick = () => {
        if (footer.style.display === 'none') {
            footer.style.display = 'flex';
            text.style.marginBottom = '0';
        } else {
            footer.style.display = 'none';
            text.style.marginBottom = 'auto';
        }
    }
});