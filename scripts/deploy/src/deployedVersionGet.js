import * as packageInfo from '../../../package.json';
import { fetchJsonRetry } from './fetchJsonRetry';

export async function deployedVersionGet(remote) {
    if (!remote.versionUrl) {
        console.warn(`"${remote.name}" has no configuration for deploy check - please add there versionUrl key. `);
        return;
    }

    try {
        const about = await fetchJsonRetry(remote.versionUrl);
        return about.version;
    } catch (error) {
        throw new Error(`There is some problem with deploy, please check ${remote.versionUrl} . ${error.message}`);
    }
}
