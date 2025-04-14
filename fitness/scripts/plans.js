// Function to suggest a workout based on weather condition
// Suggest workout based on weather
function getWeather(city) {
  const apiKey='2d13c0f2c18977e869ef1026588e58cb'; 
  const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=-37.78&lon=175.25&units=metric&appid=2d13c0f2c18977e869ef1026588e58cb';
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0].main.toLowerCase();
      document.getElementById('weather-condition').value = weather;
      suggestWorkoutBasedOnWeather(weather);
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      alert('Could not fetch weather. Try again.');
    });
}

function suggestWorkoutBasedOnWeather() {
    const weatherCondition = document.getElementById('weather-condition').value.toLowerCase();
    const suggestionElement = document.getElementById('weather-workout-suggestion');
    let suggestion = '';
  
    switch (weatherCondition) {
      case 'sunny':
        suggestion = '☀️ Great day for an outdoor run or nature based yoga!';
        break;
      case 'hot':
        suggestion = '☀️ It looks hot outside! Should we try for a swim or an indoor workout?';
        break;
      case 'rainy':
      case 'wet':
      case 'storm':
        suggestion = '🌧️ How about indoor workout today?...We could try a yoga, pilates or even a strength based training workout!';
        break;        
      case 'cold':
      case 'snow':
        suggestion = '❄️ Perfect time for a HIIT or strength based workout indoors. Let’s get those muscles fired up warm!';
        break;
      case 'cloudy':
        suggestion = '☁️ A good day for a brisk walk or a light jog. We can always opt for an indoor cardio or strength based workout if the weather looks uncertain.';
        break;
      default:
        suggestion = '⚠️ Please enter a valid weather condition (sunny, rainy, wet, storm, snow, hot, cloudy or cold).';
    }
  
    suggestionElement.textContent = suggestion;
  }
  
  // Search YouTube for workout videos
  function searchYouTubeWorkouts() {
    const query = document.getElementById('youtube-query').value;
    const resultsContainer = document.getElementById('youtube-results');
    resultsContainer.innerHTML = '';
  
    if (!query) {
      resultsContainer.textContent = '❗ Please enter a workout type to search.';
      return;
    }
  
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)} workout&maxResults=5&videoEmbeddable=true&key=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          data.items.forEach(item => {
            if (item.id && item.id.videoId) {
              const videoElement = document.createElement('div');
              videoElement.classList.add('video');
              videoElement.innerHTML = `
                <h3>${item.snippet.title}</h3>
                <p>${item.snippet.description}</p>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">Watch Video</a>
              `;
              resultsContainer.appendChild(videoElement);
            }
          });
        } else {
          resultsContainer.textContent = 'No videos found.';
        }
      })
      .catch(error => {
        resultsContainer.textContent = '⚠️ Error fetching videos.';
        console.error('YouTube API error:', error);
      });
  }  
  
  // Add workout to planner
  function addWorkoutToPlanner(event) {
    event.preventDefault();
  
    const workoutType = document.getElementById('workout-type').value;
    const workoutDuration = document.getElementById('workout-duration').value;
    const workoutLink = document.getElementById('workout-link').value;
    const workoutDate = document.getElementById('workout-date').value;
  
    if (!workoutType || !workoutDuration || !workoutLink || !workoutDate) {
      alert('Please fill in all fields.');
      return;
    }
  
    const plannerList = document.getElementById('planner-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${workoutType}</strong> on ${workoutDate} for ${workoutDuration} minutes.
      <br>
      <a href="${workoutLink}" target="_blank">Workout Video</a>
    `;
    plannerList.appendChild(listItem);
  
    document.getElementById('planner-form').reset();
  }
  
  // Mock workout plan data
  function getUserWorkoutPlan() {
    return [
      { type: 'Running', duration: 30, date: '2025-04-14', link: 'https://www.youtube.com/watch?v=example1' },
      { type: 'Yoga', duration: 45, date: '2025-04-15', link: 'https://www.youtube.com/watch?v=example2' }
    ];
  }
  
  // Load workouts into planner on page load
  function initializePlanner() {
    const plannerList = document.getElementById('planner-list');
    const workouts = getUserWorkoutPlan();
  
    workouts.forEach(workout => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${workout.type}</strong> on ${workout.date} for ${workout.duration} minutes.
        <br>
        <a href="${workout.link}" target="_blank">Workout Video</a>
      `;
      plannerList.appendChild(listItem);
    });
  }
  
  // Hook up form on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('planner-form').addEventListener('submit', addWorkoutToPlanner);
    initializePlanner();
  });
  