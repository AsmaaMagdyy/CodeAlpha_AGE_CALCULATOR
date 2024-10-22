const calcBtn = document.querySelector('.btn');
const h2 = document.querySelector('h2');
const year = document.querySelector('.year');
const month = document.querySelector('.month');
const day = document.querySelector('.day');
const spinner = document.querySelector('.fa-spin');
const date = new Date();
let dateYear = date.getFullYear();
let dateMonth = date.getMonth();
let dateDay = date.getDate();
let userYear, userMonth, userDay;


//===============To get days in prev month Start================= 
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const d = new Date();
let prevMonthNum;
if (months[d.getMonth() - 1] === months[-1]) {
    prevMonthNum = months[months.length - 1];

} else {
    prevMonthNum = months[d.getMonth() - 1];
}
//===============To get days in prev month End================= 

//===============display years options Start================= 

let yearsOptions = `<option selected>Year</option>`;

for (let i = 1930; i <= dateYear; i++) {
    yearsOptions += `
    <option value= ${i}>${i}</option>
    `;
}

document.querySelector('.year').innerHTML = yearsOptions;
//===============display years options End================= 

//===============display months options Start================= 

let monthsOptions = `<option selected>Month</option>`;

for (let i = 1; i <= 12; i++) {
    monthsOptions += `
    <option value= ${i}>${i}</option>
    `;

}

document.querySelector('.month').innerHTML = monthsOptions;
//===============display months options End================= 

//===============display days options Start================= 

let daysOptions = `<option selected>Day</option>`;

for (let i = 1; i <= 31; i++) {
    daysOptions += `
    <option value= ${i}>${i}</option>
    `;
}

document.querySelector('.day').innerHTML = daysOptions;
//===============display days options End================= 


//===============Age calc fun start================= 
// Create an instance of Notyf
var notyf = new Notyf({
    position: {
        x: 'center',
        y: 'top',
    },
    types: [

        {
            type: 'error',
            background: 'indianred',
            duration: 5000,
            dismissible: true
        }
    ]
});

function ageCalcFun() {
    spinner.classList.replace('opacity-1', 'opacity-0');
    h2.classList.replace('d-none', 'd-block');

    dateYear = date.getFullYear();
    dateMonth = date.getMonth() + 1;
    dateDay = date.getDate();

    if (year.value == 'Year' || month.value == 'Month' || day.value == 'Day') {

        h2.classList.replace('d-block', 'd-none');

        // Display an error notification
        notyf.error('Please enter your full date of birth');

    } else {

        console.log(dateMonth);
        console.log(month.value);
        if (dateMonth < month.value || dateMonth == month.value) {
            dateYear = dateYear - 1;
            dateMonth = dateMonth + 12;

        }
        if (dateDay < day.value) {
            if (dateMonth != month.value) {
                dateMonth = dateMonth - 1;
            }
            dateDay = dateDay + prevMonthNum
        } else if (dateDay == day.value) {
            userDay = null;
        }

        userYear = dateYear - year.value;
        userMonth = dateMonth - month.value;
        userDay = dateDay - day.value;

        if (userMonth == 12) {
            userMonth = null;
            userYear += 1;
        }
        if (userDay == 31) {
            userDay = null;
            userMonth += 1;
            if (userMonth == 12) {
                userMonth = null;
                userYear += 1;
            }
        }
        h2.innerHTML = (`Your age is ${userYear} year  ${userMonth ? '& ' + userMonth + ' month' : ''}  ${userDay ? '& ' + userDay + ' day' : ''}`)

    }
}

//===============Age calc fun End================= 

calcBtn.addEventListener('click', function () {
    spinner.classList.replace('opacity-0', 'opacity-1');
    h2.classList.replace('d-block', 'd-none');
    setTimeout(() => {
        ageCalcFun();
    }, 2000)

})

