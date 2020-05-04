(function () {
    const displayCategories = (categories) => {
        DOMcategoryContainer.innerHTML = "";
        DOMcategoryContainer.innerHTML = categories
            .map(
                (c) => `
        
        <ul class="category-block">
            <li data-category-id="${c.id}">
                ${c.name}
                <ul class="topics">
                    ${c.topics
                        .map(
                            (t) => `
                    <li class="topic" data-category-id="${c.id}" data-topic-id="${t.id}">${t.name}</li>
                    `
                        )
                        .join("")}
                </ul>
            </li>
        </ul>
        `
            )
            .join("");
    };

    const displayTopicName = (name) => {
        DOMcategoryName.innerText = name.toUpperCase();
    };

    const updateTopicName = (topic) => {
        DOMtopicName.innerText = topic.name;
    };

    const displaySettingOptions = (data) => {
        displayCategories(data.topics);
        displayTopicName(data.topic.name);
        updateTopicName(data.topic);
    };

    pubSub.on("gameStarted", displaySettingOptions);

    function toggleCategoryContainer() {
        DOMselectedCategory.classList.toggle("rect-bottom");
        DOMcategoryContainer.classList.toggle("show-cat-cont");
        DOMcategoryOpen.classList.toggle("close");
    }

    function closeSetting() {
        DOMsettingBox.classList.remove("show");
        DOMoverlay.classList.remove("overlay");
        if (DOMcategoryContainer.classList.contains("show-cat-cont")) {
            toggleCategoryContainer();
        }
    }

    function changeTopic(e) {
        if (e.target.classList.contains("topic")) {
            const newTopic = {
                catId: e.target.dataset.categoryId,
                topicId: e.target.dataset.topicId,
                name: e.target.innerText,
            };

            displayTopicName(newTopic.name);
            toggleCategoryContainer();
            pubSub.emit("topicChanged", newTopic);
        }
    }

    function changeCardSize() {
        const cols = getColSize(DOMcardsSize.value);
        pubSub.emit("cardSizeChanged", { cs: DOMcardsSize.value, cols: cols });
    }

    function getColSize(cardSize) {
        let found;
        document.querySelectorAll(".cards-size-option").forEach((element) => {
            if (element.value == cardSize) {
                found = element.dataset.cols;
            }
        });
        return found;
    }

    pubSub.on("topicsReady", displayCategories);
    pubSub.on("currentTopicReady", displayTopicName);

    DOMcloseSettingBtn.addEventListener("click", closeSetting);
    DOMselectedCategory.addEventListener("click", toggleCategoryContainer);
    DOMcategoryContainer.addEventListener("click", changeTopic);
    DOMcardsSize.addEventListener("change", changeCardSize);
    DOMstartGame.addEventListener("click", () => {
        closeSetting();
        pubSub.emit("newGame");
    });
    DOMsettingBtn.addEventListener("click", (e) => {
        e.preventDefault();
        DOMsettingBox.classList.toggle("show");
        DOMoverlay.classList.toggle("overlay");

        pubSub.emit("settingsOpened");
    });
})();

(async () => {
    let categories = [];

    const fetchTopics = async (e) => {
        if (categories.length === 0) {
            categories = await fetch(appSettings.categorySrc)
                .then((res) => res.json())
                .then((data) => data);
        }
        pubSub.emit("topicsReady", categories);
    };

    const getCurrentTopic = async () => {
        const topic = await Model.getTopic();
        pubSub.emit("currentTopicReady", topic.name);
    };

    const setCurrentTopic = (currentTopic) => {
        appSettings.categoryId = currentTopic.catId;
        appSettings.topicId = currentTopic.topicId;
    };

    const setCurrentCardSize = (cs) => {
        appSettings.cardSize = cs.cs;
        appSettings.cols = cs.cols;
    };

    pubSub.on("settingsOpened", getCurrentTopic);
    pubSub.on("topicChanged", setCurrentTopic);
    pubSub.on("cardSizeChanged", setCurrentCardSize);

    const topic = await Model.getTopic();
})();
