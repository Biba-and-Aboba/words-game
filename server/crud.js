const {User, Status} = require("./db.js");
const {arrOut} = require('./array-sitys.js');

async function createUser (name) {
    const user = new User ({name});
    return await user.save();
}

async function getOnlineUsers(){
      const result= await User.find({});
      return result;
}

async function updateStatus (name, word){

    if (arrOut().indexOf(word) === -1) {
        return "INVALID_WORD";
    }

    // let currStatus;
    const status=await Status.findOne({});

    if(status === null) { 
        await Status.create({'currWord':word});
        return word;
    }

    else if (status.currWord === word || status.usedWords.indexOf(word) !== -1){
        return 'NOT_CHAINED_WORD';
    }

    else  if(status.currWord.substr(-1) !== word.substr(0,1).toLowerCase()){
        console.log(status.currWord);
        return 'USED_WORD';
    }        
    else{
        const condition= {'currWord':status.currWord}
        const query= {$set:{'currWord':word}, $push:{usedWords:status.currWord}};

        await Status.updateOne(condition,query)
        await User.updateOne({'name':name},{$inc:{score:1}});
        return word;
    }
}

async function removeUser(name) {
    const res = await User.deleteOne({name});
    return res;
}

async function getCurrentWord(name){
    const status = await Status.findOne({});
    if(status !== null) return status.currWord;

    const word = arrOut()[Math.floor(Math.random()*arrOut().length)];

    return updateStatus(name, word);
}

async function resetGame(){
    await User.deleteMany({});
    await Status.deleteMany({});
}

module.exports = {
    createUser,
    updateStatus,
    getOnlineUsers,
    removeUser,
    getCurrentWord,
    resetGame
}