import jwt from 'jsonwebtoken'
import { } from 'dotenv/config'


export const authenticateToken = (req, res, next) => {

    //recupération du token de l'utilisateur
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send('Token introuvable')
    }
    //verification du token et de l'utilisateur lié
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send('Mauvais token')
        } else {
            req.user = user
            next()
        }
    })
}
