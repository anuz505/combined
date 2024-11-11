document.addEventListener('DOMContentLoaded', () => {
    // Function to display stories from local storage
    function displayStories() {
        const storiesUl = document.getElementById('storiesUl');
        storiesUl.innerHTML = ''; // Clear existing stories

        const stories = JSON.parse(localStorage.getItem('stories')) || [];

        // Create story list items
        stories.forEach((story, index) => {
            const li = document.createElement('li');
            li.classList.add('story-item');

            const fullText = story.text.replace(/\n/g, '<br>'); // Preserve line breaks
            const shortText = fullText.length > 100 ? fullText.slice(0, 100) : fullText;

            li.innerHTML = `
                <h4>${story.name ? story.name : "Anonymous"}</h4>
                <p class="story-text">${shortText}${fullText.length > 100 ? '...' : ''}</p>
                <p class="full-text" style="display: none;">${fullText}</p>
                ${fullText.length > 100 ? '<button class="read-more">Read More</button>' : ''}
                <button class="delete-story" data-index="${index}">Delete</button>
            `;

            storiesUl.appendChild(li);

            // Add event listener to the read more button if it exists
            const readMoreBtn = li.querySelector('.read-more');
            if (readMoreBtn) {
                readMoreBtn.addEventListener('click', () => toggleReadMore(li));
            }

            // Attach event listener to delete button
            const deleteBtn = li.querySelector('.delete-story');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => deleteStory(index));
            }
        });
    }

    // Function to toggle the read more/less functionality
    function toggleReadMore(listItem) {
        const fullText = listItem.querySelector('.full-text');
        const shortText = listItem.querySelector('.story-text');
        const readMoreBtn = listItem.querySelector('.read-more');

        // Toggle the display of the full text and update button text
        if (fullText.style.display === "none") {
            shortText.style.display = "none"; // Hide short text
            fullText.style.display = "block"; // Show full text
            readMoreBtn.innerText = "Read Less"; // Change button text to "Read Less"
        } else {
            shortText.style.display = "block"; // Show short text
            fullText.style.display = "none"; // Hide full text
            readMoreBtn.innerText = "Read More"; // Change button text to "Read More"
        }
    }

    // Function to add a new story
    function addStory(event) {
        event.preventDefault(); // Prevent default form submission

        const storyInput = document.getElementById('storyInput');
        const nameInput = document.getElementById('nameInput');

        if (storyInput.value.trim() === '') {
            alert('Please write a story before submitting.');
            return;
        }

        const newStory = {
            text: storyInput.value,
            name: nameInput.value
        };

        const stories = JSON.parse(localStorage.getItem('stories')) || [];
        stories.push(newStory);
        localStorage.setItem('stories', JSON.stringify(stories));

        storyInput.value = ''; // Clear the input
        nameInput.value = ''; // Clear the name input
        displayStories(); // Update the displayed stories
    }

    // Function to delete a story
    function deleteStory(index) {
        const stories = JSON.parse(localStorage.getItem('stories')) || [];
        stories.splice(index, 1); // Remove the story from the array
        localStorage.setItem('stories', JSON.stringify(stories)); // Update local storage
        displayStories(); // Refresh the list of stories
    }

    // Function to handle form submission on the Contact Us page
    function handleContactFormSubmit(event) {
        event.preventDefault(); // Prevent the default form submission

        // Show confirmation message
        const confirmationMessage = document.createElement('div');
        confirmationMessage.classList.add('confirmation-message');
        confirmationMessage.textContent = 'Message sent! 😊';
        document.getElementById('contact-info').appendChild(confirmationMessage);
        confirmationMessage.style.display = 'block'; // Show the confirmation message

        // Optionally hide it after 3 seconds
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);

        // Clear the form fields
        document.getElementById('contact-form').reset();
    }

    // Attach event listener to the submit button of the Personal Stories section
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', addStory);
    }

    // Attach event listener to the contact form's submit event
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Initialize the story list on page load
    window.onload = displayStories;
});
