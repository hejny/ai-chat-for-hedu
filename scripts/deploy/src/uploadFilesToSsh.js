import fs from 'fs';
import glob from 'glob-promise';
import path from 'path';
import PromiseSftp from 'promise-sftp';
import { chunkArray } from './chunkArray';
import { sshMkdirRecursive } from './sshMkdirRecursive';

const UPLOAD_IN_PARALEL = true;
const FILES_IN_UPLOAD_CHUNK = 100;

export async function uploadFilesToSsh(sshCredentials, localDir, remoteDir, onlyFiles = null) {
    //console.info(path.join/*TODO: Import only join*/(localDir,onlyFiles[0]));
    const client = new PromiseSftp();
    await client.connect(sshCredentials);

    const localFiles = (await glob(localDir + `/{,!(node_modules)/**/}*`))
        .filter((file) => fs.statSync(file).isFile())
        .map((file) => {
            //console.info('file',file)
            return file;
        })
        .filter((file) => {
            if (onlyFiles) {
                return onlyFiles.some((onlyFile) =>
                    path
                        .join(/*TODO: Import only join*/ file)
                        .includes(path.join(/*TODO: Import only join*/ localDir, onlyFile)),
                );
            } else {
                return true;
            }
        })
        .map((file) => path.normalize(file));
    const files = localFiles.map((localFile) => {
        const remoteFile = localFile.replace(localDir, remoteDir).split('\\').join('/');

        return {
            localFile,
            remoteFile,
        };
    });

    const remoteDirs = files.map(({ remoteFile }) => path.dirname(remoteFile)).filter((v, i, a) => a.indexOf(v) === i);

    console.info(`Creating directory structure.`);
    const listsCache = {};
    for (const remoteDir of remoteDirs) {
        await sshMkdirRecursive(client, remoteDir, listsCache);
    }
    console.info(`Directory structure created.`);

    console.info(`Uploading files.`);
    if (UPLOAD_IN_PARALEL) {
        const chunks = chunkArray(files, FILES_IN_UPLOAD_CHUNK);
        for (const chunk of chunks) {
            console.info(`Uploading ${chunk.length} files chunk.`);
            await Promise.all(
                chunk.map(async ({ localFile, remoteFile }) => {
                    try {
                        await client.fastPut(localFile, remoteFile);
                    } catch (error) {
                        console.error(`Error when uploading file "${remoteFile}"`);
                        throw error;
                    }
                }),
            );
        }
    } else {
        for (const { localFile, remoteFile } of files) {
            console.info('-----');
            console.info(`Uploading file "${remoteFile}"...`);
            console.info('localFile', localFile);
            console.info('remoteFile', remoteFile);

            try {
                await client.fastPut(localFile, remoteFile);
                console.info(`Uploaded file "${remoteFile}".`);
            } catch (error) {
                console.error(`Error when uploading file "${remoteFile}"`);
                throw error;
            }
        }
    }
    console.info(`Files uploaded.`);

    /*
    for (const localFile of ) {
        const remoteFile = localFile
            .replace(localDir, remoteDir)
            .split('\\')
            .join('/');

  
        console.info(`Uploading file "${remoteFile}"...`);
        //console.info('localFile', localFile);
        //console.info('remoteFile', remoteFile);
        //console.info('-----');

        await sshMkdirRecursive(client, path.dirname(remoteFile));
        //await client.fastPut(localFile, remoteFile);
    }
    */

    await client.end();
    console.info(`Uploading finished!`);
}
