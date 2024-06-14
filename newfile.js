document.getElementById('snooze-btn').addEventListener('click', function() {
    const snoozeMenu = document.createElement('div');
    snoozeMenu.className = 'snooze-menu';
    snoozeMenu.innerHTML = `
        <div>Snooze until...</div>
        <div onclick="snoozeEmail('later today')">Later today - 6 PM</div>
        <div onclick="snoozeEmail('tomorrow')">Tomorrow - 8 AM</div>
        <div onclick="snoozeEmail('later this week')">Later this week - Friday 8 AM</div>
        <div onclick="snoozeEmail('this weekend')">This weekend - Sunday 8 AM</div>
        <div onclick="snoozeEmail('next week')">Next week - Monday 8 AM</div>
        <div onclick="openCustomDateTimeSelector()">Custom...</div>
    `;
    document.body.appendChild(snoozeMenu);
});

function snoozeEmail(option) {
    // Logic to determine the snooze until date based on the selected option
    let snoozeUntil;
    switch(option) {
        case 'later today':
            snoozeUntil = getLaterTodayTime();
            break;
        case 'tomorrow':
            snoozeUntil = getTomorrowTime();
            break;
        case 'later this week':
            snoozeUntil = getLaterThisWeekTime();
            break;
        case 'this weekend':
            snoozeUntil = getThisWeekendTime();
            break;
        case 'next week':
            snoozeUntil = getNextWeekTime();
            break;
    }
    // Send snooze request to backend
    fetch('/snooze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_id: currentEmailId, snooze_until: snoozeUntil })
    }).then(response => response.json())
      .then(data => console.log(data));
}
