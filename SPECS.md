Socket.io events
================
Server->Client
--------------
brodcasted

`new-player`:		Un nouveau joueur s'est connecté. params: `{ pid: pid, name: name }`
`lost-player`:		Un joueur s'est déconnecté. params: `{ pid: pid }`
`new-group`:		Un nouveau groupe est créer. params: `{ players: [leaderID, pid], gid: gid }`
`add-to-group`:		Un nouveau groupe est créer. params: `{ player: pid, gid: gid }`

unicasted
`play`:			Le joueur a effecté un mouvement
`welcome`:		L'entrée du joueur s'est bien passée. On affiche l'interface. params: `{ players: [{ id, name }], groups: [[id1, id2], [id5, id4]] }`
`ask-join-group`:	On propose au joueur de rejoindre un groupe. params: `{ leader: leader, group: groupID }`
`invite-rejected`:	Le joueur a refusé de rentrer dans le groupe. params: `{ by: pid, group: gid }`

misc
`error`:		Envoie une erreur au joueur (mouvement impossible, etc.). params: `{ type: "ERROR" }`
`ready`:		La requête est passée

Client->Server
--------------
`play`: 		Dès qu'un joueur effectue une action quelconque (précisée par `datagram.type`)
`set-name`:		Le joueur a choisi son nom de joueur. params: `{ name: "Nom" }`
`new-game`:		Le joueur lance une partie
`invite-player`:	Le invite un joueur dans son groupe. params: `{ playerID: id }`
`accept-group`:		Le accept de rentrer dans un groupe.
`reject-group`:		Le refuse de rentrer dans un groupe.

Play Type
---------
`move`:		Le mouvement d'un pion d'une case à une autre. params: `{ beginCoordinates, endCoordinates }`
