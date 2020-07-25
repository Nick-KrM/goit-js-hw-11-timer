import { getDays, getHours, getMins, getSecs } from './timerUntils';

const desiredDate = new Date('Jul 30, 2020');

const templateSecond = value => `
<div class="date-field">    
    <div class="field ">
        <span class="days" data-value="days">${value}</span>
        <span class="label">Days</span>
    </div>

    <div class="field">
        <span class="hours" data-value="hours">${value}</span>
        <span class="label">Hours</span>
    </div>

    <div class="field">
        <span class="mins" data-value="mins">${value}</span>
        <span class="label">Minutes</span>
    </div>

    <div class="field">
        <span class="secs" data-value="secs">${value}</span>
        <span class="label">Seconds</span>
    </div>
</div>
    <div class="buttons">
        <button class="button stop" disabled><span>Stop</span></button>
        <button class="button start"><span>Start</span></button>
    </div>
`;

export default function TimerSecond({ selector }) {
    this.value = '00';
    this.id = undefined;

    document
        .querySelector(selector)
        .insertAdjacentHTML('beforeend', templateSecond(this.value));

    const refs = {
        dateField: document.querySelector(`${selector} .date-field`),
        days: document.querySelector(`${selector} .days`),
        hours: document.querySelector(`${selector} .hours`),
        mins: document.querySelector(`${selector} .mins`),
        secs: document.querySelector(`${selector} .secs`),
        stop: document.querySelector(`${selector} .stop`),
        start: document.querySelector(`${selector} .start`),
    };
    // console.dir(refs.days);
    this.start = () => {
        if (this.id) {
            return;
        }

        this.id = setInterval(() => {
            const start = desiredDate;

            const end = Date.now();
            const diff = start - end;

            const days = getDays(diff)
                .toString()
                .padStart(2, 0);
            const hours = getHours(diff)
                .toString()
                .padStart(2, 0);
            const minutes = getMins(diff)
                .toString()
                .padStart(2, 0);
            const seconds = getSecs(diff)
                .toString()
                .padStart(2, 0);

            refs.days.textContent = `${days}`;
            refs.hours.textContent = `${hours}`;
            refs.mins.textContent = `${minutes}`;
            refs.secs.textContent = `${seconds}`;

        }, 1000);
        refs.dateField.classList.add('color-animation');
        refs.start.setAttribute('disabled', true);
        refs.stop.removeAttribute('disabled');
    };

    this.stop = () => {
        clearInterval(this.id);
        this.id = 0;

        refs.days.textContent = this.value;
        refs.hours.textContent = this.value;
        refs.mins.textContent = this.value;
        refs.secs.textContent = this.value;

        refs.dateField.classList.remove('color-animation');
        refs.stop.setAttribute('disabled', true);
        refs.start.removeAttribute('disabled');
    };

    refs.stop.addEventListener('click', this.stop);
    refs.start.addEventListener('click', this.start);
};