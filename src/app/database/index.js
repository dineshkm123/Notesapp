import mongoose from "mongoose";
const connecttodb = async () => {
    const dburl = 'mongodb+srv://data:dinesh@atlascluster.jwuyykx.mongodb.net/notesapp'
    mongoose.connect(dburl)
        .then(() => console.log("database connection successfull"))
        .catch((e) => console.log(e));


}

export default connecttodb;