# Socket.io events
## Server -> Client
### Brodcasted

`new-player`:		Un nouveau joueur s'est connecté. params: `{ pid: pid, name: name }`  
`lost-player`:		Un joueur s'est déconnecté. params: `{ pid: pid }`  
`new-group`:		Un nouveau groupe est créer. params: `{ players: [pid1, pid2], gid: gid }`  
`add-to-group`:		Un nouveau groupe est créer. params: `{ player: pid, gid: gid }`  

### Unicasted
`play`:			Le joueur a effecté un mouvement  
`welcome`:		L'entrée du joueur s'est bien passée. On affiche l'interface. params: `{ players: [{ id, name }], groups: [[id1, id2], [id5, id4]] }`  
`ask-join-group`:	On propose au joueur de rejoindre un groupe. params: `{ leader: leader, gid: gid }`  
`invite-rejected`:	Le joueur a refusé de rentrer dans le groupe. params: `{ pid: pid, gid: gid }`  

### Misc
`error`:		Envoie une erreur au joueur (mouvement impossible, etc.). params: `{ type: "ERROR" }`  
`ready`:		La requête est passée  

## Client -> Server
`play`: 		Dès qu'un joueur effectue une action quelconque (précisée par `datagram.type`)  
`set-name`:		Le joueur a choisi son nom de joueur. params: `{ name: "Nom" }`  
`new-game`:		Le joueur lance une partie `{ ... }`  
`invite-player`:	Un joueur invite un autre joueur dans son groupe. params: `{ pid: pid }`  
`accept-group`:		Le joueur accept de rentrer dans un groupe. params: `{ gid: gid, inviter: inviter }`  
`reject-group`:		Le joueur refuse de rentrer dans un groupe. params: `{ gid: gid, inviter: inviter }`  
`leave-group`:		Le joueur quitte le groupe dans lequel il est. params: `none`  
