const form = document.getElementById('trackerForm');
const tableBody = document.querySelector('#progressTable tbody');

// Load saved entries from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('progressEntries')) || [];
  saved.forEach(entry => addEntryToTable(entry));
});

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const entry = {
    date: document.getElementById('date').value,
    exercise: document.getElementById('exercise').value,
    sets: document.getElementById('sets').value,
    reps: document.getElementById('reps').value,
    notes: document.getElementById('notes').value
  };

  addEntryToTable(entry);
  saveEntry(entry);
  form.reset();
});

// Add row to table
function addEntryToTable(entry) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${entry.date}</td>
    <td>${entry.exercise}</td>
    <td>${entry.sets}</td>
    <td>${entry.reps}</td>
    <td>${entry.notes || ""}</td>
    <td><button class="delete-btn">&times;</button></td>
  `;

  // Handle delete
  row.querySelector('button.delete-btn').addEventListener('click', () => {
    row.remove();
    deleteEntry(entry);
  });

  tableBody.appendChild(row);
}

// Save to localStorage
function saveEntry(entry) {
  const saved = JSON.parse(localStorage.getItem('progressEntries')) || [];
  saved.push(entry);
  localStorage.setItem('progressEntries', JSON.stringify(saved));
}

// Remove entry from localStorage
function deleteEntry(entryToDelete) {
  const saved = JSON.parse(localStorage.getItem('progressEntries')) || [];
  const updated = saved.filter(entry =>
    !(entry.date === entryToDelete.date &&
      entry.exercise === entryToDelete.exercise &&
      entry.sets === entryToDelete.sets &&
      entry.reps === entryToDelete.reps &&
      entry.notes === entryToDelete.notes)
  );
  localStorage.setItem('progressEntries', JSON.stringify(updated));
}
