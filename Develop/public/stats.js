window.onload=getSetData();



function getSetData(){
  setData();
  getData();
}



function setData(){
  fetch("/workouts", {
    method: 'GET'
    
  })
  .then(res => res.json())
  .then(res => {
    let myArr = []
    console.log('res ====>', res)
     res.forEach(single => {
       let parsedDuration = parseInt(single.duration)
      myArr.push(parsedDuration)
     })
     let slicedArr =  myArr.slice(0, 7)
     let summedVal = slicedArr.reduce((a,b) => {
       return a + b
     }, 0)

     console.log("sumDuration ====>", summedVal)
     localStorage.setItem("sumDuration", summedVal)

     let myArr2 = []
    console.log('res2 ====>', res)
     res.forEach(single => {
       let parsedWeight = parseInt(single.weight)
      myArr2.push(parsedWeight)
     })
     let slicedArr2 =  myArr2.slice(0, 7)
     let summedVal2 = slicedArr.reduce((a,b) => {
       return a + b
     }, 0)

     console.log("sumWeight ====>", summedVal2)
     localStorage.setItem("sumWeight", summedVal2)
  })
  .catch(err => console.log(err))
 
}
//let array1 = ['a', 'b', 'c', 'd'];
// console.log(array1[array1.length-1])

function getData(){
  console.log(JSON.parse(localStorage.getItem('res')))
  let workouts = JSON.parse(localStorage.getItem('res'))
  console.log('workouts.length log',workouts.length)
  const sumWeight = localStorage.getItem("sumWeight")
  const sumDuration = localStorage.getItem("sumDuration")
  
   document.querySelector(".durationOutput").textContent = sumDuration;
   
   //let weight7 = parseInt(workouts[workouts.length-1].weight) + parseInt(workouts[workouts.length-2].weight) + parseInt(workouts[workouts.length-3].weight) + parseInt(workouts[workouts.length-4].weight) + parseInt(workouts[workouts.length-5].weight) + parseInt(workouts[workouts.length-6].weight) + parseInt(workouts[workouts.length-7].weight)
   //console.log(weight7);
   document.querySelector(".weightOutput").textContent = sumWeight;
}

/* function calculateDuration7(){
   let workouts = JSON.parse(localStorage.getItem('res'))
   let duration7 = workouts[0].duration + workouts[1].duration + workouts[2].duration + workouts[3].duration + workouts[4].duration + workouts[5].duration + workouts[6].duration
   console.log(duration7);
  //document.querySelector(".durationOutput").textContent = 10;
   document.querySelector(".durationOutput").textContent = duration7;
} */

function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}

function populateChart(data) {
  let durations = data.map(({ totalDuration }) => totalDuration);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const labels = data.map(({ day }) => {
    const date = new Date(day);
    return daysOfWeek[date.getDay()];
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Exercises Performed',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: pounds,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Exercises Performed',
      },
    },
  });
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      } else {
        return total;
      }
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  // return de-duplicated array with JavaScript `Set` object
  return [...new Set(workouts)];
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);