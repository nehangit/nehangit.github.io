/*
TODO:
- Written pretty poorly because of the fetch promise handling (which I'd use if there was an actual API) and I didn't know JS well at the time.. 
   ~ Need to change to just import the data from json files
- Rewrite The G tool with React. Other pages are ok without React, but could be cleaner once transitioned.
- Once transitioned to React can add cooler stuff.. games, animations etc.
*/

function finalCalc() {
    const disp = document.getElementById("ret");
    const grade = parseFloat(document.getElementById("current").value);
    const minimum = parseFloat(document.getElementById("mingrade").value);
    const weight = parseFloat(document.getElementById("finweight").value);
    disp.innerHTML = "";
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

function count(){
    var entry = document.getElementById("inp").value
    const numret = document.getElementById("numwords")
    var wrds = entry.split(' ')
    let wc = 0
    console.log(wrds)
    for(let wrd of wrds){
        if(!(wrd == '' || wrd.substring(0, 1) == "\n")){
            wc++
        }
    }
    numret.innerHTML = "Character count: " + entry.length + "<br>Word Count: " + wc
}

function searchz() {       // to do: fix college name inconsistencies between json data files
    const disp2 = document.getElementById("ret2")
    const list2 = document.getElementById("listz")
    const inps2 = document.getElementsByClassName("inputs2")
    var actcomp = parseInt(document.getElementById("actcomp").value)
    var satrw = parseInt(document.getElementById("satrw").value)
    var satm = parseInt(document.getElementById("satm").value)
    const forlang = document.getElementsByName("years").values
    disp2.innerHTML = ""

    function printRes(result){
        const numrows = 33;
        var counter = numrows;
        for(let s of result){
            //console.log(s)
            var par = document.createElement("p");
            var node = document.createTextNode(s);
            var n = parseInt(counter/numrows)
            par.appendChild(node);
            par.style.gridArea = (parseInt(counter % numrows)+1) +" / " + n + " / span 1 / span 1";
            par.style.fontSize = "10px"
            par.style.height = "40px"
            par.style.width = "110px"
            par.style.float = "left"
            par.style.borderStyle = "none"
            par.style.margin = "0px"
            par.style.fontFamily = "Times New Roman"
            //par.style.height = "30px";
            disp2.appendChild(par);
            counter++;
        }
    }

    function searchInt(inter, rarr){ // make other searches like this one
        fetch("./assets/data/interviews.json").then(res => res.json()).then((idat)=>{
            newarr = []
            for(var i in idat){
                if(inter){
                    if(idat[i].admitofficer == "Yes" || idat[i].alum == "Yes"){
                    if(rarr.includes(idat[i].name)){newarr.push(idat[i].name)}
                    }
                }
                else{
                    newarr = rarr
                    break
                }
            }
            printRes(newarr)
        })
    }

    function searchDemInt(dint, rarr){
        fetch("./assets/data/demint.json").then(res => res.json()).then((dindat)=>{
        newarr = []
        for(var i in dindat){
            if(dindat[i].interest == dint || dint == ""){
                if(rarr.includes(dindat[i].name)){newarr.push(dindat[i].name)}
            }
        }
        return newarr
        }).then(dinarr => searchInt(inter, dinarr))
    }

    function searchTOpt(val, ssuper, asuper, sc, rarr){
        fetch("./assets/data/testingpolicy.json").then(res => res.json()).then((toptdat)=>{
        newarr = []
        for(var i in toptdat){
            if(toptdat[i].testopt == val || val == "" || toptdat[i].testopt == ""){
                if(toptdat[i].satsuper == ssuper || ssuper == "No" || toptdat[i].satsuper == ""){
                    if(toptdat[i].actsuper == asuper || asuper == "No" || toptdat[i].actsuper == ""){
                        if(toptdat[i].scorechoice == sc || sc == "No" || toptdat[i].scorechoice == ""){
                            if(rarr.includes(toptdat[i].name)){newarr.push(toptdat[i].name)}
                        }
                    }
                }
            }
        }
        return newarr   
        }).then(nex => searchDemInt(demin, nex))
    }

    function searchForLang(val, rarr){
        fetch("./assets/data/flreqs.json").then(res => res.json()).then((fldata)=>{
        newarr = []
        for(var i in fldata){
            if(parseInt(fldata[i].numreq) == val || val == -1 || fldata[i].numreq == ""){
                if(rarr.includes(fldata[i].name)){newarr.push(fldata[i].name)}
            }
        }
        return newarr
        }).then((flarr)=>{
            searchTOpt(testopt, sups, supa, sc, flarr)
        })
    }
    
    for (let y of inps2){y.style.borderColor = 'darkgreen';}
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
    if(!(valid2)){return}
    
    var numflyears = -1
    if(document.getElementById("oney").checked){numflyears = 1}
    else if(document.getElementById("twoy").checked){numflyears = 2}
    else if(document.getElementById("threey").checked){numflyears = 3}
    else if(document.getElementById("foury").checked){numflyears = 4}
    var testopt = ""
    if(document.getElementById("opt").checked){testopt = "Yes"}
    else if(document.getElementById("notopt").checked){testopt = "No"}
    else if(document.getElementById("tblind").checked){testopt = "Test Blind"}
    var sups = "No"
    if(document.getElementById("supsat").checked){sups = "Yes"}
    var supa = "No"
    if(document.getElementById("supact").checked){supa = "Yes"}
    var sc = "No"
    if(document.getElementById("scorechoice").checked){sc = "Yes"}    
    var demin = ""
    if(document.getElementById("demint").checked){demin = "Considered"}
    var inter = false
    if(document.getElementById("interv").checked){inter = true}

    fetch("./assets/data/collegeadmissions.json").then(res => res.json()).then((coldata)=>{
        if(isNaN(satm)){satm = 100000;}
        if(isNaN(satrw)){satrw = 100000;}
        if(isNaN(actcomp)){actcomp = 100000;}
        var retschools = [];
        for(var i in coldata){
            var school = coldata[i]
            if(actcomp >= parseInt(school.actcomp) && satrw >= parseInt(school.satrw) && satm >= parseInt(school.satm)){
                retschools.push(school.name)
            }
        }
        return retschools
    }).then((colschools) =>{
        searchForLang(numflyears, colschools)
    })

    document.getElementById("searcher").reset()   
}