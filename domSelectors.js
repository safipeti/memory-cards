const DomSelectors = {
    DOMcardsHolder: document.getElementById("cardsHolder"),
    DOMtrialEl: document.getElementById("trial"),
    DOMmatchEl: document.getElementById("match"),
    messageText: document.getElementById("message-text"),
    messageUser: document.getElementById("message-user"),
    closeBtn: document.getElementById("close"),
    DOMnewGameBtn: document.getElementById("new-game"),
    DOMrepeatGameBtn: document.getElementById("repeat-game"),
    DOMsettingBtn: document.getElementById("settings"),
    DOMsettingBox: document.getElementById("setting-box"),
    DOMcloseSettingBtn: document.getElementById("close-setting-box"),
    DOMcontrols: document.getElementById("controls"),
    DOMcontainer: document.getElementById("container"),

    // settings fields

    // CATEGORY
    DOMcategoryOpen: document.getElementById("category-open"),
    DOMcategoryContainer: document.getElementById("category-container"),
    DOMselectedCategory: document.getElementById("selected-category"),
    DOMcategoryName: document.getElementById("category-name"),

    categoryOptions: document.querySelectorAll("category-option"),

    // SETTINGS
    DOMstartGame: document.getElementById("start-game"),
    DOMcardsSize: document.getElementById("cards-size"),

    DOMoverlay: document.getElementById("overlay"),

    DOMtopicName: document.getElementById("topic-name"),
};

const {
    cardElements,
    DOMcardsHolder,
    DOMtrialEl,
    DOMmatchEl,
    messageText,
    messageUser,
    closeBtn,
    DOMnewGameBtn,
    DOMrepeatGameBtn,
    DOMsettingBtn,
    DOMsettingBox,
    DOMcloseSettingBtn,
    categoryOpen,
    DOMcategoryContainer,
    DOMselectedCategory,
    DOMcategoryName,
    DOMstartGame,
    DOMcardsSize,
    DOMoverlay,
    DOMtopicName,
    DOMcategoryOpen,
    DOMcontrols,
    DOMcontainer,
} = DomSelectors;
