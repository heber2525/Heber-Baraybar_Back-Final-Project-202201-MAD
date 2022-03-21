import moongose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export async function mongoConnect() {
    const userName = process.env.DBUSER;
    const password = process.env.DBPASSW;
    const dbName = process.env.DBNAME;

    const uri = `mongodb+srv://${userName}:${password}@cluster0.zsntb.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    const mongooseConnect = await moongose.connect(uri);

    return mongooseConnect;
}
