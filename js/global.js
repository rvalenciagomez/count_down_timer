var finalHours;
var finalMinutes;
var finalSeconds;
var finalDay;
// We will define a default date in format // MM/dd/yyyy
// add 3 days from now
var cntDownDate = addDays(new Date(), 3 );
// format to set default falue
document.getElementById('cntDownDate')
        .setAttribute("value", formatDate(cntDownDate));

// when count down date is submitted
function onSetCntDate() {

    var cntDownDate = document.getElementById('cntDownDate').value;
    cntDownDate = new Date(cntDownDate);
    // set cnt down date
    var finalDate = new Date(formatDate(cntDownDate) + ' 12:00:00');

    document.getElementById('date-expected').innerHTML = finalDate.toLocaleString();

    // set count down hour minutes and seconds to be compared agains current time
    finalHours = finalDate.getHours() === 0 || finalDate.getHours() === 12  ? 23 : finalDate.getHours();
    finalMinutes = finalDate.getMinutes() === 0  ? 59 : finalDate.getHours();
    finalSeconds = finalDate.getSeconds() === 0  ? 59 : finalDate.getSeconds();
    finalDay = finalDate.getDate();

    // if final date is less than current , so print just finalized
    if(finalDate.getDate() <= new Date().getDate()) {
        return document.querySelectorAll(".clock")[0].innerHTML
                    ='<div class="clock-time">Finalized</div>'
    } else {
        onCountDown(finalDate);
        // give interval of one second to run again the count down
        setInterval(onCountDown, 1000);
    }

    function onCountDown() {
        // get current time
        var time = new Date();

                    //  current time being compared agains final date
        var days = finalDay  - time.getDate() -1;
        var hours =  finalHours - time.getHours();
        var minutes = finalMinutes - time.getMinutes();
        var seconds = finalSeconds - time.getSeconds();
        
        // print the time on the clock
        document.querySelectorAll(".clock")[0].innerHTML
            ='<div class="clock-time">' + format(days) + '</div>'
            +'<div class="clock-time">' + format(hours) + '</div>'
            +'<div class="clock-time">' + format(minutes) + '</div>'
            +'<div class="clock-time">' + format(seconds); + '</div>'

        // format output per digital number if is less that 10, print a 0 before the number
        function format(input) {
            if(input < 10) {
                input = '0' + input;
            }
            return input;
        }
    }

}

// add needed days to date passed
function addDays(someDate, days) {
    return new Date(someDate.getTime() + (days -1)*24*60*60*1000 );
}

// format date to be used in the input of html page
function formatDate(someDate) {
    var stringDate = someDate.getFullYear() + '-' +  someDate.getMonth() + 1 + '-'+ (someDate.getDate() + 1);
    return stringDate;
}