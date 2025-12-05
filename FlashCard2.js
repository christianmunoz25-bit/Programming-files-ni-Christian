document.addEventListener('DOMContentLoaded', () => {
    // --- Data Storage ---
    // Start with an empty array to store all flashcards
    let flashcards = []; 
    let currentCardIndex = 0;

    // --- Element Selection ---
    const addCardBtn = document.getElementById('addCardBtn');
    const addCardModal = document.getElementById('addCardModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cardForm = document.getElementById('cardForm');
    
    const questionTextElement = document.getElementById('questionText');
    const answerTextElement = document.getElementById('answerText');
    const flipButton = document.getElementById('flipButton');
    const nextButton = document.getElementById('nextButton');

    // --- Card Display Functions ---
    
    // Function to show the current card's content
    function displayCurrentCard() {
        if (flashcards.length === 0) {
            questionTextElement.textContent = 'Create your first flashcard to get started!';
            answerTextElement.textContent = '';
            // Disable buttons if no cards exist
            flipButton.disabled = true;
            nextButton.disabled = true;
            return;
        }

        flipButton.disabled = false;
        nextButton.disabled = false;
        
        const card = flashcards[currentCardIndex];
        questionTextElement.textContent = card.question;
        answerTextElement.textContent = card.answer;
        answerTextElement.classList.add('hidden-answer'); // Keep answer hidden
        flipButton.textContent = 'FLIP CARD';
    }

    // --- Modal Control ---
    
    // Show the modal
    addCardBtn.addEventListener('click', () => {
        addCardModal.classList.remove('hidden-modal');
    });

    // Hide the modal when cancel is clicked
    closeModalBtn.addEventListener('click', () => {
        addCardModal.classList.add('hidden-modal');
        cardForm.reset(); // Clear the form
    });
    
    // --- Form Submission (Adding the Card) ---

    cardForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the form from submitting and refreshing the page

        const newQuestion = document.getElementById('newQuestion').value;
        const newAnswer = document.getElementById('newAnswer').value;

        // Create the new card object
        const newCard = {
            question: newQuestion,
            answer: newAnswer,
            mastered: false
        };

        // Add the new card to the list
        flashcards.push(newCard);

        // Hide the modal and clear the form
        addCardModal.classList.add('hidden-modal');
        cardForm.reset();

        // If this is the first card, display it immediately
        if (flashcards.length === 1) {
            currentCardIndex = 0;
        }
        
        // Update the display
        displayCurrentCard();
    });
    
    // --- Quiz Interaction ---

    // Toggle the answer visibility
    flipButton.addEventListener('click', () => {
        if (flashcards.length > 0) {
            answerTextElement.classList.toggle('hidden-answer');
            if (answerTextElement.classList.contains('hidden-answer')) {
                flipButton.textContent = 'FLIP CARD';
            } else {
                flipButton.textContent = 'SHOW QUESTION';
            }
        }
    });

    // Go to the next card
    nextButton.addEventListener('click', () => {
        if (flashcards.length > 0) {
            // Cycle to the next card (or back to the first if at the end)
            currentCardIndex = (currentCardIndex + 1) % flashcards.length; 
            displayCurrentCard();
        }
    });

    // Initialize the display when the page loads
    displayCurrentCard();
});
