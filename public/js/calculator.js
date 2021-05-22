const NUM_ACTIVITY = 4;
const FLOAT_POINT = 3;

// Function for calculating cna returning mean grade with input values
function meanGrade() {
    // Bring all necessary input values 
    var myGradeElement = document.getElementsByName("my-grade");
    var baseGradeElement = document.getElementsByName("base-grade");

    var totalGrade = 0;

    var i;
    var count = 0;

    var j;
    var percent_arr = new Array(NUM_ACTIVITY);

    var error = false;

    // Calculate mean value and store values
    for (i = 0; i < myGradeElement.length; i++) {
        if ((!myGradeElement[i].value && baseGradeElement[i].value) ||
            (myGradeElement[i].value && !baseGradeElement[i].value)) {
            console.error("You need to insert both grades in each activities!");
            error = true;
            break;
        }

        if (myGradeElement[i].value && baseGradeElement[i].value) {
            let percent = (parseInt(myGradeElement[i].value)) / (parseInt(baseGradeElement[i].value));
            percent_arr[i] = percent;
            totalGrade += percent;
            count++;
        }
    }

    // Display error when user do not insert enough information for calculation
    if (error) {
        document.getElementById("result").innerHTML = "You need to insert both grades in each activities";
        return;
    }

    // Display 0 when user do not insert any values
    if (totalGrade === 0) {
        report_percentage(percent_arr, j);
        document.getElementById("result").innerHTML = "Mean: 0";
        return;
    }

    // Display the result
    report_percentage(percent_arr, j);
    document.getElementById("result").innerHTML = "Mean: " + (totalGrade / count).toFixed(FLOAT_POINT).toString();
}

// Function for calculating cna returning weighted grade with input values
function weightGrade() {
    // Bring all necessary input values 
    var myGradeElement = document.getElementsByName("my-grade");
    var baseGradeElement = document.getElementsByName("base-grade");
    var weightGradeElement = document.getElementsByName("weight");

    var weightedTotalGrade = 0;
    var weightTotal = 0;
    var i;

    var j;
    var percent_arr = new Array(NUM_ACTIVITY);

    var meanError = false;
    var weightError = false;

    // Calculate weighted value and store values
    for (i = 0; i < myGradeElement.length; i++) {
        if ((!myGradeElement[i].value && baseGradeElement[i].value) ||
            (myGradeElement[i].value && !baseGradeElement[i].value)) {
            console.error("You need to insert both grades in each activities!");
            meanError = true;
            break;
        }

        if (myGradeElement[i].value && baseGradeElement[i].value) {
            if (weightGradeElement[i].value) {
                let percent = (parseInt(myGradeElement[i].value)) / (parseInt(baseGradeElement[i].value));
                percent_arr[i] = percent;
                weightedTotalGrade += ((parseInt(myGradeElement[i].value)) / (parseInt(baseGradeElement[i].value)) * weightGradeElement[i].value);
                weightTotal += parseInt(weightGradeElement[i].value);
            } else {
                console.error("You need to insert weight value for calculation!");
                weightError = true;
                break;
            }
        }
    }

    // Display error when user do not insert enough grades for calculation
    if (meanError) {
        document.getElementById("result").innerHTML = "You need to insert both grades in each activities";
        return;
    }

    // Display error when user do not insert weight value for calculation
    if (weightError) {
        document.getElementById("result").innerHTML = "You need to insert weight value for calculation";
        return;
    }

    // Display 0 when user do not insert any values
    if (weightTotal === 0) {
        report_percentage(percent_arr, j);
        document.getElementById("result").innerHTML = "Weighted: 0";
        return;
    }

    // Display the result
    report_percentage(percent_arr, j);
    document.getElementById("result").innerHTML = "Weighted: " + (weightedTotalGrade / weightTotal).toFixed(FLOAT_POINT).toString();
}

// Helper function for displaying each percent of activity
function report_percentage(percent_arr, j) {
    for (j = 0; j < NUM_ACTIVITY; j++) {
        if (percent_arr[j]) {
            document.getElementById(j).innerHTML = percent_arr[j].toFixed(FLOAT_POINT) + "%";
        } else {
            document.getElementById(j).innerHTML = " ";
        }
    }
}