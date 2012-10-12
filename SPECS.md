Socket.io events
================
Server->Client
--------------
new-player:	Un nouveau joueur s'est connecté
lost-player:	Un joueur s'est déconnecté

Client->Server
--------------
play: 		Dès qu'un joueur effectue une action quelconque (précisée par datagram.type)
connection: 	Dès qu'un utilisateur se connecte
