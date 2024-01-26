function showContactsListScreen() {
    window.open("contacts-list.html", "_self");
}

function showNewContactScreen(yourself) {
    window.open("new-contact.html?yourself=" + yourself, "_self");
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