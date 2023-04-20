import chalk from 'chalk';
import path from 'path';
import { forTime } from 'waitasecond';
import * as packageInfo from '../../../package.json';
import { deployedVersionGet } from './deployedVersionGet';
import { SSHClient } from './SSHClient';
import { uploadFilesToSsh } from './uploadFilesToSsh';
const currentVersion = packageInfo.version;

export async function deployApi(remote) {
    const remoteDir = path.join(remote.baseVersionsDir, currentVersion).split('\\').join('/');

    /**/
    // Note: Splitting into chunks because otherwise, the upload fails.
    for (const dirs of [['build', 'build-server', 'package.json', 'package-lock.json', 'ecosystem.config.js']]) {
        await uploadFilesToSsh(
            remote.credentials,
            path.join(/*TODO: Import only join*/ __dirname, '..', '..', '..'),
            remoteDir,
            dirs,
        );
    }
    /**/

    //------- Preparation
    const client = await new SSHClient(remote.credentials, remoteDir).connect();
    await client.exec(`npm ci`);

    //------- Preparation of launch command
    function createLaunchSequence(version) {
        return [
            `printf "\\033[1;34m 🔂  Launching Collboard ${version}\\033[0m"`,
            `cd ${path.join(remote.baseVersionsDir, version).split('\\').join('/')}`,
            `pm2 stop all`,
            `pm2 delete all`,
            `pm2 start ecosystem.config.js`,
            `pm2 save`,
            `rm -rf /var/www/collboard/cache-nginx`,
            `rm -rf /var/www/collboard/cache-nginx`,
            `mkdir /var/www/collboard/cache-nginx`,
            `service nginx restart` /* <- TODO: Probbably not nessesary */,
            `service mysql restart`,
            `pm2 restart all` /* <- TODO: Probbably not nessesary */,
            `printf "\\033[1;34m 🚀  Launshed Collboard ${version}\\033[0m"`,
        ];
    }

    async function setupSystemAlias(alias, commands) {
        console.info(chalk.magenta(`Setting up alias `) + chalk.bgMagenta(alias));

        const aliasPath = path.join(remote.baseVersionsDir, `${alias}.sh`).split('\\').join('/');
        await client.exec(
            `echo "#!/bin/bash\n\n${commands.join('\n').split("'").join("\\'").split('"').join('\\"')}" > ${aliasPath}`,
        );
        await client.exec(`chmod 777 ${aliasPath}`);
        // Note: Not need the line below because /var/www/collboard is in $PATH
        // > await client.exec(`echo "alias ${alias}='${aliasPath}'" >> /etc/bash.bashrc`);

        return aliasPath;
    }

    const lastVersion = await deployedVersionGet(remote);

    await setupSystemAlias('collboard-start-last', createLaunchSequence(lastVersion));

    const explicitCurrentStartPath = await setupSystemAlias(
        `collboard-start-${currentVersion.split('.').join('-')}`,
        createLaunchSequence(currentVersion),
    );
    const currentStartPath = await setupSystemAlias('collboard-start-current', [explicitCurrentStartPath]);

    // TODO: Better name than collback
    //     > await setupSystemAlias('collback', createLaunchSequence(lastVersion));
    //-------

    //------- Launch
    await client.exec(currentStartPath);
    await forTime(3000 /* to everything settle up */);
    //-------

    /**/
    client.dispose();
    /**/
}
