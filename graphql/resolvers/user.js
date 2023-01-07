const User = require('../../collections/user');

module.exports = {
    createUser: async args => {
        try {
            const user = await User.create({
                name: args.userInput.name,
                zipcode: args.userInput.zipcode,
                cravings: args.userInput.cravings
            })
            return user 
        } catch (err) {
            throw err;
        }
    }
}