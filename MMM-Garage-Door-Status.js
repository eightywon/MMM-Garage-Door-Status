Module.register("MMM-Garage-Door-Status", {
	start: function() {
		var self=this;
		this.sendSocketNotification('CONFIG',this.config);
		setInterval(function() {
			self.getTicker();
		}, 10000)
		this.getTicker();
	},

	getDom: function() {
	        var data = this.result
		if (data) {
			var wrapper=document.createElement('table')
			var trWrapper=document.createElement('tr')
			var tdWrapper=document.createElement('td')
			tdWrapper.innerHTML="Garage: "
			trWrapper.appendChild(tdWrapper)

			var tdWrapper=document.createElement('td')
			if (data==='CLOSED') {
				tdWrapper.className='closed'
			} else {
				tdWrapper.className='open'
			}
			tdWrapper.innerHTML=data
			trWrapper.appendChild(tdWrapper)
			wrapper.appendChild(trWrapper)
			return wrapper
		}
	},

	getTicker: function() {
		var url='http://garage/query.php'
		this.sendSocketNotification('get_ticker',url)
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification==='got_result') {
			this.result=payload
			if (payload!='undefined') {
				this.updateDom()
			}
		}
	},

 	getStyles: function() {
		return ['MMM-Garage-Door-Status.css']
	},
})
