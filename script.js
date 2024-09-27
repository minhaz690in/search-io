document.addEventListener('DOMContentLoaded', function() {
    const popup = document.querySelector('.popup');
    const loginBox = document.querySelector('.login-box');
    const options = document.querySelector('.options');
    const searchBtn = document.getElementById('searchBtn');
    const noteBtn = document.getElementById('noteBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const notepad = document.querySelector('.notepad');
    const createNew = document.getElementById('createNew');
    const noteArea = document.getElementById('noteArea');
    const deleteBtn = document.getElementById('deleteBtn');
    const copyBtn = document.getElementById('copyBtn');
    const aboutSection = document.querySelector('.about');
    const previousNotesSection = document.querySelector('.previous-notes');
    const backBtn = document.getElementById('backBtn'); // Back button
    const backFromNoteBtn = document.getElementById('backFromNoteBtn'); // Back button for notepad
    const backFromAboutBtn = document.getElementById('backFromAboutBtn'); // Back button for About section

    let savedNotes = [];
    let currentNoteIndex = null;

    // Show popup first, then login
    setTimeout(() => {
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
            loginBox.style.display = 'block';
        }, 3000); // Popup stays for 3 seconds
    }, 500);

    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (password === 'Minhaz') {
            alert('Login successful!');
            loginBox.style.display = 'none';
            options.style.display = 'block'; // Show option buttons after successful login
        } else {
            alert('Incorrect password!');
        }
    });

    // Search button functionality
    searchBtn.addEventListener('click', function() {
        window.open('https://www.google.com', '_blank');
        options.style.display = 'none'; // Hide options when searching
    });

    // Show notepad on Note button click
    noteBtn.addEventListener('click', function() {
        options.style.display = 'none';
        notepad.style.display = 'block';
        showPreviousNotes(); // Show previous notes when opening notepad
    });

    // Save current note
    function saveNote() {
        const noteText = noteArea.value.trim();
        if (noteText) {
            if (currentNoteIndex !== null) {
                // Update existing note
                savedNotes[currentNoteIndex] = noteText;
            } else {
                // Save new note
                if (savedNotes.length >= 30) { // Limit to 30 notes
                    savedNotes.shift(); // Remove the oldest note
                }
                savedNotes.push(noteText);
                currentNoteIndex = savedNotes.length - 1; // Set current note index to last
            }
            alert('Note saved successfully!');
        }
    }

    // Create new note functionality
    createNew.addEventListener('click', function() {
        saveNote(); // Save current note before creating a new one
        noteArea.value = ''; // Clear the note area for new note
        currentNoteIndex = null; // Reset current note index for new note
        showPreviousNotes(); // Update previous notes display
    });

    // Show previous notes
    function showPreviousNotes() {
        previousNotesSection.innerHTML = ''; // Clear previous notes section
        savedNotes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.textContent = note;
            noteDiv.className = 'previous-note';
            noteDiv.addEventListener('click', function() {
                noteArea.value = note; // Load the clicked note into the text area
                currentNoteIndex = index; // Set current note index to the clicked note
            });
            previousNotesSection.appendChild(noteDiv);
        });
    }

    // Delete note
    deleteBtn.addEventListener('click', function() {
        if (currentNoteIndex !== null) {
            savedNotes.splice(currentNoteIndex, 1); // Remove the current note
            noteArea.value = ''; // Clear the note area
            currentNoteIndex = null;
            alert('Note deleted!');
            showPreviousNotes(); // Update previous notes display
        } else {
            alert('No note to delete!');
        }
    });

    // Copy note content
    copyBtn.addEventListener('click', function() {
        noteArea.select();
        document.execCommand('copy');
        alert('Text copied to clipboard!');
    });

    // Show About section
    aboutBtn.addEventListener('click', function() {
        options.style.display = 'none';
        aboutSection.style.display = 'block'; // Show about section
    });

    // Back button functionality
    backBtn.addEventListener('click', function() {
        if (notepad.style.display === 'block') {
            notepad.style.display = 'none'; // Hide notepad
        }
        if (aboutSection.style.display === 'block') {
            aboutSection.style.display = 'none'; // Hide About section if visible
        }
        options.style.display = 'block'; // Go back to options
    });

    // Back button for Notepad
    backFromNoteBtn.addEventListener('click', function() {
        notepad.style.display = 'none'; // Hide notepad
        options.style.display = 'block'; // Show options again
    });

    // Back button for About section
    backFromAboutBtn.addEventListener('click', function() {
        aboutSection.style.display = 'none'; // Hide About section
        options.style.display = 'block'; // Show options again
    });
});