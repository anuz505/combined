
window.onload = function() {
    var openButton = document.getElementById('quiz-popup-button');
    var modal = document.getElementById('myModal');
    var closeButton = document.getElementById('close');
    var feedbackMessage = document.getElementById('feedback-message');

    openButton.onclick = function() {
        modal.style.display = "block";
    }

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Initialize local storage if there is no record
    if(window.localStorage.getItem('record') === null){
        window.localStorage.setItem('record', JSON.stringify([]));
    } else {
        // Retrieve existing records 
        var records = JSON.parse(window.localStorage.getItem('record'));
        records.forEach((record, index) => {
            createTableRecord(record.data, index);
        });
    }
}


function onFormSubmit() {
    // Hide the popup
    var modal = document.getElementById('myModal');
    modal.style.display = "none";

    // Read the form data
    var data = $("#quiz").serializeArray();

    // Add a row to the table
    var records = JSON.parse(window.localStorage.getItem('record'));
    createTableRecord(data, records.length);

    // Save the record for future use
    var new_record_data = {
        "data": data
    };
    records.push(new_record_data);
    window.localStorage.setItem('record', JSON.stringify(records));

    // Provide feedback based on the user's day
    provideFeedback(data);
}



function createTableRecord(data, index) {
    var table = document.getElementById("quiz-history");
    var row = table.insertRow(-1);

    // Date value
    var dateCell = row.insertCell(0);
    dateCell.innerHTML = data[0].value;

    // Overall score
    var overallCell = row.insertCell(1);
    overallCell.innerHTML = data[1].value;

    // Anxiety score
    var anxietyCell = row.insertCell(2);
    anxietyCell.innerHTML = data[2].value;

    // Stress score
    var stressCell = row.insertCell(3);
    stressCell.innerHTML = data[3].value;

    // Satisfaction score
    var satisfactionCell = row.insertCell(4);
    satisfactionCell.innerHTML = data[4].value;

    // Summary notes
    var notesCell = row.insertCell(5);
    notesCell.innerHTML = data[5].value;

    // Actions (Delete/Modify buttons)
    var actionsCell = row.insertCell(6);
    actionsCell.innerHTML = `
        <button class="modify-button" onclick="modifyRecord(${index})">Modify</button>
        <button class="delete-button" onclick="deleteRecord(${index})">Delete</button>
    `;
}

function provideFeedback(data) {
    console.log("provideFeedback function called"); //tocheck
    var overall = parseInt(data[1].value);
    var stress = parseInt(data[3].value);
    var satisfaction = parseInt(data[4].value);
    var feedbackMessage = document.getElementById('feedback-message');
    var videoRecommendation = document.getElementById('video-recommendation');
    var videoSource = document.getElementById('video-source');
    // Define local video paths
    var videos = {
        toughDay: "videos/vlog.mp4",
        highStress: "videos/breathe.mp4",
        fun: "videos/joke.mp4"
    };

    if (overall <= 2) {
        feedbackMessage.innerHTML = `<p>It seems like you had a tough day. Remember, tough times don't last. Here's a funny video of my vlog to cheer you up:</p>`;
        feedbackMessage.style.display = "block"; 
        videoSource.src = videos.toughDay;
    } else if (stress >= 4) {
        feedbackMessage.innerHTML = `<p>Your stress level seems high. Take a deep breath and relax. Here's a breathing exercise video that might help:</p>`;
        feedbackMessage.style.display = "block"; 
        videoSource.src = videos.highStress;
    } else if (satisfaction >= 4) {
        feedbackMessage.innerHTML = `<p>You're doing great! Keep up the positive energy. Here's an uplifting video for you:</p>`;
        feedbackMessage.style.display = "block"; 
        videoSource.src = videos.fun;
    } else {
        feedbackMessage.innerHTML = `<p>You're doing well. Keep going!</p>`;
        feedbackMessage.style.display = "block"; 
        videoRecommendation.style.display = "none";
        return; // No video recommendation for neutral days
    }
    // Show the video recommendation
    videoRecommendation.style.display = "block";
    videoSource.parentElement.load(); // Reload the video element with the new source
}



function deleteRecord(index) {
    var records = JSON.parse(window.localStorage.getItem('record'));
    records.splice(index, 1); 
    window.localStorage.setItem('record', JSON.stringify(records));
    location.reload(); 
}

function modifyRecord(index) {
    var records = JSON.parse(window.localStorage.getItem('record'));
    var data = records[index].data;

    console.log("Modifying record at index:", index); // Debugging: check the index
    console.log("Existing data:", data); // Debugging: check the existing data

    
    $("input[name='today-date']").val(data[0].value);
    $("input[name='overall'][value='" + data[1].value + "']").prop('checked', true);
    $("input[name='Anxiety'][value='" + data[2].value + "']").prop('checked', true);
    $("input[name='stress'][value='" + data[3].value + "']").prop('checked', true);
    $("input[name='Satisfaction'][value='" + data[4].value + "']").prop('checked', true);
    $("input[name='notes']").val(data[5].value);

    // Open the modal for editing
    var modal = document.getElementById('myModal');
    modal.style.display = "block";

    // Update the form submission process to modify the existing record
    document.getElementById('quiz').onsubmit = function(e) {
        e.preventDefault(); 

        console.log("Submitting modified data..."); //for checking only
        data = $("#quiz").serializeArray();

        console.log("New data:", data); //for checking only

        // Update the existing record with new data
        records[index].data = data;
        window.localStorage.setItem('record', JSON.stringify(records));

        // refresh the table to show updated data
        modal.style.display = "none";
        location.reload(); 

        return false; 
    }
}

