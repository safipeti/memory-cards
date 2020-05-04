(() => {
    let match = 0;
    let flip = 0;

    DOMmatchEl.innerText = match;
    DOMtrialEl.innerText = flip;

    const increase = (type) => {
        if (type == "match") {
            DOMmatchEl.innerText = ++match;
        } else if (type == "flip") {
            DOMtrialEl.innerText = ++flip;
        }
    };

    const reset = () => {
        match = 0;
        flip = 0;
        DOMmatchEl.innerText = match;
        DOMtrialEl.innerText = flip;
    };

    pubSub.on("match", increase);
    pubSub.on("flip", increase);
    pubSub.on("gameStarted", reset);
})();
