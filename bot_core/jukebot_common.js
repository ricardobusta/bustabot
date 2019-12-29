module.exports = {
    docName: "data_",
    ValidUser: function (userName) {
        return userName.startsWith("@");
    }
}