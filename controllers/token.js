import jwt from 'jsonwebtoken'
import { } from 'dotenv/config'

export const getToken = (req, res) => {

    console.log('utilisation de getToken')

    try {
        //test des informations de l'utilisateur en BDD en cas réel 
        if (true) {
            //creation du token pour 24 heures
            const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
            res.status(200).send({
                accessToken
            })
        } else {
            res.status(401).send()
        }
    } catch (error) {
        res.status(400).send()
    }
}