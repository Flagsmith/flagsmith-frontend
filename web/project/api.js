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
    log() {
        console.log.apply(this,arguments)
    }
};