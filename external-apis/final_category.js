// takes in an alias dictionary that keeps count of how many alias are selected
// will return the alias with the largest number and if there are multiple alias
// will randomly select one
module.exports = function finalCategory(alias_dictionary) {
    let maxCount = 0;
    let maxAliases = []
    for (let alias in alias_dictionary) {
        if(alias_dictionary[alias] > maxCount) {
            maxCount = alias_dictionary[alias];
            maxAliases = [alias];
        } else if (alias_dictionary[alias] === maxCount){
            maxAliases.push(alias);
        }
    }
    if (maxAliases.length === 1){
        return maxAliases[0];
    } else {
        return maxAliases[Math.floor(Math.random() * maxAliases.length)];
    }
}

// const ex_dict = {
//     "mexican": 3,
//     "japanese": 3,
//     "american": 4,
//     "italian": 2
// }

// const ex_dict2 = {
//     "hamburger": 1,
//     "hotdog": 1,
//     "bars/cocktail": 1
// }

// console.log(finalCategory(ex_dict))
// console.log(finalCategory(ex_dict2))