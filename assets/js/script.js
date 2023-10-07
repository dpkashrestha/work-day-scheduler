// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  var timeBlocks = $(".time-block");

  for (var i = 0; i < timeBlocks.length; i++) {
    var saveBtnEl = $(timeBlocks[i]).find(".saveBtn");

    saveBtnEl.on("click", function () {
      var timeBlock = $(this).parent();

      var timeBlockId = $(timeBlock).attr("id");
      var textAreaValue = $(timeBlock).find("textarea").val();

      localStorage.setItem(timeBlockId, textAreaValue);
      showNotification();
      
    });
  }

  var secondsLeft = 3;
  var saveNotificationEL = $("#save-notification");

  function showNotification() {
    // Sets interval to show saved Notification for 3 seconds only.
    var timerInterval = setInterval(function () {
      secondsLeft--;
      saveNotificationEL.text("Appointment Added to localStorage.");

      if (secondsLeft === 0) {
        clearInterval(timerInterval);
        saveNotificationEL.text("");
        secondsLeft = 3;
      }
    }, 1000);
  }

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Set initial time block colors on page load based on the current time.
  function initializeTimeBlockColor() {
    var timeBlocks = document.querySelectorAll(".time-block");

    const currentDate = dayjs();

    for (var i = 0; i < timeBlocks.length; i++) {
      var timeBlockEl = timeBlocks[i];

      var timeBlockId = timeBlockEl.id;
      const parts = timeBlockId.split("-");
      var hourNumber = parseInt(parts[1]);

      // Get the current hour (0-23)
      const currentHour = currentDate.hour();

      if (hourNumber > currentHour) {
        $(timeBlockEl).addClass("future");
      } else if (hourNumber < currentHour) {
        $(timeBlockEl).addClass("past");
      } else if (hourNumber == currentHour) {
        $(timeBlockEl).addClass("present");
      }
    }
  }

  initializeTimeBlockColor();

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  for (var i = 0; i < timeBlocks.length; i++) {
    var timeBlockEl = timeBlocks[i];

    var textAreaValue = localStorage.getItem(timeBlockEl.id);

    var textAreaEl = $(timeBlockEl).children(".description");
    textAreaEl.val(textAreaValue);
  }

  // TODO: Add code to display the current date in the header of the page.

  dayjs.extend(dayjs_plugin_advancedFormat);

  var lead = dayjs().format("dddd, MMMM Do, YYYY");
  $("#currentDay").text(lead);
});
