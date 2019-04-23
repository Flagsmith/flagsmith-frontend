import { FBLoginManager } from 'react-native-facebook-login';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

const Facebook = {
    login: permissions => new Promise((resolve, reject) => {
        FBLoginManager.loginWithPermissions(permissions || ['email'], (error, data) => {
            if (!error) {
                resolve(data.credentials.token);
            } else {
                reject(error);
            }
        });
    }),
    logout: () => new Promise((resolve, reject) => {
        FBLoginManager.logout((error, data) => {
            if (!error) {
                resolve(true);
            } else {
                reject(error);
            }
        });
    }),
};

const Google = {
    configure: (options) => {
        GoogleSignin.configure(options);
    },
    login: () => new Promise((resolve, reject) => {
        GoogleSignin.signIn()
            .then((user) => {
                resolve(user.idToken);
            })
            .catch((err) => {
                reject(err);
            })
            .done();
    }),
    logout: () => new Promise((resolve, reject) => {
        GoogleSignin.signOut()
            .then(() => {
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            });
    }),
};

Google.configure(Project.google);

export default { Facebook, Google };
