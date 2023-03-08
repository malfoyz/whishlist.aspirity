import db from '../db.js'

class WishController {
    async createWish(req, res) {
        const {content, priority, image_url} = req.body
        const newWish = await db.query('INSERT INTO wish (content, priority) values ($1, $2) RETURNING *', [content, priority])
        res.json(newWish.rows[0])
    }
    async getWishes(req, res) {
        const wishes = await db.query('SELECT * FROM wish')
        res.json(wishes.rows)
    }
    async getOneWish(req, res) {
        const id = req.params.id
        const wish = await db.query('SELECT * FROM wish WHERE id = $1', [id])
        res.json(wish.rows[0])
    }
    async updateWish(req, res) {
        const {id, content, image_url, priority, created } = req.body
        const wish = await db.query('UPDATE wish SET content = $1, image_url = $2, priority = $3' + 
                                    'WHERE id = $4 RETURNING *', [content, image_url, priority, id])
        res.json(wish.rows[0])
    }
    async deleteWish(req, res) {
        const id = req.params.id
        const wish = await db.query('DELETE FROM wish WHERE id = $1', [id])
        res.json(wish.rows[0])
    }
}

export default new WishController();