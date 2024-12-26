const active = document.getElementById('active');
const urgent = document.getElementById('urgent');
const closed = document.getElementById('closed');
const submit = document.getElementById('submit');
const reset = document.getElementById('reset');

const defaultColors = {
    activeColor: '#008000',
    urgentColor: '#F14A00',
    closedColor: '#A0153E',
};

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['activeColor', 'urgentColor', 'closedColor'], (result) => {
        active.value = result.activeColor || defaultColors.activeColor;
        urgent.value = result.urgentColor || defaultColors.urgentColor;
        closed.value = result.closedColor || defaultColors.closedColor;
    });
});

submit.addEventListener('click', () => {
    const activeColor = active.value;
    const urgentColor = urgent.value;
    const closedColor = closed.value;

    chrome.storage.sync.set({
        activeColor,
        urgentColor,
        closedColor,
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'change-color',
            activeColor,
            urgentColor,
            closedColor,
        });
    });
});

// Reset to default theme
reset.addEventListener('click', () => {
    chrome.storage.sync.set(defaultColors);

    active.value = defaultColors.activeColor;
    urgent.value = defaultColors.urgentColor;
    closed.value = defaultColors.closedColor;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: 'change-color',
            ...defaultColors,
        });
    });
});
