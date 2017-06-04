function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function generateUniqueRandomFromInteger(n,lowerBound,upperBound)
{
    var arr = []
    while(arr.length < n){
        var randomnumber = Math.ceil(Math.random()*(upperBound-lowerBound)+lowerBound)
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    return arr;
}

function returnNLargest(array, n) {
    newarray = array.sort(function (a, b) {
        return b.fitness - a.fitness;
    });

    result = new Array();

    for (br = 0; br < n; br++) {
        result.push(array[br])
    }

    return result;
}


function fitnessSum(array)
{
    let sum = 0;
    array.map((individual)=>{
        sum+=individual.fitness;
    })
    return sum;
}

function fitnessSumToIndex(array, index)
{
    let sum = 0;
    array.map((individual,ind)=>{
        if(ind<=index)
        {
            sum+=individual.fitness;
        }
    });

    return sum;
}

function gray2Dec(num) {
    var ret = '';
    var gray = (num ^ (num >> 1)).toString(2);
    while (gray.length < 8) {
        gray = "0" + gray;
    }
    ret += gray;
    return ret;
}

function dec2Gray(input) {
    var ret = '';
        var num = parseInt(input, 2);
        for (var mask = num >> 1; mask != 0; mask = mask >> 1) {
            num = num ^ mask;
        }
        ret += num.toString();
        return ret;
}

//probability must be between 0 i 1
function mutateGrayCodeWithProbability(grayCode, probabilityToMutate)
{
    let result = '';
    for(let i=0; i<grayCode.length; i++)
    {
        let shouldWeMutate = Math.random() <= probabilityToMutate;
        if(shouldWeMutate){
            if(grayCode[i]=="1") result+="0";
            else result+="1";
        }
        else{
            result += grayCode[i];
        }
    }
    return result;
}


function actualMutation(number, probability, lowerLimit, upperLimit){
    let newGray = null;
    do{
        gray = gray2Dec(number);
        newGray = mutateGrayCodeWithProbability(gray, probability);
        dec = dec2Gray(newGray);
    }
    while(!(dec>lowerLimit && dec<upperLimit))
    return Number(dec);
}

function updateResults(){
    $( "#results" ).empty();
    
    if(matingPool!=null)
    {
        $("#results").append("<b>Pool: </b>");
        matingPool.map((individual)=>{
            $( "#results" ).append( "<span>"+individual.fitness+"</span>&nbsp" );
        })
    }
    else
    {
        $("#results").append("<b>Prethodno: </b>");
        population.map((individual)=>{
            $( "#results" ).append( "<span>"+individual.fitness+"</span>&nbsp" );
        })
    }
    
}