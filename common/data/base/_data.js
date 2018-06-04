const getQueryString = (params) => {
	var esc = encodeURIComponent;
	return Object.keys(params)
		.map(k => `${esc(k)}=${esc(params[k])}`)
		.join('&');
}

module.exports = {
	token: '',
	type: '',

	status: function (response) { //handle ajax requests
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response);
		} else {
			if (response.status == 401) {
				AppActions.setUser(null);
			}
			response.clone().text() // cloned so response body can be used downstream
				.then((err) => {
					API.log(response.url, response.status, err);
				});
			return Promise.reject(response);
		}
	},

	get: function (url, data) {
		return this._request('get', url, data || null);
	},

	dummy: function (data) {
		return function () {
			return new Promise(function (resolve) {
				resolve(data);
			});
		};
	},

	put: function (url, data) {
		return this._request('put', url, data);
	},

	post: function (url, data) {
		return this._request('post', url, data);
	},

	delete: function (url, data) {
		return this._request('delete', url, data);
	},

	_request: function (method, url, data) {
		var options = {
				timeout: 60000,
				method: method,
				headers: {
					'Accept': 'application/json',
				}
			},
			req,
			qs = '';

		if (method != "get")
			options.headers['Content-Type'] = 'application/json; charset=utf-8'

		if (this.token) { //add auth tokens to headers of all requests
			options.headers['AUTHORIZATION'] = `Token ${this.token}`;
		}

		if (data) {
			if (method == 'get') {
				var qs = getQueryString(data);
				url += url.indexOf('?') !== -1 ? '&' + qs : '?' + qs;
			} else {
				options.body = JSON.stringify(data);
			}
		} else if (method == "post" || method == "put") {
			options.body = "{}";
		}

		req = fetch(url, options);
		return req
			.then(this.status)
			.then(function (response) { //always return json
				var contentType = response.headers.get("content-type");
				if (!contentType) {
					contentType = response.headers.get('Content-Type');
				}
				if (contentType && contentType.indexOf("application/json") !== -1) {
					return response.json();
				} else {
					return {};
				}
			})
			.then(function (response) {
				API.log(url, 200, response);
				return response;
			});

	},

	setToken: function (_token) {//set the token for future requests
		this.token = _token;
	}
};
