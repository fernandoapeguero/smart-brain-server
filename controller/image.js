const Clarifai  = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'ad4959b234064287b32da7697125d9b7'
});

const handleApiCall = (req , res) =>{

  
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("unable to work with api"));
}



const handleImagePut = (req , res , db ) => {

    const {id} = req.body;

    db('users')
        .where('id' , '=' , id)
        .increment('entries' , 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(404).json('Unable o get entries.'));
}


module.exports = {

    handleImagePut: handleImagePut,
    handleApiCall: handleApiCall
}