const NUM_ACTIVITY = 4;
const FLOAT_POINT = 3;

function meanGrade() {
    var myGradeElement = document.getElementsByName("my-grade");
    var baseGradeElement = document.getElementsByName("base-grade");

    var totalGrade = 0;

    var i;
    var count = 0;

    var j;
    var percent_arr = new Array(NUM_ACTIVITY);

    var error = false;
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

    if (error) {
        document.getElementById("result").innerHTML = "You need to insert both grades in each activities";
        return;
    }

    if (totalGrade === 0) {

        report_percentage(percent_arr, j);
        document.getElementById("result").innerHTML = "Mean: 0";
        return;
    }

    report_percentage(percent_arr, j);
    document.getElementById("result").innerHTML = "Mean: " + (totalGrade / count).toFixed(FLOAT_POINT).toString();
}

function weightGrade() {
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
                // document.getElementById(i).innerHTML = percent + "%";
                weightedTotalGrade += ((parseInt(myGradeElement[i].value)) / (parseInt(baseGradeElement[i].value)) * weightGradeElement[i].value);
                weightTotal += parseInt(weightGradeElement[i].value);
            } else {
                console.error("You need to insert weight value for calculation!");
                weightError = true;
                break;
            }
        }
    }

    if (meanError) {
        document.getElementById("result").innerHTML = "You need to insert both grades in each activities";
        return;
    }

    if (weightError) {
        document.getElementById("result").innerHTML = "You need to insert weight value for calculation";
        return;
    }

    if (weightTotal === 0) {

        report_percentage(percent_arr, j);
        document.getElementById("result").innerHTML = "Weighted: 0";
        return;
    }

    report_percentage(percent_arr, j);
    document.getElementById("result").innerHTML = "Weighted: " + (weightedTotalGrade / weightTotal).toFixed(FLOAT_POINT).toString();
}

function report_percentage(percent_arr, j) {
    for (j = 0; j < NUM_ACTIVITY; j++) {
        if (percent_arr[j]) {
            document.getElementById(j).innerHTML = percent_arr[j].toFixed(FLOAT_POINT) + "%";
        } else {
            document.getElementById(j).innerHTML = " ";
        }
    }
}