module.exports = Object.assign({}, require('./base/_utils'), {
    getFlagValue: function (projectFlag, environmentFlag, identityFlag) {
        if (!environmentFlag) {
            return {
                name: projectFlag.name,
                type: projectFlag.type,
                feature_state_value: projectFlag.initial_value,
                enabled: false,
                description: projectFlag.description,
            }
        } else if (identityFlag) {
            return {
                type: projectFlag.type,
                name: projectFlag.name,
                feature_state_value: identityFlag.feature_state_value,
                enabled: identityFlag.enabled,
                description: projectFlag.description,
            }
        }
        else {
            return {
                type: projectFlag.type,
                name: projectFlag.name,
                feature_state_value: environmentFlag.feature_state_value,
                enabled: environmentFlag.enabled,
                description: projectFlag.description,
            }
        }
    },

    getTypedValue: function (str) {

        if (typeof str != "string") {
            return str
        }

        const isNum = /^\d+$/.test(str);

        if (str == "true") {
            return true;
        } else if (str == "false") {
            return false;
        }

        if (isNum) {
            if (str.indexOf(".") != -1) {
                return parseFloat(str);
            } else {
                return parseInt(str);
            }
        }

        return str;
    },

    scrollToTop: (timeout = 500) => {
        $('html,body').animate({scrollTop: 0}, timeout);
    },

    scrollToElement: (selector, timeout = 500) => {
        $('html,body').animate({scrollTop: $(selector).offset().top}, timeout);
    },

    freeTrialDaysRemaining: (subscriptionDate) => {
        return moment(subscriptionDate).add('30', 'd').endOf('d').diff(moment(), 'd');
    }
});
