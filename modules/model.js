const Model = (() => {
    const getTopic = async () => {
        return await fetch(appSettings.data)
            .then((res) => res.json())
            .then((data) => {
                return data
                    .find((c) => c.id == appSettings.categoryId)
                    .topics.find((t) => t.id == appSettings.topicId);
            })
            .catch((err) => err);
    };

    const getTopics = async () => {
        return await fetch(appSettings.data)
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => err);
    };

    const getCards = (images, cardSize, dir) => {
        images.sort(() => 0.5 - Math.random());
        let currImages = images.slice(0, cardSize);

        currImages = [...currImages, ...currImages];
        currImages.sort(() => 0.5 - Math.random());

        return currImages.map((i) => ({
            src: `${appSettings.imgSrc}/${dir}/${i.src}`,
            title: i.title,
        }));
    };

    return {
        getTopic,
        getTopics,
        getCards,
    };
})();
