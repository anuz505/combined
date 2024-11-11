
function submitForm() {
    const date = document.getElementById('date').value;
    const mood = document.querySelector('input[name="mood"]:checked').value;
    const entry = document.getElementById('entry').value;

  
    saveData(date, mood, entry);


    displayTips(mood);


    document.getElementById('journalForm').reset();
}


function displayTips(mood) {
    const tipsElement = document.getElementById('moodTips');
    let tips = '';

    switch (mood) {
        case 'happy':
            tips = '<li>Do something that makes you smile!</li><li>Engage in activities you enjoy.</li><li>Spend time with your loved ones.</li><li>Express gratitude for positive moments in your life.</li>';
            break;
        case 'sad':
            tips = '<li>Reach out to friends or family for support.</li><li>Consider activities that bring comfort.</li><li>Allow yourself to feel and express your emotions.</li>';
            break;
        case 'calm':
            tips = '<li>Enjoy a calming cup of tea!</li><li>Listen to soothing music.</li><li>Practice mindfulness to stay present in the moment.</li>';
            break;
        case 'anxious':
            tips = '<li>Acknowledge your anxiety and take steps to calm your mind.</li><li>Practice deep breathing exercises to reduce anxiety.</li><li>Break tasks into smaller, manageable steps to ease overwhelm.</li><li>Consider talking to someone you trust about your feelings.</li>';
            break;
        case 'energetic':
            tips = '<li>Channel your energy into productive and positive activities.</li><li>Plan tasks that align with your energetic state for increased productivity.</li><li>Consider creative pursuits to express and utilize your energy.</li>';
            break;
        case 'stressed':
            tips = '<li>Identify stressors and implement strategies to manage stress.</li><li>Take short breaks to stretch and relax during stressful periods.</li><li>Practice mindfulness or meditation to alleviate stress.</li>';
            break;
        case 'confident':
            tips = '<li>Embrace your confidence and use it to tackle challenges.</li><li>Set ambitious yet achievable goals to maintain your confidence.</li><li>Share your achievements with others to reinforce positive feelings.</li>';
            break;
        case 'frustated':
            tips = '<li>Take a break to cool down.</li><li>Acknowledge frustration and find constructive ways to address it.</li><li>Express your feelings through journaling or talking to someone.</li>';
            break;
        case 'motivated':
            tips = '<li>Harness your motivation to work towards your goals.</li><li>Surround yourself with positive influences to sustain motivation.</li><li>Celebrate small victories along the way to keep motivation high.</li>';
            break;
        default:
            tips = 'No specific tips for this mood.';
    }

    tipsElement.innerHTML = tips;
}


function saveData(date, mood, entry) {
    const data = { date, mood, entry };
    const historyData = JSON.parse(localStorage.getItem('journalHistory')) || [];

    historyData.push(data);
    localStorage.setItem('journalHistory', JSON.stringify(historyData));
}


function showHistory() {
    const historyData = JSON.parse(localStorage.getItem('journalHistory')) || [];

    if (historyData.length > 0) {
        let historyText = 'History:\n\n';
        historyData.forEach((entry) => {
            historyText += `Date: ${entry.date}, Mood: ${entry.mood}, Entry: ${entry.entry}\n`;
        });
        alert(historyText);
    } else {
        alert('No history available.');
    }
}

function loadData() {
    const storedData = JSON.parse(localStorage.getItem('journalHistory'));
    if (storedData && storedData.length > 0) {
        const lastEntry = storedData[storedData.length - 1];
        document.getElementById('date').value = lastEntry.date;
        document.querySelector(`input[name="mood"][value="${lastEntry.mood}"]`).checked = true;
        document.getElementById('entry').value = lastEntry.entry;
    }
}


function displaySavedData() {
    const displayContainer = document.getElementById("display-container");
    const historyData = JSON.parse(localStorage.getItem("journalHistory")) || [];

    displayContainer.innerHTML = "<h2>Saved Journal Entries</h2>";

    if (historyData.length > 0) {
        historyData.forEach((entry, index) => {
            displayContainer.innerHTML += `<p>${index + 1}. Date: ${entry.date}, Mood: ${entry.mood}, Entry: ${entry.entry}</p>`;
        });
    } else {
        displayContainer.innerHTML = "<p>No journal entries found.</p>";
    }
}


window.onload = function () {
    loadData();
};


document.getElementById('journalForm').addEventListener('submit', function (e) {
    e.preventDefault();
    submitForm();
});
