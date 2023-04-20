import * as packageInfo from '../../../package.json';
import { deployedVersionGet } from './deployedVersionGet';

const version = packageInfo.version;

export async function deployedVersionCheck(remote) {
    const deployedVersion = await deployedVersionGet(remote);

    if (deployedVersion !== version) {
        throw new Error(`Versions are not matching deployed=${deployedVersion}, expected=${version}.`);
    }
}
