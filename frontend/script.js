document.getElementById('start').addEventListener('click', async function(event) {
    event.preventDefault();
    console.log("Button Clicked")
    const hostName = document.getElementById('hostName').value;
    const maxPlayers = document.getElementById('Players').value;

    if (!hostName || !maxPlayers) {
        alert('Please enter both Host Name and Max Players');
        return;
    }

    const formData = {
        hostName: hostName,
        maxPlayers: parseInt(maxPlayers)
    };

    try {
        const response = await fetch('http://localhost:5000/api/games/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newGame = await response.json();
        console.log('Created Game:', newGame);
        
        // Example: Update UI with created game information
        const gameInfo = document.createElement('p');
        gameInfo.textContent = `Game created with code: ${newGame.code}`;
        document.body.appendChild(gameInfo);

        // Example: Redirect to game lobby or handle further interactions
        // window.location.href = `/lobby?gameId=${newGame._id}`; // Redirect example

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the game. Please try again.');
    }
});
