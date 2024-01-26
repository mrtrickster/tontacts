function init() {
    webApp = window.Telegram.WebApp;
    if (webApp != null) {
        webApp.expand();
        getContacts();
    }
}

function getContacts() {
    log("Get stored keys");
    var request = webApp.CloudStorage.getKeys(onStoredKeys);
}

function onStoredKeys(error, value) {
    if (!error) {
        log("stored " + value.length + " keys");
        if (value.length == 0) {
            log("no keys found, it's time to create first contact - yourself!");
            showNewContactScreen(true);
        } else {
            //log(value.length + " keys found, display contacts list");
            log(value);
            showContactsListScreen(value);
        }
    } else {
        log(error);
    }
}

function showNewContactScreen(yourself) {
    switchDiv('newContactScreen');
    if (yourself) {
        document.getElementById("firstName").value = webApp.initDataUnsafe.user.first_name;
        document.getElementById("lastName").value = webApp.initDataUnsafe.user.last_name;
    }
}

function showContactsListScreen(items) {
    log("showContactsListScreen");
    switchDiv('contactsListScreen');
    items.forEach(getContact);
}

function getContact(key, index, arr) {
    log("Get stored key: " + key);
    var request = webApp.CloudStorage.getItem(key, onStoredKey);
}

function onStoredKey(error, value) {
    if (!error) {
        if (value.length == 0) {
            log("no key found");
        } else {
            createContactListItem(value);
        }
    } else {
        log(error);
    }
}

function createContactListItem(value) {
    log("createContactListItem: " + value);
    var source = document.querySelector('#sampleCard');
    var clone = source.cloneNode(true);
    source.after(clone);
    clone.style.display = 'block';
    source.style.display = 'none';
    var item = JSON.parse(value);
    clone.getElementsByClassName('username')[0].innerHTML = item.firstName + " " + item.lastName;
}

  //

function saveNewContact() {
    var newKey = makeId(64);
    var newValue = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value
    };
    webApp.CloudStorage.setItem(newKey, JSON.stringify(newValue));
}

function switchDiv(targetDivId) {
    // Hide all divs
    var allDivs = document.getElementsByClassName('switchableDiv');
    for (var i = 0; i < allDivs.length; i++) {
        allDivs[i].style.display = 'none';
    }
    // Show the target div
    var targetDiv = document.getElementById(targetDivId);
    if (targetDiv) {
        targetDiv.style.display = 'block';
    }
}

function log(message) {
    console.log(message);
    alert(message);
    //debugText.text += message + "\n";
}

function makeId(length) {
    let result = 'id_';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}