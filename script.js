// Initialize user storage
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// Function to update records display
function updateRecordList() {
    const recordList = document.getElementById('record-list');
    recordList.innerHTML = '';
    const records = JSON.parse(localStorage.getItem(currentUser.username + '-records')) || [];
    
    records.forEach(record => {
        const listItem = document.createElement('li');
        listItem.textContent = `${record.description} - ${record.date} ${record.file ? "(Attached: " + record.file + ")" : ""}`;
        recordList.appendChild(listItem);
    });
}

// Function to update reminders display
function updateReminderList() {
    const reminderList = document.getElementById('reminder-list');
    reminderList.innerHTML = '';
    const reminders = JSON.parse(localStorage.getItem(currentUser.username + '-reminders')) || [];
    
    reminders.forEach(reminder => {
        const listItem = document.createElement('li');
        listItem.textContent = `${reminder.name} at ${reminder.time}`;
        reminderList.appendChild(listItem);
    });
}

// Handle sign up
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const email = document.getElementById('signup-email').value;

    if (users.find(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }

    const newUser = { username, password, email };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign up successful! You can now log in.');
    window.location.href = 'login.html';
});

// Handle login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        alert('Login successful!');
        window.location.href = 'records.html';
    } else {
        alert('Invalid username or password');
    }
});

// Display user details
function displayUserDetails() {
    document.getElementById('username-display').textContent = currentUser.username;
    document.getElementById('email-display').textContent = currentUser.email;
}

// Handle adding a record
document.getElementById('record-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const description = document.getElementById('record-description').value;
    const date = document.getElementById('record-date').value;
    const fileInput = document.getElementById('record-file');
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';

    const records = JSON.parse(localStorage.getItem(currentUser.username + '-records')) || [];
    records.push({ description, date, file: fileName });
    localStorage.setItem(currentUser.username + '-records', JSON.stringify(records));
    updateRecordList();

    // Clear the form fields
    document.getElementById('record-description').value = '';
    document.getElementById('record-date').value = '';
    fileInput.value = ''; // Clear the file input
});

// Handle adding a reminder
document.getElementById('reminder-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const medicationName = document.getElementById('medication-name').value;
    const reminderTime = document.getElementById('reminder-time').value;

    const reminders = JSON.parse(localStorage.getItem(currentUser.username + '-reminders')) || [];
    reminders.push({ name: medicationName, time: reminderTime });
    localStorage.setItem(currentUser.username + '-reminders', JSON.stringify(reminders));
    updateReminderList();

    // Clear the form fields
    document.getElementById('medication-name').value = '';
    document.getElementById('reminder-time').value = '';
});

// Update the record and reminder lists on the records page load
if (document.getElementById('record-list')) {
    displayUserDetails();
    updateRecordList();
    updateReminderList();
}
