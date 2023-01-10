const Craving = require('./collections/craving');
console.log("Hello")
Craving.insertMany([
    {name: "Mexican"},
    {name: "Italian"},
    {name: "Japanese"},
    {name: "Chinese"}
]).then(function() {
    console.log("Cravings inserted")
}).catch(function(error) {
    throw error
});