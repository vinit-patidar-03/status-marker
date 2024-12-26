let activeColor = 'green';
let urgentColor = '#F14A00';
let closedColor = '#A0153E';

function loadColorsFromStorage() {
    chrome.storage.sync.get(['activeColor', 'urgentColor', 'closedColor'], (result) => {
        activeColor = result.activeColor || 'green';
        urgentColor = result.urgentColor || '#F14A00';
        closedColor = result.closedColor || '#A0153E';
        highlightStatuses(activeColor, urgentColor, closedColor);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'change-color') {
        const { activeColor, urgentColor, closedColor } = message;
        highlightStatuses(activeColor, urgentColor, closedColor);
    }
});

function getTodaysDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function changeColor(child, fontWeight) {
    if (child.childNodes.length === 0 || child.childNodes[0].nodeName === '#text') {
        child.style.color = 'white';
        child.style.fontWeight = fontWeight;
        if (child?.classList?.length !== 0 && child?.classList?.contains('ui-state-default')) {
            child?.classList?.remove('ui-state-default');
        }
        return;
    }
    child.childNodes.forEach((node) => {
        changeColor(node, fontWeight);
    });
}

function daysDifference(date1, date2) {
    const diffTime = new Date(date2) - new Date(date1);
    return diffTime / (1000 * 60 * 60 * 24);
}

function isDateInRange(currentDateWithTime, startDateWithTime, endDateWithTime, rangeInDays = 1) {
    const currentDateDay = parseInt(currentDateWithTime.split(' ')[0].split('-')[0]);
    const startDateDay = parseInt(startDateWithTime.split(' ')[0].split('-')[0]);
    const endDateDay = parseInt(endDateWithTime.split(' ')[0].split('-')[0]);

    const currentDateMonth = parseInt(currentDateWithTime.split(' ')[0].split('-')[1]);
    const startDateMonth = parseInt(startDateWithTime.split(' ')[0].split('-')[1]);
    const endDateMonth = parseInt(endDateWithTime.split(' ')[0].split('-')[1]);

    const currentDateYear = parseInt(currentDateWithTime.split(' ')[0].split('-')[2]);
    const startDateYear = parseInt(startDateWithTime.split(' ')[0].split('-')[2]);
    const endDateYear = parseInt(endDateWithTime.split(' ')[0].split('-')[2]);

    const currentHour = parseInt(currentDateWithTime.split(' ')[1].split(':')[0]);
    const startHour = parseInt(startDateWithTime.split(' ')[1].split(':')[0]);
    const endHour = parseInt(endDateWithTime.split(' ')[1].split(':')[0]);

    const currentMinute = parseInt(currentDateWithTime.split(' ')[1].split(':')[1]);
    const startMinute = parseInt(startDateWithTime.split(' ')[1].split(':')[1]);
    const endMinute = parseInt(endDateWithTime.split(' ')[1].split(':')[1]);

    const currentDate = new Date(currentDateYear, currentDateMonth - 1, currentDateDay, currentHour, currentMinute);
    const startDate = new Date(startDateYear, startDateMonth - 1, startDateDay, startHour, startMinute);
    const endDate = new Date(endDateYear, endDateMonth - 1, endDateDay, endHour, endMinute);

    const daysToEnd = daysDifference(currentDate, endDate);

    if (daysToEnd <= rangeInDays && daysToEnd >= 0) {
        return "Urgent";
    }
    if ((currentDate >= startDate && currentDate <= endDate) || currentDate <= startDate) {
        return "Active";
    }
    return "Closed";
}

function highlightStatuses(activeColor, urgentColor, closedColor) {
    const iframe = document.querySelector('#myframe');
    if (!iframe || !iframe.contentWindow || !iframe.contentWindow.document) {
        setTimeout(() => highlightStatuses(activeColor, urgentColor, closedColor), 1000);
        return;
    }

    const iframeDocument = iframe.contentWindow.document;

    if (iframeDocument.readyState === 'complete') {
        const companyRows = iframeDocument.querySelectorAll('.ui-widget-content.jqgrow.ui-row-ltr');
        if (companyRows.length > 0) {
            const currentDateWithTime = getTodaysDate(new Date());
            companyRows.forEach((companyRow) => {
                const startDateWithTime = companyRow.childNodes[10]?.innerText?.trim() || '';
                const endDateWithTime = companyRow.childNodes[11]?.innerText?.trim() || '';
                if (startDateWithTime && endDateWithTime) {
                    const status = isDateInRange(currentDateWithTime, startDateWithTime, endDateWithTime);
                    let highlightColor = '';
                    let fontWeight = '';
                    if (status === "Active") {
                        highlightColor = activeColor || 'green';
                        fontWeight = 'bold';
                    } else if (status === "Urgent") {
                        highlightColor = urgentColor || '#F14A00';
                        fontWeight = 'bold';
                    } else {
                        highlightColor = closedColor || '#A0153E';
                    }

                    companyRow.style.background = highlightColor;
                    changeColor(companyRow, fontWeight);
                }
            });
        } else {
            setTimeout(() => highlightStatuses(activeColor, urgentColor, closedColor), 1000);
        }
    }
}

function observeIframeContent(iframe) {
    if (!iframe) return;

    iframe.addEventListener('load', () => {
        const iframeDocument = iframe.contentWindow.document;
        const observer = new MutationObserver(() => {
            highlightStatuses(activeColor, urgentColor, closedColor);
        });
        observer.observe(iframeDocument.body, { childList: true, subtree: true });
        highlightStatuses(activeColor, urgentColor, closedColor);
    });
}

const iframe = document.querySelector('#myframe');
observeIframeContent(iframe);

loadColorsFromStorage();
