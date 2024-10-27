document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    alert(`Schedule submitted for ${date} at ${time}`);
  });