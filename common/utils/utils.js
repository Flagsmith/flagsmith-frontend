module.exports = Object.assign({}, require('./base/_utils'), {
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    getFlagValue(projectFlag, environmentFlag, identityFlag) {
        if (!environmentFlag) {
            return {
                name: projectFlag.name,
                type: projectFlag.type,
                feature_state_value: projectFlag.initial_value,
                tags: projectFlag.tags,
                enabled: false,
                hide_from_client: false,
                description: projectFlag.description,
            };
        }
        if (identityFlag) {
            return {
                type: projectFlag.type,
                name: projectFlag.name,
                feature_state_value: identityFlag.feature_state_value,
                hide_from_client: environmentFlag.hide_from_client,
                enabled: identityFlag.enabled,
                description: projectFlag.description,
            };
        }
        return {
            type: projectFlag.type,
            name: projectFlag.name,
            tags: projectFlag.tags,
            hide_from_client: environmentFlag.hide_from_client,
            feature_state_value: environmentFlag.feature_state_value,
            enabled: environmentFlag.enabled,
            description: projectFlag.description,
        };
    },

    getTypedValue(str) {
        if (typeof str !== 'string') {
            return str;
        }

        const isNum = /^\d+$/.test(str);

        if (str == 'true') {
            return true;
        }
        if (str == 'false') {
            return false;
        }

        if (isNum) {
            if (str.indexOf('.') != -1) {
                return parseFloat(str);
            }
            return parseInt(str);
        }

        return str;
    },

    scrollToTop: (timeout = 500) => {
        $('html,body').animate({ scrollTop: 0 }, timeout);
    },

    scrollToElement: (selector, timeout = 500) => {
        const el = $(selector);
        if (!el || !el.offset) return;
        $('html,body').animate({ scrollTop: el.offset().top }, timeout);
    },

    scrollToSignUp: () => {
        Utils.scrollToElement('.signup-form');
    },

    getPlansPermission: (plans, permission) => {
        if (!plans || !plans.length) {
            return false;
        }
        const found = _.find(
            plans.map(plan => Utils.getPlanPermission(plan, permission)),
            perm => !!perm,
        );
        return !!found;
    },
    getPlanPermission: (plan, permission) => {
        let valid = true;
        if (!plan) {
            return false;
        }
        const date = AccountStore.getDate();
        const cutOff = moment('03-11-20', 'DD-MM-YY');
        if (date && moment(date).valueOf() < cutOff.valueOf()) {
            return true;
        }
        switch (permission) {
            case '2FA': {
                valid = !plan.includes('side-project');
                break;
            }
            case 'RBAC': {
                valid = !plan.includes('side-project');
                break;
            }
            case 'AUDIT': {
                valid = !plan.includes('side-project') && !plan.includes('startup');
                break;
            }
            default:
                valid = true;
                break;
        }
        return valid;
    },

    getPlanName: (plan) => {
        switch (plan) {
            case 'side-project':
            case 'side-project-annual':
                return 'Side Project';
            case 'startup':
            case 'startup-annual':
            case 'startup-v2':
            case 'startup-v2-annual':
                return 'Startup';
            case 'scale-up':
            case 'scale-up-annual':
            case 'scale-up-v2':
            case 'scale-up-v2-annual':
                return 'Scale-Up';
            case 'enterprise':
            case 'enterprise-annual':
                return 'Enterprise';
            default:
                return 'Free';
        }
    },
});
