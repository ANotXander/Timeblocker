
//debug
let schedule = `Sun 1/26 12:00PM to 9:45PM (2 Shifts) 

 894 NowhereVille Av Unit 3421, Somewhere, NY

Mon 1/27 2:30PM to 10:15PM

894 NowhereVille Av Unit 3421, Somewhere, NY

Tue 1/28 3:00PM to 10:15PM

894 NowhereVille Av Unit 3421, Somewhere, NY

Thu 2/6 12:00PM to 10:00PM (2 Shifts)

894 NowhereVille Av Unit 3421, Somewhere, NY

Fri 2/7 5:00PM to 10:30PM

894 NowhereVille Av Unit 3421, Somewhere, NY

Sat 2/8 3:00PM to 10:30PM
fdgdfg
894 NowhereVille Av Unit 3421, Somewhere, NY

Sun 2/9 12:00PM to 9:45PM (2 Shifts)

894 NowhereVille Av Unit 3421, Somewhere, NY

Mon 2/10 2:30PM to 10:00PM

894 NowhereVille Av Unit 3421, Somewhere, NY`

//**
// ASSUMPTIONS TO MAKE: 
// Times are either 3 or 4 digits long
// Times and dates are also probably formatted

// If it matches atleast 3 letters with a weekday and nothing's connected to it,
// It's probably a weekday

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

var dates = [[]]
var times = [[]]
var typeOfValue = null; 

var is24H = false; //assume false, unless proven true
var isEU = false; //ditto
var formal = false; //assumes DA/TE (with and without a / or -) TI:ME, I'm not sure how to have it check 

var memory = "yeah"



let checkValidDate = function(input){
    var cDate = input.split(RegExp("/- ")); //Writing it as /\/- / makes it look like a nightmare
    if (isNaN(cDate[1]) == true || isNaN(cDate[2])){return false;}
    if ((cDate[1] > 30 && cDate[2] > 12) || (cDate[1] > 12 && cDate[1] > 30)){return false;} //TODO: check for even and odds dates and also februrary
    return true;
}

let checkValidTime = function(input){
    var cTime = input.split(":");
    cTime[2] = cTime[2].substring(0,1); //Making sure it doesn't accidentially catch the AM/PM
    if (isNaN(cTime[1]) == true || isNaN(cTime[2])){return false;}
    if ((is24H == true && cTime[1] > 24) || cTime[1] > 12 || cTime[2] > 0){return false;}
    return true;
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
                        if (checkValidDate(i)){

                        } else {

                        }
                    } else typeOfValue = "date"
                }
                memory += i;

            break;
            case true:
                switch (i.toLocaleLowerCase){ //having this be the variable is a bad idea
                    case "m":
                        if (memory.slice(-1).toLocaleLowerCase == "a"){
                            times[times.length+1][0] = memory;
                        } else if (memory.slice(-1).toLocaleLowerCase == "p") {        // We can have an elseif in this function, as a treat
                            times[times.length][1] = memory;                    // It's cleaner than doing two seperate if checks for if it's AM or PM
                        };
                    break;
                    case "p" || "a":
                        if (typeOf === "time") {
                            memory += i;
                            break;
                        }
                    case "-" || "/":
                        typeOfValue = "date";
                        memory += i;
                    break;                        
                    default:
                        if (i === ":"){ //java isnt recognizing this character for some reason ????
                            typeOfValue = "time";
                            memory += i;
                        };

                        memory = "";
                        console.log(i, "Clearing.");
                    break;
                }

            default:
            break;
        }
        console.log(memory);

        //Search for integers.
        //Add it onto an array.
        //Make a new entry to the array once it reaches the seperator.
        //Somehow use this information it gathers to determine when things are scheduled.
    }   
}

processStringToData(schedule,"")

console.log(memory)