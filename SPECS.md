Socket.io events
================
Server->Client
--------------
brodcasted

new-player:	Un nouveau joueur s'est connecté
lost-player:	Un joueur s'est déconnecté

unicasted
play:		Le joueur a effecté un mouvement
error:		Envoie une erreur au joueur (mouvement impossible, etc.)

Client->Server
--------------
play: 		Dès qu'un joueur effectue une action quelconque (précisée par datagram.type)
set-name:	Quand un joueur a choisi son nom de joueur. params: { name: "Nom" }
