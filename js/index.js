let accountBalance = 5500; 
const historyLog = [];

document.getElementById('donation-tab').addEventListener('click', () => {
    document.getElementById('donation-section').classList.remove('hidden');
    document.getElementById('history-section').classList.add('hidden');
    toggleActiveStatus('donation-tab', 'history-tab');
});

document.getElementById('history-tab').addEventListener('click', () => {
    document.getElementById('donation-section').classList.add('hidden');
    document.getElementById('history-section').classList.remove('hidden');
    toggleActiveStatus('history-tab', 'donation-tab');
});

function toggleActiveStatus(activeId, inactiveId) {
    document.getElementById(activeId).classList.add('active');
    document.getElementById(inactiveId).classList.remove('active');
}

function donate(card) {
    let inputField, donationAmountElem, donationAmount;

    if (card === 'noakhali') {
        inputField = document.getElementById('noakhaliInput');
        donationAmountElem = document.getElementById('noakhaliDonationAmount');
    } else if (card === 'feni') {
        inputField = document.getElementById('feniInput');
        donationAmountElem = document.getElementById('feniDonationAmount');
    } else if (card === 'quota') {
        inputField = document.getElementById('quotaInput');
        donationAmountElem = document.getElementById('quotaDonationAmount');
    }

    donationAmount = parseFloat(inputField.value);

    if (!validateDonation(donationAmount)) {
        alert('Invalid donation amount. Please check your input.');
        return;
    }

    // Update balance and donation amounts
    accountBalance -= donationAmount;
    donationAmountElem.innerText = parseFloat(donationAmountElem.innerText) + donationAmount + ' BDT';
    document.getElementById('accountBalance').innerText = accountBalance + ' BDT';

    // Log the donation history
    const logEntry = `Donated ${donationAmount} BDT for ${card.charAt(0).toUpperCase() + card.slice(1)} on ${new Date().toLocaleString()}`;
    historyLog.push(logEntry);
    updateHistory();

    // Clear the input field
    inputField.value = '';
}

function validateDonation(amount) {
    if (isNaN(amount) || amount <= 0 || amount > accountBalance) {
        return false; // Invalid amount
    }
    return true; // Valid amount
}

function updateHistory() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = ''; // Clear existing history

    historyLog.forEach(entry => {
        const entryElem = document.createElement('p');
        entryElem.innerText = entry;
        historyContainer.appendChild(entryElem);
    });
}
