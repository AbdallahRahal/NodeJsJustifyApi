import justify from "../services/justify.js"

export const toJustify = (req, res) => {

    var result = justify(req.body)
    res.set('Content-Type', 'text/plain')
    res.status(200).send(result)
}
