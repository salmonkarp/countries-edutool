document.addEventListener('DOMContentLoaded', () => {
    if(!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        switchTheme('dark');
    }
})

function switchTheme(theme = 'dark') {
    let stuff = document.querySelectorAll('button, input, select, .element');
    if(document.body.classList.contains('dark-theme') || theme === 'light'){
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        stuff.forEach(el => {
            el.classList.remove('dark-theme');
            el.classList.add('light-theme');
        });
        document.querySelector('.theme-icon').classList.remove('fa-moon');
        document.querySelector('.theme-icon').classList.add('fa-sun');
        document.querySelector('.theme-switcher').innerHTML = `<i class="fa-solid fa-sun theme-icon"></i>Light Mode`;
    }
    else{
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        stuff.forEach(el => {
            el.classList.remove('light-theme');
            el.classList.add('dark-theme');
        });
        document.querySelector('.theme-icon').classList.remove('fa-sun');
        document.querySelector('.theme-icon').classList.add('fa-moon');
        document.querySelector('.theme-switcher').innerHTML = `<i class="fa-solid fa-moon theme-icon"></i>Dark Mode`;
    }
}

