global.API = {
    ajaxHandler: function (store, res) {
        switch (res.status) {
            case 404:
                // ErrorModal(null, 'API Not found: ');
                break;
            case 503:
                // ErrorModal(null, error);
                break;
            default:
            // ErrorModal(null, error);
        }

        res.json().then(error => {
            if (store) {
                store.error = error;
                store.goneABitWest();
            }
        }).catch((e) => {
            // TODO?
        });
    },
    trackEvent: function(data) {
        if (Project.ga) {
            console.info("track", data);
            if (!data || !data.category || !data.event) {
                console.error("Invalid event provided", data);
            }
            ga('send', {
                hitType: 'event',
                eventCategory: data.category,
                eventAction: data.event,
                eventLabel: data.label
            });
        }

    },
    trackPage: function(title) {
        if (Project.ga) {
            ga('send', {
                hitType: 'pageview',
                title,
                location: document.location.href,
                page: document.location.pathname
            });
        }
    },
    log() {
        console.log.apply(this,arguments)
    }
};