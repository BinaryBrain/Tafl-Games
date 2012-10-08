Network = {
	clients: []
	
	send: function(dest, data) {
		
	},

	broadcast: function(data) {
		for(dest in clients) {
			send(dest, data);
		} 
	}
}
