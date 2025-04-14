document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reminderForm");
    const reminderList = document.getElementById("reminderList");
  
    // Ask for notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const workout = document.getElementById("workoutName").value;
      const time = document.getElementById("reminderTime").value;
      const date = document.getElementById("reminderDate").value;
      const notes = document.getElementById("reminderNotes").value;
  
      if (!workout || !time || !date || !notes) return;
  
      const now = new Date();
      const [hours, minutes] = time.split(":");
      const reminderTime = new Date(date);
      reminderTime.setHours(parseInt(hours));
      reminderTime.setMinutes(parseInt(minutes));
      reminderTime.setSeconds(0);
  
      const delay = reminderTime.getTime() - now.getTime();
  
      console.log("Reminder time:", reminderTime.toString());
      console.log("Now:", now.toString());
      console.log("Delay (ms):", delay);
  
      if (delay > 0) {
        // Show on-page list of scheduled reminders
        const li = document.createElement("li");
        li.textContent = `${workout} on ${date} at ${time} — Notes: ${notes}`;
        reminderList.appendChild(li);
  
        // Schedule the notification
        setTimeout(() => {
          console.log("⏰ Reminder triggered");
  
          // SYSTEM notification
          if (Notification.permission === "granted") {
            new Notification("💪 Time to Workout!", {
              body: `${workout}\nNotes: ${notes}`,
              icon: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
            });
          }
  
          // IN-PAGE notification
          const inPage = document.getElementById("inPageNotification");
          const inPageText = document.getElementById("inPageNotificationText");
  
          inPageText.textContent = `${workout} — ${notes}`;
          inPage.style.display = "block";
  
          setTimeout(() => {
            inPage.style.display = "none";
          }, 5000);
        }, delay);
  
        form.reset();
      } else {
        alert("Please select a future date and time for the reminder.");
      }
    });
  });
  