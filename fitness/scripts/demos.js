const weatherIcon = document.getElementById("iconDiv");
const weatherText = document.getElementById("textDiv");
const forecastDiv = document.getElementById("forecast");

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-37.78&lon=175.25&units=metric&appid=2d13c0f2c18977e869ef1026588e58cb';
const url3d = 'https://api.openweathermap.org/data/2.5/forecast?lat=-37.78&lon=175.25&units=metric&appid=2d13c0f2c18977e869ef1026588e58cb';

async function weather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    };
};

async function forecast() {
    try {
        const response = await fetch(url3d);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    };
};


const displayWeather = (data) => {
    weatherIcon.innerHTML = "";
    weatherText.innerHTML = "";

    const icon = document.createElement("img");
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;
    const temp = document.createElement("p");
    const weatherStatus = document.createElement("p");
    const high = document.createElement("p");
    const low = document.createElement("p");
    const humidity = document.createElement("p");
    const sunrise = document.createElement("p");
    const sunset = document.createElement("p");


    icon.setAttribute("src", iconsrc);
    icon.setAttribute("alt", desc);

    temp.innerHTML = `${data.main.temp}&deg;C`;
    weatherStatus.innerHTML = `${data.weather[0].description.toUpperCase()}`;
    high.innerHTML = `High: ${data.main.temp_max}&deg;C`;
    low.innerHTML = `Low: ${data.main.temp_min}&deg;C`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    sunrise.innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
    sunset.innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;

    weatherIcon.appendChild(icon);
    weatherText.appendChild(temp);
    weatherText.appendChild(weatherStatus);
    weatherText.appendChild(high);
    weatherText.appendChild(low);
    weatherText.appendChild(humidity);
    weatherText.appendChild(sunrise);
    weatherText.appendChild(sunset);

    const today = document.createElement("p");
    today.innerHTML = `Today: <strong>${data.main.temp} &deg;C</strong>`
    forecastDiv.appendChild(today);
}

const displayForecast = (data) => {

    const tomorrow = document.createElement("p");
    const afterTomorrow = document.createElement("p");
    const threeDaysAfter = document.createElement("p");

    const tomorrowDate = new Date(data.list[5].dt * 1000);
    const afterTomorrowDate = new Date(data.list[15].dt * 1000);
    const threeDaysAfterDate = new Date(data.list[25].dt * 1000);

    tomorrow.innerHTML = `${tomorrowDate.toDateString()}: <strong>${data.list[3].main.temp}&deg;C</strong>`;
    afterTomorrow.innerHTML = `${afterTomorrowDate.toDateString()}: <strong>${data.list[11].main.temp}&deg;C</strong>`;
    threeDaysAfter.innerHTML = `${threeDaysAfterDate.toDateString()}: <strong>${data.list[19].main.temp}&deg;C</strong>`;

    forecastDiv.appendChild(tomorrow);
    forecastDiv.appendChild(afterTomorrow);
    forecastDiv.appendChild(threeDaysAfter);
}

weather();
forecast();

//create fitness cards 

const directoryJSON = "data/exercises.json";
const cards = document.querySelector("#cardscontainer");  // fixed this line

const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

// Function to display exercise information in modal
const displayExerciseInfo = (exercise) => {
    const exerciseModal = document.getElementById("exerciseModal");
    exerciseModal.innerHTML = ""; // clear previous

    const closeButton = document.createElement("button");
    closeButton.id = "closeModal";
    closeButton.textContent = "X";

    const title = document.createElement("h2");
    title.textContent = exercise.exercise;

    const subtitle = document.createElement("h4");
    subtitle.textContent = "Instructions:";

    const url = document.createElement("h3");
    url.innerHTML = `VIDEO: <a href="${exercise.website}" target="_blank">${exercise.website}</a>`;

    const instructionList = document.createElement("ul");

    let instructions = exercise.info || exercise.instruction || [];
    
    instructions.forEach(paragraph => {
        // Split into sentences using period + space or period + newline
        const sentences = paragraph.split(/(?<=\.)\s+/);
    
        sentences.forEach(sentence => {
            if (sentence.trim()) {
                const listItem = document.createElement("li");
                listItem.textContent = sentence.trim();
                instructionList.appendChild(listItem);
            }
        });
    });
    

    // Append everything to modal
    exerciseModal.appendChild(closeButton);
    exerciseModal.appendChild(title);
    exerciseModal.appendChild(subtitle);
    exerciseModal.appendChild(instructionList);
    exerciseModal.appendChild(url);

    // Show modal
    exerciseModal.showModal();

    closeButton.addEventListener("click", () => {
        exerciseModal.close();
    });
};

// Function to render cards
const displayExercises = (exercises) => {
    // Clear current content
    cards.innerHTML = "";

    exercises.forEach(exercise => {
        const card = document.createElement("section");
        card.classList.add("card");

        const exerciseImg = document.createElement("img");
        exerciseImg.setAttribute("src", `images/${exercise.image}`);
        exerciseImg.setAttribute("alt", exercise.exercise);
        exerciseImg.setAttribute("loading", "lazy");
        exerciseImg.setAttribute("width", "150");
        exerciseImg.setAttribute("height", "150");

        const exerciseName = document.createElement("h2");
        exerciseName.textContent = exercise.exercise;

        const exerciseButton = document.createElement("button");
        exerciseButton.textContent = "View Demo";
        exerciseButton.classList.add("exerciseButton");

        exerciseButton.addEventListener("click", () => {
            displayExerciseInfo(exercise);
        });

        card.appendChild(exerciseImg);
        card.appendChild(exerciseName);
        card.appendChild(exerciseButton);
        cards.appendChild(card);
    });
};

// Fetch and render
async function getExerciseData(directoryJSON) {
    const response = await fetch(directoryJSON);
    const data = await response.json();
    displayExercises(data.exercises);
}
getExerciseData(directoryJSON);

// View toggle
gridButton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listButton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});
