document.addEventListener("DOMContentLoaded", function() {
    const generateMemeButton = document.getElementById("generateMeme");
    const generateJokeButton = document.getElementById("generateJoke");
    const generateQuoteButton = document.getElementById("generateQuote");
    const generateRiddleButton = document.getElementById("generateRiddle");
    const riddleAnswerButton = document.getElementById("generateRiddleAnswer");
    const resultDiv = document.getElementById("result");
    const memeImg = document.getElementById("meme-image");
    const riddleAnswer = document.getElementById("riddle-answer");

    // Initialize index lists
    let usedMemeIndex = [];
    let usedJokeIndex = [];
    let usedQuoteIndex = [];
    let usedRiddleIndex = [];

    generateMemeButton.addEventListener("click", generateMeme);
    generateJokeButton.addEventListener("click", generateJoke);
    generateQuoteButton.addEventListener("click", generateQuote);
    generateRiddleButton.addEventListener("click", generateRiddle);

    function clearAll() {
        memeImg.src = "";
        memeImg.style.display = "none";
        resultDiv.textContent = "";
        riddleAnswerButton.style.display = "none"
        riddleAnswer.textContent = "";
    }

    function generateMeme() {
        clearAll();
        // Logic to fetch and display a meme from the internet
        let memeList = [
            "https://i.pinimg.com/564x/7f/9e/7f/7f9e7f66ff14a605f439ccf1964ef0fc.jpg",
            "https://media.tenor.com/J_GTkryN8v0AAAAC/dark-humor-memes.gif",
            "https://www.boredpanda.com/blog/wp-content/uploads/2022/03/darker-side-humor-memes-instagram-623ddf5279b5a__700.jpg",
            "https://i.redd.it/ojaljm69lsp71.jpg",
        ];

        let getRandom = getRandomItemFromList(usedMemeIndex, memeList);
        let memeToInsert = memeList[getRandom[0]];
        usedMemeIndex = getRandom[1];

        memeImg.src = memeToInsert;
        memeImg.style.display = "block";
    }

    function generateJoke() {
        clearAll();
        // Logic to generate and display a black humor joke
        let jokeList = [
            "What does an orphan that takes a selfie? A family photo",
            "Why do American people suck at chess? Cause they got no towers",
            "I was talking to an Asian girl and she had a weird name, she repeated \"I\'m Tu Yung\" ",
        ]

        let getRandom = getRandomItemFromList(usedJokeIndex, jokeList);
        let jokeToInsert = jokeList[getRandom[0]];
        usedJokeIndex = getRandom[1];

        resultDiv.textContent = jokeToInsert;
    }

    function generateQuote() {
        clearAll();
        // Logic to fetch and display a random quote
        let quoteList = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
            "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
            "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it. - Jordan Belfort",
            "Life is what happens when you're busy making other plans. - John Lennon"
        ];

        let getRandom = getRandomItemFromList(usedQuoteIndex, quoteList);
        let quoteToInsert = quoteList[getRandom[0]];
        usedQuoteIndex = getRandom[1];

        resultDiv.textContent = quoteToInsert;
    }

    function generateRiddle() {
        clearAll();
        // Logic to generate and display a riddle
        let riddleList = [
            "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
            "I'm not alive, but I can grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
            "The more you take, the more you leave behind. What am I?",
            "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
            "I'm a word of letters three, add two and fewer there will be. What am I?"
        ];

        let riddleAnswerList = [
            "An echo",
            "Fire",
            "Footsteps",
            "Pencil lead",
            "Few"
        ];

        let getRandom = getRandomItemFromList(usedRiddleIndex, riddleList);
        let riddleToInsert = riddleList[getRandom[0]];
        let riddleAnswerToInsert = riddleAnswerList[getRandom[0]];
        usedRiddleIndex = getRandom[1];

        resultDiv.textContent = riddleToInsert;
        riddleAnswerButton.style.display = "block";

        riddleAnswerButton.onclick = () => {
            riddleAnswer.textContent = riddleAnswerToInsert;
            riddleAnswer.style.color = "yellow";
            riddleAnswer.style.fontSize = "25px";
        };
        

    }

    // Function to get a random item from a list while avoiding duplicates
    function getRandomItemFromList(usedIndexList, itemList) {
        let itemIndex = -1;

        // Check if there are items left in the list
        if (usedIndexList.length < itemList.length) {
            do {
                itemIndex = Math.floor(Math.random() * itemList.length);
            } while (usedIndexList.includes(itemIndex));

            usedIndexList.push(itemIndex);
        } else {
            // If all items have been used, reset the usedIndexList
            usedIndexList = [];
            itemIndex = Math.floor(Math.random() * itemList.length);
            usedIndexList.push(itemIndex);
        }

        return [itemIndex, usedIndexList];
    }
});
