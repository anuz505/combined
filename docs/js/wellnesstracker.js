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

