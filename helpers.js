function successfullMessage(msg) {
    return "β *WhatsXscr*:  ```" + msg + "```"
}
function errorMessage(msg) {
    return "π *WhatsXscr*:  ```" + msg + "```"
}
function infoMessage(msg) {
    return "βΊοΈ *WhatsXscr*:  ```" + msg + "```"
}


module.exports = {
    successfullMessage,
    errorMessage,
    infoMessage
}