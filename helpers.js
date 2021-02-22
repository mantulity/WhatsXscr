function successfullMessage(msg) {
    return "✅ *WhatsXscr*:  ```" + msg + "```"
}
function errorMessage(msg) {
    return "🛑 *WhatsXscr*:  ```" + msg + "```"
}
function infoMessage(msg) {
    return "⏺️ *WhatsXscr*:  ```" + msg + "```"
}


module.exports = {
    successfullMessage,
    errorMessage,
    infoMessage
}