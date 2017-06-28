/**
 * @file $INfO$
 * @author zhangchaowei
 * @copyright QiYu Times Technology Ltd.
 * 2017/6/21
 * $END$
 */

import fs from 'fs';
import path from 'path';
import defaultConfig from './defaultConfig.json'

let _isCacheDirectoryExist = undefined;
let _cacheHome = '';
const VERSION = require('../../package.json').version;
const PROJECT_NAME = require('../../package.json').name;
let USERNAME = 'customer';
const userConfig = {};
let configPromise = null;

const _cacheTree = [
    {
        path: 'userData',
        children: [
            {
                path: 'userData/customer'
            }
        ]
    },
    {
        path: 'system',
        children: [
            {
                path: 'system/config'
            }
        ]
    }
];

function cacheDirectoryExist(directoryPath) {
    if (_isCacheDirectoryExist === undefined) {
        _isCacheDirectoryExist = fs.existsSync(directoryPath);
        return _isCacheDirectoryExist;
    } else {
        return _isCacheDirectoryExist;
    }
}

function _makeCacheDirectoryTree(tree) {
    tree.forEach((dir, index) => {
        const dirPath = path.resolve(_cacheHome, dir.path);

        try {
            fs.mkdirSync(dirPath, 0o755);
            console.log(`Make Directory success ${dirPath}`);
        } catch (error) {
            console.log(`Directory exist ${dirPath}`);
        }

        if (dir.children) {
            _makeCacheDirectoryTree(dir.children);
        }
    });
}

function detectCacheDirectory() {
    return new Promise((resolve, reject) => {
        if (process.platform === 'darwin') {
            const directoryPath = path.resolve(process.env.HOME, 'Library', 'Application Support', PROJECT_NAME);
            if (cacheDirectoryExist(directoryPath)) {
                console.log('Find cache directory duccess');
                _cacheHome = directoryPath;
                _writeSystemVersion();
                resolve();
            } else {
                console.log('Not find cache directory, to make it ...');
                fs.mkdir(directoryPath, 0o755, (err, result) => {
                    if (err) {
                        reject();
                        throw err;
                    }
                    console.log('Make cache directory success');
                    _cacheHome = directoryPath;
                    console.log('Make cache directory tree ...');
                    _makeCacheDirectoryTree(_cacheTree);
                    _writeSystemVersion();
                    resolve();
                })
            }
        }
    });
}

function _writeSystemVersion() {
    return new Promise((resolve, reject) => {
        const versionFilePath = path.resolve(_cacheHome, 'system/config/version');

        fs.writeFile(versionFilePath, VERSION, {
            encoding: 'utf8'
        }, (err) => {
            if (err) {
                reject();
                throw err;
            }
            console.log('Write version success');
            resolve();
        });
    });
}

function setUserName(name) {
    USERNAME = name;
}

function makeUserDataDirectory() {
    return new Promise((resolve, reject) => {
        const userDataPath = path.resolve(_cacheHome, 'userData', `${USERNAME}`);
        if (!fs.existsSync(userDataPath)) {
            fs.mkdir(userDataPath, 0o755, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        } else {
            resolve();
        }
    });
}

function getUserConfig() {
    if (configPromise === null) {
        configPromise = new Promise((resolve, reject) => {
            const userConfigJsonPath = path.resolve(_cacheHome, 'userData', `${USERNAME}`, 'config.json');
            if (fs.existsSync(userConfigJsonPath)) {
                fs.readFile(userConfigJsonPath,{
                    encoding: 'utf8'
                }, (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let config = {};
                    try {
                        config = JSON.parse(data.toString());

                        Object.assign(userConfig, config);

                        resolve(config);
                    } catch (e) {
                        reject(e);
                    }
                });
            } else {
                _writeUserConfig(userConfigJsonPath, defaultConfig).then(() => {
                    resolve();

                    Object.assign(userConfig, defaultConfig);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }

    return configPromise;
}

function _writeUserConfig(userConfigJsonPath, config) {
    return new Promise((resolve, reject) => {
        fs.writeFile(userConfigJsonPath, JSON.stringify(config), {
            encoding: 'utf8'
        }, (err) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(`Create user config.json in ${userConfigJsonPath}`);
            resolve([]);
        });
    });
}

function getUserProjectList() {
    return new Promise((resolve, reject) => {
        configPromise.then(() => {
            resolve(userConfig.projectList);
        }).catch(() => {
            reject()
        });
    });
}


function addUserProject(project) {
    const userConfigJsonPath = path.resolve(_cacheHome, 'userData', `${USERNAME}`, 'config.json');
    const projectObject = Object.assign({}, project, {
        id: new Date().getTime()
    });

    userConfig.projectList.push(projectObject);

    _writeUserConfig(userConfigJsonPath, userConfig);

    console.log(projectObject);
    return {
        projectList: userConfig.projectList,
        project: projectObject
    };
}

function deleteUserProject(id) {
    userConfig.projectList = userConfig.projectList.filter((project) => {
        return project.id !== id;
    });

    return userConfig.projectList;
}

function getProjectReadMeMarkDownFile(projectPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(projectPath), (err, files) => {
            if (err) {
                reject();
                return;
            }

            const readMeMarkDownFile = files.find((file) => {
                return file.toLowerCase() === 'readme.md';
            });

            if (readMeMarkDownFile !== undefined) {
                fs.readFile(path.resolve(projectPath, readMeMarkDownFile), (err, data) => {
                    if (err) {
                        reject();
                        return;
                    }
                    resolve(data.toString());
                });
            } else {
                resolve();
            }
        });
    });
}

function cleanLoginUserInfo() {
    configPromise = null;
}

export {
    detectCacheDirectory,
    cacheDirectoryExist,
    setUserName,
    getUserProjectList,
    addUserProject,
    deleteUserProject,
    getProjectReadMeMarkDownFile,
    getUserConfig,
    makeUserDataDirectory,
    cleanLoginUserInfo
};