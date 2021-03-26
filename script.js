const display = document.getElementById('display');

let audio = document.getElementById('audio');

setInterval(() => {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    display.innerHTML = `${hour}:${min}:${sec}`;
    matchTime(hour, min, sec);
}, 1000);

//I will write the logic from here

function getAndUpdate() {
    console.log('Updatting!!');
    let hours = document.getElementById('horas').value;
    let mins = document.getElementById('mins').value;
    let secs = document.getElementById('sec').value;
    if (localStorage.getItem('swiftAlarm') == null) {
        let swiftAlarmItems = [];
        swiftAlarmItems.push([hours, mins, secs]);
        localStorage.setItem('swiftAlarm', JSON.stringify(swiftAlarmItems));
    } else {
        let swiftAlarmItemsStr = localStorage.getItem('swiftAlarm');
        let swiftAlarmItems = JSON.parse(swiftAlarmItemsStr);
        swiftAlarmItems.push([hours, mins, secs]);
        localStorage.setItem('swiftAlarm', JSON.stringify(swiftAlarmItems));
    }
    update();
}

function update() {
    if (localStorage.getItem('swiftAlarm') == null) {
        let swiftAlarmItems = []
        localStorage.setItem('swiftAlarm', JSON.stringify(swiftAlarmItems));
    } else {
        let swiftAlarmItemsStr = localStorage.getItem('swiftAlarm');
        swiftAlarmItems = JSON.parse(swiftAlarmItemsStr);
    }
    //populating the table
    let displayItems = document.querySelector('.list');
    let str = '';
    swiftAlarmItems.forEach((element, index) => {
        str += `<li class="list-item">${element[0]}:${element[1]}:${element[2]}<button class="delete" onclick = "deleted(${index})">X</button></li>`;
    });
    displayItems.innerHTML = str;
}
function deleted(itemIndex) {
    console.log(itemIndex);
    let swiftAlarmItemsStr = localStorage.getItem('swiftAlarm');
    let swiftAlarmItems = JSON.parse(swiftAlarmItemsStr);
    swiftAlarmItems.splice(itemIndex, 1);
    localStorage.setItem('swiftAlarm', JSON.stringify(swiftAlarmItems));
    update();
}

const alarmIcon = document.getElementById('alarm-icon');

function matchTime(hours, mins, secs) {
    let swiftAlarmItemsStr = localStorage.getItem('swiftAlarm');
    let swiftAlarmItems = JSON.parse(swiftAlarmItemsStr);
    swiftAlarmItems.forEach((element) => {
        if (hours == element[0] && mins == element[1] && secs == element[2]) {
            audio.play();
            alarmIcon.style.display = 'flex';
        }
    });
}

function stop() {
    alarmIcon.style.display = 'none';
    audio.pause();
}

let hours = document.getElementById('horas').value;
let mins = document.getElementById('mins').value;
let secs = document.getElementById('sec').value;

const add = document.getElementById('addBtn');
add.addEventListener('click', getAndUpdate);

update();

const listItemsNav = document.querySelector('.nav-list');

if (window.innerWidth <= 500) {
    listItemsNav.style.display = 'none';
}
// console.log(listItemsNav);
const toggle = document.getElementById('toggle');
toggle.addEventListener('click', () => {
    console.log('toggler clicked');
    if (listItemsNav.style.display == 'none') {
        listItemsNav.style.display = 'flex';
    } else {
        listItemsNav.style.display = 'none';
    }
});
