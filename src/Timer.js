import { getDays, getHours, getMins, getSecs } from './timerUntils';

const template = value => `
<div class="timer">
  <span class="value time">${value}</span>
  <div class="buttons">
    <button class="button stop" disabled><span>Pause</span></button>
    <button class="button start"><span>Start</span></button>
  </div>
</div>
`;

export default function Timer({ selector }) {
    this.value = '00:00:00:00';
    this.id = undefined;

    document
        .querySelector(selector)
        .insertAdjacentHTML('beforeend', template(this.value));

    const refs = {
        value: document.querySelector(`${selector} .value`),
        stop: document.querySelector(`${selector} .stop`),
        start: document.querySelector(`${selector} .start`),
    };

    this.start = () => {
        if (this.id) {
            return;
        }

        this.id = setInterval(() => {
            const start = new Date('Jul 29, 2020');

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

            refs.value.textContent = `${days}:${hours}:${minutes}:${seconds}`;
        }, 1000);
        refs.start.setAttribute('disabled', true);
        refs.stop.removeAttribute('disabled');
    };

    this.stop = () => {
        clearInterval(this.id);
        this.id = 0;
        refs.stop.setAttribute('disabled', true);
        refs.start.removeAttribute('disabled');
    };

    refs.stop.addEventListener('click', this.stop);
    refs.start.addEventListener('click', this.start);
};