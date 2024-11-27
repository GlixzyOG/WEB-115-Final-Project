//
// Sloan Sanderson
// 11/27/2024
// Final Project JS
//

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const mealTypes = ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner"];

function populateMealInputs() {
    const mealDiv = document.getElementById('mealInputs');
    days.forEach(day => {
        const daySection = document.createElement('div');
        daySection.innerHTML = `<h3>${day}</h3>`;
        mealTypes.forEach(meal => {
            const mealId = `${day}-${meal.replace(/ /g, '_')}`;
            daySection.innerHTML += `<label>${meal}:</label><input type="text" id="${mealId}"><br>`;
        });
        mealDiv.appendChild(daySection);
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generateMealPlan() {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    let content = `
        <html>
        <head><title>Weekly Meal Plan</title></head>
        <body>
            <h1>Weekly Meal Plan for ${document.getElementById('name').value}</h1>
            <p>Goal: ${document.getElementById('goal').value}</p>
            <table border="1" style="width: 100%; text-align: left;">
                <tr><th>Day</th><th>Breakfast</th><th>Snack 1</th><th>Lunch</th><th>Snack 2</th><th>Dinner</th></tr>
    `;

    days.forEach(day => {
        content += `<tr><td>${day}</td>`;
        mealTypes.forEach(meal => {
            const mealId = `${day}-${meal.replace(/ /g, '_')}`;
            content += `<td>${document.getElementById(mealId).value || 'N/A'}</td>`;
        });
        content += `</tr>`;
    });

    content += `
            </table>
            <button onclick="window.print()">Print Plan</button>
        </body>
        </html>
    `;

    document.write(content);
}

function downloadMealPlan() {
    const mealData = [];
    days.forEach(day => {
        const dayMeals = { day };
        mealTypes.forEach(meal => {
            const mealId = `${day}-${meal.replace(/ /g, '_')}`;
            dayMeals[meal] = document.getElementById(mealId).value || 'N/A';
        });
        mealData.push(dayMeals);
    });

    const blob = new Blob([JSON.stringify(mealData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'MealPlan.json';
    link.click();
}

window.onload = populateMealInputs;
