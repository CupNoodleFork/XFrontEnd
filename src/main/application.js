/**
 * @file $INfO$
 * @author zhangchaowei
 * @copyright QiYu Times Technology Ltd.
 * 2017/6/21
 * $END$
 */
import fs from 'fs';
import path from 'path';
import {exec} from 'child_process';

const detectApplicationList = [
    {
        name: 'webstorm',
        appName: {
            darwin: 'WebStorm.app'
        },
        detected: false,
        path: '',
        shell: {
            darwin: 'open -a "${appPath}" ${directory}'
        }
    },
    {
        name: 'xcode',
        appName: {
            darwin: 'Xcode.app'
        },
        detected: false,
        path: '',
        shell: {
            darwin: 'open -a "${appPath}" ${directory}'
        }
    },
    {
        name: 'vscode',
        appName: {
            darwin: 'Visual Studio Code.app'
        },
        detected: false,
        path: '',
        shell: {
            darwin: 'open -a "${appPath}" ${directory}'
        }
    },
    {
        name: 'sublime',
        appName: {
            darwin: 'Sublime Text.app'
        },
        detected: false,
        path: '',
        shell: {
            darwin: 'open -a "${appPath}" ${directory}'
        }
    },
];

function detectApplication() {
    detectApplicationList.forEach((application) => {
        switch (process.platform) {
            case 'darwin':
                const appPath = path.resolve('/Applications', application.appName[process.platform]);

                if (fs.existsSync(appPath)) {
                    application.detected = true;
                    application.path = appPath;
                }
                break;
            case 'win32':
                break;
            default:
                break;
        }
    });
}

function openFinder(openPath) {
    switch (process.platform) {
        case 'darwin':

            break;
        case '':
            break;
        default:
            break;
    }
}

function openApplication(appName, directory) {
    return new Promise((resolve,reject) => {
        const application = detectApplicationList.find((app) => {
            return app.name === appName;
        });

        if (!application) {
            reject('不合法的应用名');
        } else {
            if (!application.detected) {
                reject('未找到该应用');
            } else {

                const shell = application.shell[process.platform];
                let commond = shell.replace('${appPath}', application.path);
                commond = commond.replace('${directory}', directory);

                console.log(commond);

                exec(commond, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve();
                });
            }
        }
    });

}

export {
    openFinder,
    openApplication,
    detectApplication
};