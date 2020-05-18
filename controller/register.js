const handleRegister = (req , res , db , bcrypt) => {

    const {email , password , name } = req.body;

    if(!email || !name || !password){

        return  res.status(400).json("Incorrect form submission");
    } 

        const hashPwd  = bcrypt.hashSync(password);

        db.transaction(trx => {

            trx.insert({
                hash: hashPwd,
                email
            }).into('login')
            .returning('email')
            .then(loginemail => {
                return trx('users')
                .insert({
                    name: name,
                    email: loginemail[0] , 
                    joined: new Date()})
                .returning('*')
                .then(user => {
                    res.json(user[0]);
                })
            }).then(trx.commit)
            .catch(trx.rollback);
        }).then(response => res.json('Registering Completed'))
        .catch(err => console.log(err));


    

    
}

module.exports = {
    handleRegister: handleRegister
}