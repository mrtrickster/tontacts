const version = "0.1.44";

const gendersList = { "": "", "m": "Male", "f": "Female", "x": "Other" };
const countriesList = { "": "", "ru": "Russia", "th": "Thailand", "us": "USA", "ua": "Ukraine" };
const nationalitiesList = { "": "", "ru": "Russian", "th": "Thai", "us": "US", "ua": "Ukrainian" };

var debugText;

function showContactsListScreen() {
    window.open("contacts-list.html?cache=" + makeId(4), "_self");
}

function showNewContactScreen(yourself) {
    window.open("new-contact.html?cache=" + makeId(4) + "&yourself=" + yourself, "_self");
}

function showViewContactScreen(key) {
    log("viewing contact " + key);
    window.open("view-contact.html?cache=" + makeId(4) + "&key=" + key, "_self");
}

function showEditContactScreen(key) {
    log("editing contact " + key);
    window.open("edit-contact.html?cache=" + makeId(4) + "&key=" + key, "_self");
}

function assignInnerHTML(item, key) {
    document.getElementById(key).innerHTML = item[key] !== undefined ? item[key] : "";
}

function assignValue(item, key) {
    document.getElementById(key).value = item[key] !== undefined ? item[key] : "";
}

function log(message) {
    console.log(message);
    //alert(message);
    if (debugText) {
        debugText.innerHTML += message + "<br/>";
    }
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