
var calorieTarget = 0;

document.getElementById("calculate").addEventListener("click", calculateBMI);

document.getElementById("generate").addEventListener("click", generateMealPlan);


// Calculate BMI and calorie target
function calculateBMI() {

    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    var age = parseInt(document.getElementById("age").value);
    var gender = document.getElementById("gender").value;

    if (!(weight > 0 && height > 0 && age > 0)) {

        alert("Please enter a valid weight, height, and age.");
        return;
    }

    var bmi = weight / ((height / 100) * (height / 100));

    var basicCalories;

    if (gender == "Men") {
        basicCalories = (weight * 10) + (height * 6.25) - (age * 5) + 5;
    }
    else if (gender == "Women") {
        basicCalories = (weight * 10) + (height * 6.25) - (age * 5) - 161;
    }

    var category;

    if (bmi >= 30) {
        calorieTarget = basicCalories - 750;
        category = "Obese";
    }
    else if (bmi >= 25) {
        calorieTarget = basicCalories - 500;
        category = "Overweight";
    }
    else {
        calorieTarget = basicCalories;
        category = "Normal/Underweight";
    }

    document.getElementById("bmiResult").textContent =
        "Your BMI is: " + bmi.toFixed(2);

    document.getElementById("calorieResult").textContent =
        "Your Calorie Target is: " + calorieTarget.toFixed(0) + " calories";

    document.getElementById("categoryResult").textContent =
        "BMI Category: " + category;


    // Change the image based on gender
    if (gender == "Men") {
        document.getElementById("personImage").src = "img/drake-suit.jpg";
    }
    else if (gender == "Women") {
        document.getElementById("personImage").src = "img/beyonce.png";
    }


    // Change the image width based on BMI
    var imageWidth;

    if (bmi < 18.5) {
        imageWidth = 100;
    }
    else if (bmi < 25) {
        imageWidth = 120;
    }
    else if (bmi < 30) {
        imageWidth = 145;
    }
    else {
        imageWidth = 170;
    }

    document.getElementById("personImage").style.width =
        imageWidth + "px";

    document.getElementById("personImage").style.height = "auto";


    // Enable the meal plan button
    document.getElementById("generate").disabled = false;

    // Clear the previous meal plan
    document.getElementById("mealList").innerHTML = "";
    document.getElementById("mealTotal").textContent = "";

}


// Generate a random whole number
function randInt(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}


// Generate a random meal plan
function generateMealPlan() {

    var mealList = document.getElementById("mealList");

    mealList.innerHTML = "";

    var totalCalories = 0;

    // Keep track of foods that have already been selected
    var selectedFoods = [];

    for (var i in foodDatabase) {
        selectedFoods.push(false);
    }

    // Continue selecting foods while there is room
    while (true) {

        var availableFoods = [];

        // Find foods that fit the remaining calories
        for (var i in foodDatabase) {

            if (selectedFoods[i] == false &&
                foodDatabase[i].cal <= calorieTarget - totalCalories) {

                availableFoods.push(i);
            }
        }

        // Stop if no more foods fit
        if (availableFoods.length == 0) {
            break;
        }

        // Randomly choose one available food
        var randomChoice = randInt(0, availableFoods.length - 1);

        var chosenIndex = availableFoods[randomChoice];

        // Mark food as selected
        selectedFoods[chosenIndex] = true;

        // Add calories to the total
        totalCalories = totalCalories + foodDatabase[chosenIndex].cal;

        // Add food to the meal list
        var newItem = document.createElement("li");

        var foodText = document.createTextNode(
            foodDatabase[chosenIndex].name + " - " +
            foodDatabase[chosenIndex].cal + " calories"
        );

        newItem.appendChild(foodText);
        mealList.appendChild(newItem);
    }

    // Display total calories
    document.getElementById("mealTotal").textContent =
        "Total Meal Plan Calories: " + totalCalories + " calories";

}
