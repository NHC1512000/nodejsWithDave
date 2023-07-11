const fsPromises = require('fs').promises;
const path = require('path');

const fileOpen = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n hello darling');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseWriteComplete.txt'));
        let dataWrite = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseWriteComplete.txt'), 'utf-8');
        console.log(dataWrite);
    }catch(e) {
        console.error(e);
    }
}

fileOpen();

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data.toString());
// })

// fs.writeFile(path.join(__dirname, 'files','reply.txt'), 'hello world', (err) => {
//     if(err) throw err;
//     console.log('write successful');
// })