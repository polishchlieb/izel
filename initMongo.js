require('mongodb').MongoClient.connect('mongodb://localhost:27017/izel', {
    useNewUrlParser: true
})
    .then(conn => {
        console.log('Initialization complete. You can run your bot now.');
        conn.close();
    })
    .catch(console.error);