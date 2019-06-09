var counter;
const timeLeftDiv = document.querySelector(".display__time-left");
const endTimeDiv = document.querySelector('.display__end-time');

function setTimer(time) {
    clearInterval(counter);
    var final = time*1000 + Date.now();
    var endTime = new Date(final);
    endTimeDiv.innerHTML = "Be Back at "+endTime.getHours()+':'+endTime.getMinutes()+':'+endTime.getSeconds();
    displayTimeLeft(time);
    counter = setInterval(() => {
        const timeLeft = Math.round((final - Date.now())/1000);
        if(timeLeft<0) {
            return;
        }
        displayTimeLeft(timeLeft);
    }, 1000);
}

function displayTimeLeft(timeLeft) {
    const min = Math.floor(timeLeft/60);
    const sec = timeLeft%60;
    timeLeftDiv.innerHTML = min+":"+sec;
    document.title = min+":"+sec;
}

document.querySelectorAll('.timer__button').forEach(button => button.addEventListener('click', (event) => {
    setTimer(event.target.dataset.time);
}));

document.querySelector('#custom').addEventListener('submit', (event) => {
    event.preventDefault();
    setTimer(parseInt(event.target[0].value)*60);
})