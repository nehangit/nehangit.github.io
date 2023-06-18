
function finalCalc() {
    const disp = document.getElementById("ret");
    const grade = parseFloat(document.getElementById("current").value);
    const minimum = parseFloat(document.getElementById("mingrade").value);
    const weight = parseFloat(document.getElementById("finweight").value);
    disp.innerHTML = "<br>";
    const inps = document.getElementsByClassName("inputs");
    for (let x of inps) {
        x.style.borderColor = 'darkgreen';
    }
    let valid = true;
    if (grade > 110 || grade < 0 || isNaN(grade)) {
        disp.innerHTML += 'Invalid current grade input.<br>';
        document.getElementById("current").style.borderColor = 'red';
        valid = false;
    }
    if (minimum > 110 || minimum < 0 || isNaN(minimum)) {
        disp.innerHTML += 'Invalid minimum grade input.<br>';
        document.getElementById("mingrade").style.borderColor = 'red';
        valid = false;
    }
    if (weight > 100 || weight < 0 || isNaN(weight)) {
        disp.innerHTML += 'Invalid weight input.<br>';
        document.getElementById("finweight").style.borderColor = 'red';
        valid = false;
    }
    if (valid == true) {
        const calculation = (minimum - (((100 - weight) / 100) * grade)) / (weight / 100);
        disp.innerHTML += 'You will need at least a ' + calculation.toFixed(3) + '% on your final!!';
        document.getElementById("frm").reset();
    }
}
