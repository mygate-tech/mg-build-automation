/**
 * Copyright 2020 MyGate™

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 */

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', (req, res)=>{return res.status(200).send({message:"Librarian bridge API is live!"})});
app.post('/api/librarian', async (req, res) => {
    console.log(req.body);
    let requestBody = req.body;
    let s3ObjectUrl = requestBody.url;
    let uploadNotes = requestBody.uploadNotes;
    let branchName = requestBody.branchName;
    try{
        let s3FileName = s3ObjectUrl.split('/');
        s3FileName = s3FileName[s3FileName.length - 1];
        const writer = fs.createWriteStream(s3FileName)

        const response = await axios({
            url: s3ObjectUrl,
            method: 'GET',
            responseType: 'stream'
        });
        response.data.pipe(writer);
        writer.on('error', (err)=>{
            console.log('error : ', err);
            return res.status(500).send(err);
        });
        writer.on('finish', async (data) => {
            let librarianUploadCommand = `librarian submit './${s3FileName}' -n '${uploadNotes}' -b '${branchName}' --public`;
            try{
                const { stdout, stderr } = await exec(librarianUploadCommand);
                if(stderr){
                    if(stderr.indexOf('bad formatting') > -1){return res.status(200).send({message:s3FileName, command:librarianUploadCommand});}
                    return res.status(500).send(stderr);
                }
                fs.unlink(s3FileName, ()=>{});
                return res.status(200).send({message:s3FileName, command:librarianUploadCommand});
            } catch(e){
                console.log(e);
            }
        });
    } catch(e){
        console.log('error caught', e);
        return res.status(500).send({message:e.stack});
    }
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!')
});
app.listen(3000, () => {
    console.log('listening on %d', 3000);
});

module.exports = app;