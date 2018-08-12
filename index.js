module.exports = {
	fetchData( dataUrl, start ) {
		return new Promise((resolve, reject) => {
			fetch(`${dataUrl}/data${(start+ 0 + '').padStart(2, '0')}.json`)
				.then((data) => {
					resolve(data.json());
				}, (error) => {
					reject(error);
				})
		});

	},
	async getData( dataUrl, start ) {

		const _self = this;
		let data = await _self.fetchData( dataUrl, start );
		return data;

	},
	receiveData( dataUrl, start ) {
		const _self = this;
		let data = {};

		_self.getData('virtual/result', 2).then(
			function(responseThenData) {
				data = responseThenData;
			})
			.then(function() {
				//console.log('abc')
			})
			.catch(function(e) {
				console.log("promise, error =", e);
			});

		return data;
	},

	post(url, formData, headers) {
	return new Promise(function (resolve, reject) {
		fetch(url, {
			method: 'POST',
			headers: headers,
			body:formData,
			mode: 'cors',
			credentials: 'include'
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					reject({status:response.status})
				}
			})
			.then((response) => {
				resolve(response);
			})
			.catch((err)=> {
				reject({status:-1});
			})
	}),

	post: async function(url, headers, postBody) {
		const _self = this;
		var response = [];
		try {
			const response = await fetch(url, {
				method: 'POST',
				body: postBody,
				headers: headers,
				mode: 'cors',
				credentials: 'include'
			})
			return await response.json();

		} catch (e) {
			console.log("Oops, error", e)
		}
	},

	get: async function(url, headers, postBody) {
		const _self = this;
		var response = [];
		try {
			const response = await fetch(url, {
				method: 'GET',
				body: postBody,
				headers: headers,
				mode: 'cors',
				credentials: 'include'
			})
			return await response.json();

		} catch (e) {
			console.log("Oops, error", e)
		}
	}
}