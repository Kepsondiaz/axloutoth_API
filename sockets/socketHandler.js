module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    // Écouter les événements 'newForum'
    socket.on('newForum', (forum) => {
      console.log(`Nouveau forum créé : ${forum.name}`);
      // Émettre l'événement 'updateForumList' vers les clients connectés
      io.emit('updateForumList', forum);
    });

    // Écouter les événements 'updatedForum'
    socket.on('updatedForum', (forum) => {
      console.log(`Forum mis à jour : ${forum.name}`);
      // Émettre l'événement 'updateForumList' vers les clients connectés
      io.emit('updateForumList', forum);
    });
  });
};