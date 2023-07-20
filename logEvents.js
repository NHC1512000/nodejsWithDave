const { format } = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    let dateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
    let logItem = `${dateTime}\t${message}`;
    console.log(logItem);
    try {
        
    }catch(e) {
        console.error(e);
    }
}
console.log();