// Stopwatch functionality
let timer;
let seconds = 0;
let isRunning = false;

const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function updateTimer() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
    }
});

pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
});

resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    seconds = 0;
    updateTimer();
});

// Todo List functionality
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

function addTodo() {
    const task = todoInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn">×</button>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
        
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
        });
    }
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Calendar and Time functionality
const currentDate = document.getElementById('currentDate');
const currentTime = document.getElementById('currentTime');
const currentMonth = document.getElementById('currentMonth');
const calendarGrid = document.getElementById('calendarGrid');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentMonthDate = new Date();

function updateDateTime() {
    const now = new Date();
    currentDate.textContent = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    currentTime.textContent = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function updateCalendar() {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    
    currentMonth.textContent = new Date(year, month).toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    calendarGrid.innerHTML = '';
    
    // Add day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.style.fontWeight = 'bold';
        calendarGrid.appendChild(dayElement);
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        
        if (day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
    updateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
    updateCalendar();
});

// Clock functionality
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const digitalTime = document.querySelector('.digital-time');

function setDate() {
    const now = new Date();
    
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    
    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    
    // Update digital time
    digitalTime.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

setInterval(setDate, 1000);
setDate(); // Initial call

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize calendar
    updateCalendar();
    
    // Initialize clock
    setDate();
    setInterval(setDate, 1000);
    
    // Initialize date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);
}); 