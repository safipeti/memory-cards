const app = (() => {
    let currSettings;

    const repeatGame = () => {
        pubSub.emit("gameStarted", currSettings);
    };

    const start = async () => {
        const gameSettings = await getCurrentSettings();
        pubSub.emit("gameStarted", gameSettings);
    };

    const getCurrentSettings = async () => {
        const topic = await Model.getTopic();
        const topics = await Model.getTopics();
        if (topic) {
            const cards = Model.getCards(
                topic.pictures,
                appSettings.cardSize,
                topic.imgDir
            );

            const _settings = {
                topic: topic,
                topics: topics,
                cols: appSettings.cols,
                cardSize: appSettings.cardSize,
                gridSize: appSettings.cardSize * 2,
                cards: cards,
            };
            currSettings = _settings;

            return _settings;
        }
    };

    start();

    pubSub.on("repeatGame", repeatGame);
    pubSub.on("newGame", start);
})();
