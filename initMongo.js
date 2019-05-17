require('mongodb').MongoClient.connect('mongodb://localhost:27017/izel', {
    useNewUrlParser: true
})
    .then(db => {
        console.log('Initialization complete. You can run your bot now.');
        db.close();
    })
    .catch(console.error);