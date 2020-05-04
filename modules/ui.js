const ui = (function () {
    let chosenCards = [];
    let firstCardFlipTimeout;
    let currentCards = [];

    const displayGrid = (data) => {
        let { cards, cols } = data;
        currentCards = cards;

        if (window.innerHeight > window.innerWidth) {
            cols = setCols(data.cardSize) || cols;
        }

        DOMcardsHolder.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        if (cols == 2) {
            DOMcontainer.style.maxWidth = "400px";
        } else {
            setMaxWidth();
        }

        cardsHolder.innerHTML = cards
            .map(
                (card, index) => `
                <div class="card" data-card-index="${index}">
                    <div class="side side-back" style="background: var(${data.topic.backSideColor})">
                    </div>

                    <div class="side side-front">
                        <img class="card-img" src="${card.src}" />
                        <div class="img-footer"></div>
                        <div class="img-title">${card.title}</div>
                    </div>
                </div>
        `
            )
            .join("");
    };

    function setCols(cardSize) {
        if (cardSize == 3) {
            return 2;
        }
        if (cardSize == 6) {
            return 3;
        }
        if (cardSize == 10 || cardSize == 12) {
            return 4;
        }
        if (cardSize == 15) {
            return 5;
        }
        return null;
    }

    function setMaxWidth() {
        if (window.innerWidth > 1024) {
            DOMcontainer.style.maxWidth = "700px";
        } else {
            DOMcontainer.style.maxWidth = "600px";
        }
    }

    function flip(e) {
        if (e.target.classList.contains("side-back")) {
            const sideBack = e.target;
            const cardIndex = sideBack.parentElement.dataset.cardIndex;

            chosenCards.push(cardIndex);

            if (chosenCards.length < 3) {
                sideBack.classList.add("flip180");
                sideBack.nextElementSibling.classList.add("flip0");
            }

            if (chosenCards.length === 1) {
                firstCardFlipTimeout = setTimeout(() => {
                    flipBack(sideBack);
                    chosenCards = [];
                    pubSub.emit("flip", "flip");
                }, 2000);
            }

            if (chosenCards.length === 2) {
                clearTimeout(firstCardFlipTimeout);

                setTimeout(() => {
                    const cardEl_1 = document.querySelector(
                        `[data-card-index="${chosenCards[0]}"]`
                    );
                    const cardEl_2 = document.querySelector(
                        `[data-card-index="${chosenCards[1]}"]`
                    );

                    console.log(cardEl_1, cardEl_2);

                    if (
                        currentCards[chosenCards[0]].src ===
                        currentCards[chosenCards[1]].src
                    ) {
                        pubSub.emit("match", "match");
                        pubSub.emit("flip", "flip");
                    } else {
                        console.log("ide");
                        flipBack(cardEl_1.firstElementChild);
                        flipBack(cardEl_2.firstElementChild);
                        pubSub.emit("flip", "flip");
                    }
                    chosenCards = [];
                }, 1200);
            }
        }
    }
    function flipBack(sideBack) {
        sideBack.classList.remove("flip180");
        sideBack.nextElementSibling.classList.remove("flip0");
    }

    pubSub.on("gameStarted", displayGrid);

    DOMcardsHolder.addEventListener("click", flip);
    DOMnewGameBtn.addEventListener("click", (e) => {
        e.preventDefault();
        pubSub.emit("newGame");
    });
    DOMrepeatGameBtn.addEventListener("click", (e) => {
        e.preventDefault();
        pubSub.emit("repeatGame");
    });
})();
