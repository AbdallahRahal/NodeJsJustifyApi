import { } from 'dotenv/config'

let wordCount = {}

export const wordCounter = (req, res, next) => {
    //recupération du token de l'utilisateur
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    let tokenFound = false

    // recherche de la pair token/nombre de mot  
    for (const [key, value] of Object.entries(wordCount)) {
        if (key == token) {
            tokenFound = true
        }
    }
    //creation de la pair si inéxistante
    if (!tokenFound) {
        wordCount[token] = 0;

    }

    // ajout du nombre de mot si inferieur a 80 000 sinon renvoie de l'erreur 402 Payment Required
    if (Number(wordCount[token]) + Number(req.body.split(' ').length) < 80000) {
        wordCount[token] += Number(req.body.split(' ').length)
        next()
    } else {
        res.status(402).send('402 Payment Required')
    }
}

/*
Note : l'exercice demande un maximum de 80 000 mots par jour par token,
mais etant donné qu'un utilisateur peut à tout moment demander un nouveau token,
il peut donc réinitialiser son compteur de mot quand il le souhaite.
En cas réel l'utilisation d'un BDD paraît plus sécurisé pour le décompte du nombre de mot maximal à justifier
Ce décompte serait egalement lié à l'utilisateur plutôt qu'à son token.
*/