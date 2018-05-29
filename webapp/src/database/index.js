import Dexie from 'dexie';
import database from './entities.json';

async function InsertFirst(db, database){
    let isLoaded = await db.loaded.toArray();

    if(!isLoaded || !isLoaded.length){
        for(let modelName in database){
            let data = database[modelName];
            for(let obj of data){
                await db[modelName].add(obj);
            }
        }
        await db.loaded.add({ insertedAt: new Date() })
    }
}

if(!window.DB){
    const db = new Dexie('NativApps');

    db.version('1').stores({
        aluno: '++DATABASE_ID',
        professor: '++DATABASE_ID',
        curso: '++DATABASE_ID',
        loaded: '++DATABASE_ID'
    });

    db.open();

    InsertFirst(db, database);
    window.DB = db;

}



export default window.DB;
