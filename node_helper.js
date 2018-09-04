var NodeHelper = require('node_helper');
module.exports=NodeHelper.create({
	start: function () {
		console.log('Garage Door Status module loaded!')
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification==='get_ticker') {
			this.checkDoor(payload)
		}
		if (notification === 'CONFIG') {
			this.config=payload;
		}
	},

	checkDoor: function (url,payload) {
		const self=this;
		var request=require("request");
		request(url,function(err,res,body) {
			//console.log(body);
			self.sendSocketNotification('got_result',body)
		});
  	}
})