/*for activities*/
// JavaScript for Daily Positive Affirmation
document.addEventListener("DOMContentLoaded", function() {
    const affirmations = [
        "You are strong.",
        "You are capable of amazing things.",
        "You are enough.",
        "You are worthy of love and respect.",
        "You are doing the best you can."
    ];

    const affirmationElement = document.getElementById("affirmation");
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    affirmationElement.textContent = randomAffirmation;
});


document.addEventListener('DOMContentLoaded', function () {
        const checklist = document.getElementById('checklist');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const summaryBtn = document.getElementById('summaryBtn');
        const summary = document.getElementById('summary');
        const completedTasks = document.getElementById('completedTasks');

        // Function to add a new custom task
        addTaskBtn.addEventListener('click', function () {
            const taskText = prompt("Enter your custom task:");
            if (taskText) {
                const newTaskId = `task${checklist.children.length + 1}`;
                const newTask = document.createElement('li');
                newTask.innerHTML = `<input type="checkbox" id="${newTaskId}"> <label for="${newTaskId}">${taskText}</label>`;
                checklist.appendChild(newTask);
            }
        });

        // Function to show a summary of completed tasks
        summaryBtn.addEventListener('click', function () {
            completedTasks.innerHTML = ''; // Clear previous summary
            const checkedItems = checklist.querySelectorAll('input[type="checkbox"]:checked');
            if (checkedItems.length === 0) {
                alert("You haven't completed any tasks yet!");
                return;
            }

            checkedItems.forEach(function (item) {
                const taskLabel = checklist.querySelector(`label[for="${item.id}"]`).textContent;
                const completedItem = document.createElement('li');
                completedItem.textContent = taskLabel;
                completedTasks.appendChild(completedItem);
            });

            summary.style.display = 'block'; // Show the summary section
        });
    });

// Gratitude Wall JavaScript
const gratitudeForm = document.getElementById('gratitude-form');
const gratitudePosts = document.getElementById('gratitude-posts');

gratitudeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.getElementById('gratitude-text').value;
    if (text) {
        const post = document.createElement('div');
        post.classList.add('gratitude-post');
        post.innerHTML = `
            <p>${text}</p>
            <div class="post-actions">
                <button class="like-button">&#x2764;</button>
                <button class="delete-button">&#x1f5d1;</button>
            </div>
        `;
        gratitudePosts.appendChild(post);
        document.getElementById('gratitude-text').value = '';
        updateLocalStorage();
    }
});

gratitudePosts.addEventListener('click', function(e) {
    if (e.target.classList.contains('like-button')) {
        e.target.classList.toggle('liked');
    } else if (e.target.classList.contains('delete-button')) {
        const post = e.target.closest('.gratitude-post');
        post.remove();
        updateLocalStorage();
    }
});

function updateLocalStorage() {
    const posts = [];
    document.querySelectorAll('.gratitude-post').forEach(post => {
        posts.push(post.querySelector('p').textContent);
    });
    localStorage.setItem('gratitudePosts', JSON.stringify(posts));
}

function loadFromLocalStorage() {
    const posts = JSON.parse(localStorage.getItem('gratitudePosts')) || [];
    posts.forEach(text => {
        const post = document.createElement('div');
        post.classList.add('gratitude-post');
        post.innerHTML = `
            <p>${text}</p>
            <div class="post-actions">
                <button class="like-button">&#x2764;</button>
                <button class="delete-button">&#x1f5d1;</button>
            </div>
        `;
        gratitudePosts.appendChild(post);
    });
}

loadFromLocalStorage();


//calendar
function toggleCalendar() {
    const calendarPopup = document.getElementById('calendar-popup');
    
    // Initialize FullCalendar only when popup is opened
    if (calendarPopup.style.display === 'flex') {
        calendarPopup.style.display = 'none'; // Close the calendar
    } else {
        calendarPopup.style.display = 'flex'; // Open the calendar
        initializeCalendar(); // Call the function to initialize FullCalendar
    }
}

function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Example events (you can replace this with your own data)
            { title: 'Self-care Day', date: '2024-10-15' },
            { title: 'Mental Health Awareness', date: '2024-10-20' }
        ],
        editable: true,
        selectable: true,
        dateClick: function(info) {
            alert('Clicked on: ' + info.dateStr);
        }
    });
    calendar.render();
}

//Home
document.getElementById('motivateBtn').addEventListener('click', function() {
    const quotes = [
        "Keep pushing forward, no matter what.",
        "Believe in yourself; you are stronger than you think.",
        "Small steps every day lead to big changes.",
        "Your mental health is a priority, not an option.",
        "Embrace the glorious mess that you are.",
        "You're not alone in this journey; take it one day at a time.",
        "Every storm runs out of rain. Stay strong.",
        "Progress, not perfection, is what matters."
    ];

    // Pick a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteBox = document.getElementById('quoteBox');

    // Add a fade-out effect before changing the quote
    quoteBox.style.opacity = 0;
    
    setTimeout(() => {
        // Update the quote text
        quoteBox.textContent = randomQuote;

        // Change text color randomly
        const colors = ['#00796b', '#004d40', '#1de9b6', '#ff7043', '#ffca28'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        quoteBox.style.color = randomColor;

        // Add a fade-in effect
        quoteBox.style.opacity = 1;
    }, 500); // Wait 500ms before showing the new quote
});