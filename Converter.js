
//debug, make this an input somehow
let schedule = `Sun 1/26 12:00PM to 9:45PM

 894 NowhereVille Av Unit 3421, Somewhere, NY

Mon 1/27 2:30PM to 10:15PM

894 NowhereVille Av Unit 3421, Somewhere, NY

Tue 1/28 3:00PM to 10:15PM

894 NowhereVille Av Unit 3421, Somewhere, NY

Thu 2/6 12:00PM to 10:00PM

894 NowhereVille Av Unit 3421, Somewhere, NY

Fri 2/7 5:00PM to 10:30PM

894 NowhereVille Av Unit 3421, Somewhere, NY

Sat 2/8 3:00PM to 10:30PM

894 NowhereVille Av Unit 3421, Somewhere, NY

Sun 2/9 12:00PM to 9:45PM

894 NowhereVille Av Unit 3421, Somewhere, NY

Mon 2/10 2:30PM to 10:00PM

894 NowhereVille Av Unit 3421, Somewhere, NY`

//**
// ASSUMPTIONS TO MAKE: 
// Times are either 3 or 4 digits long
// Times and dates are also probably formatted

// The schedule is probably being used for this year. 

// You know it's probably unlikely that they'll also switch from casual dating to formal dating.

// Also, use continuity to determine if its MM/DD or DD/MM */
 
const months = [
    "Janurary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

var dates = []
var times = []
var typeOfValue = null; 

var is24H = false; //assume false, unless proven true
var isEU = false; //ditto
var formal = false; //assumes DA/TE (with and without a / or -) TI:ME, I'm not sure how to have it check for (June 4th, from 12PM to 8PM) without rewriting the function

var memory = ""

let checkValid = new class {
    date(input){
        input = input.replace("-","/")
        var cDate = input.split("/");
        if (isNaN(cDate[0]) == true || isNaN(cDate[1])){return false;}
    
        if ((cDate[0] > 30 && cDate[1] > 12) || (cDate[0] > 12 && cDate[1] > 30)){return false;} //TODO: check for even and odds dates and also februrary
        return true;
    }
    time(input){
        var cTime = input.split(":");

        if (cTime.length != 2) {return false;}
        cTime[1] = cTime[1].substring(0,1); //Making sure it doesn't accidentially catch the AM/PM
        if (isNaN(cTime[0]) == true || isNaN(cTime[1])){return false;}
        if ((is24H == true && cTime[0] > 24) || cTime[0] > 12 && cTime[1] > 0){return false;}
        
        return true;
    }
    letter(input){ //makes it less of a headache for the switch to actually pick up characters
        if(/[a-zA-Z]/.test(input)){
            return input;
        } else {
            return null;
        }
    }
}

let processStringToData = function(input,seperator) {
    var search = input.split(seperator)
    for (const i of search) { 
        switch (isNaN(i)) { //Evil typechecking to see if it's a number
            case false:
                if (i == "\n"){
                    memory = "";
                    continue;
                }
                if (i == " "){
                    if (typeOfValue = "date"){
                        if (checkValid.date(memory)){
                            dates[dates.length] = memory
                        }
                        memory = "";
                    } else typeOfValue = "date";
                } else { 
                    memory += i; 
                }
            break;

            case true:    
                switch (i){ 
                    case checkValid.letter(i):
                        var capital = i.toLocaleUpperCase()
                        switch(capital){
                            case "M":
                                memory += capital;
                                if (!checkValid.time(memory)){
                                    memory = "";
                                } else {
                                    times[times.length] = memory;   // odd times are clock in, even times are clock out   
                                    memory = "";
                                }                             
                            break;

                            case "A":
                            case "P":
                                if (typeOfValue === "time") {
                                memory += capital.toLocaleUpperCase();
                                break;
                            }
                        // could add cases for "st" and "th" here to toggle the formal flag
                        }
                    break;
                    case "-":
                    case "/":
                        typeOfValue = "date";
                        memory += i;
                    break;
                    case ":":
                        typeOfValue = "time";
                        memory += i;
                    break;   
                    default:
                        memory = "";
                    break;
                }
            default:
            break;
        }

        
    }   
    console.log(times);
    console.log(dates);
    //Somehow use this information it gathers to determine when things are scheduled.
}
processStringToData(schedule,"")
