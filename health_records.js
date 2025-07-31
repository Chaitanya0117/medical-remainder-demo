// Load user details and manage sections
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
        document.getElementById("username-display").textContent = username;
        document.getElementById("email-display").textContent = email;
    } else {
        window.location.href = "login.html";
    }
// Load user details and manage sections
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
        document.getElementById("username-display").textContent = username;
        document.getElementById("email-display").textContent = email;
    } else {
        window.location.href = "login.html";
    }

    // Profile Picture Upload
    const profileUpload = document.getElementById("profile-upload");
    const profilePic = document.getElementById("profile-pic");
    const uploadBtn = document.getElementById("upload-btn");

    // Load saved profile picture from localStorage (if exists)
    const savedProfilePic = localStorage.getItem("profilePic");
    if (savedProfilePic) {
        profilePic.src = savedProfilePic;
    }

    uploadBtn.addEventListener("click", () => {
        const file = profileUpload.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Display the uploaded image
                profilePic.src = reader.result;

                // Save the image to localStorage
                localStorage.setItem("profilePic", reader.result);
            };
            reader.readAsDataURL(file); // Convert image file to Base64 string
        } else {
            alert("Please select an image to upload.");
        }
    });
});
    // Medication Reminders
    const reminderForm = document.getElementById("reminder-form");
    const reminderList = document.getElementById("reminder-list");

    reminderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const medicationName = document.getElementById("medication-name").value;
        const reminderTime = document.getElementById("reminder-time").value;

        if (medicationName && reminderTime) {
            const listItem = document.createElement("li");
            listItem.textContent = `${medicationName} at ${reminderTime}`;
            reminderList.appendChild(listItem);
            reminderForm.reset();
        }
    });

    // Health Records
    const recordForm = document.getElementById("record-form");
    const recordList = document.getElementById("record-list");

    recordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const description = document.getElementById("record-description").value;
        const date = document.getElementById("record-date").value;

        if (description && date) {
            const listItem = document.createElement("li");
            listItem.textContent = `${description} - ${date}`;
            recordList.appendChild(listItem);
            recordForm.reset();
        }
    });

    // Doctor Appointments
    const appointmentForm = document.getElementById("appointment-form");
    const appointmentList = document.getElementById("appointment-list");

    appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const doctorName = document.getElementById("appointment-doctor").value;
        const appointmentDate = document.getElementById("appointment-date").value;
        const appointmentTime = document.getElementById("appointment-time").value;

        if (doctorName && appointmentDate && appointmentTime) {
            const listItem = document.createElement("li");
            listItem.textContent = `${doctorName} on ${appointmentDate} at ${appointmentTime}`;
            appointmentList.appendChild(listItem);
            appointmentForm.reset();
        }
    });

    // Logout Functionality
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "login.html";
    });
});
