
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


function searchz() {
    const disp2 = document.getElementById("ret2")
    const list2 = document.getElementById("listz")
    const inps2 = document.getElementsByClassName("inputs2")
    var actcomp = parseInt(document.getElementById("actcomp").value)
    var satrw = parseInt(document.getElementById("satrw").value)
    var satm = parseInt(document.getElementById("satm").value)
    const forlang = document.getElementsByName("years").values
    disp2.innerHTML = ""
    for (let y of inps2) {
        y.style.borderColor = 'darkgreen';
    }
    let valid2 = true;
    
    if (actcomp > 36 || actcomp < 1) {
        disp2.innerHTML += 'Invalid ACT Composite score.<br>';
        document.getElementById("actcomp").style.borderColor = 'red';
        valid2 = false;
    }
    if (satrw > 800 || satrw < 200) {
        disp2.innerHTML += 'Invalid SAT Reading/Writing score.<br>';
        document.getElementById("satrw").style.borderColor = 'red';
        valid2 = false;
    }
    if (satm > 800 || satm < 200) {
        disp2.innerHTML += 'Invalid SAT Math score.<br>';
        document.getElementById("satm").style.borderColor = 'red';
        valid2 = false;
    }
    if(!(valid2)){
        return
    }

    var getdata = fetch("./assets/data/collegeadmissions.json").then((res)=>{return res.json()}).then((coldata)=>{
        if(isNaN(satm)){satm = 100000;}
        if(isNaN(satrw)){satrw = 100000;}
        if(isNaN(actcomp)){actcomp = 100000;}
        var counter = 30;
        for(var i in coldata){
            var school = coldata[i]
            if(actcomp >= parseInt(school.actcomp) && satrw >= parseInt(school.satrw) && satm >= parseInt(school.satm)){
                var par = document.createElement("p");
                var node = document.createTextNode(school.name);
                var n = parseInt(counter/30)
                par.appendChild(node);
                par.style.gridArea = (parseInt(counter % 30)+1) +" / " + n + " / span 1 / span 1";
                par.style.fontSize = "8px"
                par.style.height = "40px"
                par.style.width = "80px"
                par.style.float = "left"
                par.style.borderStyle = "none"
                par.style.margin = "0px"
                //par.style.height = "30px"; */
                console.log(par)
                disp2.appendChild(par);
                //if(counter==50){
                //    break
                //}
                counter++;
            }
        }
    })
    // check test scores for NaN later and dont use NaN
    document.getElementById("searcher").reset()
    
}