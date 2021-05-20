function meanGrade() {
    var myGradeElement = document.getElementsByName("my-grade");
    var baseGradeElement = document.getElementsByName("base-grade");

    var totalGrade = 0;

    var i;
    var count = 0;

    var error = false;
    for (i = 0; i < myGradeElement.length; i++) {
        if ((!myGradeElement[i].value && baseGradeElement[i].value) ||
            (myGradeElement[i].value && !baseGradeElement[i].value)) {
            console.error("You need to insert both grades in each activities!");
            error = true;
            break;
        }

        if (myGradeElement[i].value && baseGradeElement[i].value) {
            let percent = ((parseInt(myGradeElement[i].value)) / (parseInt(baseGradeElement[i].value))).toFixed(2);
            document.getElementById(i).innerHTML = percent + "%";
            totalGrade += percent;
            count++;
        }
    }

    if (!error) {
        if (totalGrade === 0) {
            document.getElementById("result").innerHTML = "Mean: 0";
            return;
        }
        document.getElementById("result").innerHTML = "Mean: " + (totalGrade / count).toFixed(2).toString();
    } else {
        document.getElementById("result").innerHTML = "You need to insert both grades in each activities";
    }
}

function weightGrade() {
    var myGradeElement = document.getElementsByName("my-grade");
    var baseGradeElement = document.getElementsByName("base-grade");
    var weightGradeElement = document.getElementsByName("weight");

    var weightedTotalGrade = 0;
    var weightTotal = 0;
    var i;

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
                let percent = ((parseInt(myGradeElement[i].value)) / (parseInt(baseGradeElement[i].value))).toFixed(2);
                document.getElementById(i).innerHTML = percent + "%";
                weightedTotalGrade += ((parseInt(myGradeElement[i].value)) / (parseInt(baseGradeElement[i].value)) * weightGradeElement[i].value).toFixed(2);
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
        document.getElementById("result").innerHTML = "Weighted: 0";
        return;
    }
    document.getElementById("result").innerHTML = "Weighted: " + (weightedTotalGrade / weightTotal).toFixed(2).toString();
}