import db from '../db.js'

class WishController {
    async createWish(req, res) {
        const {content, priority} = req.body
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
        const {id, content, image_url, priority, created, is_happened } = req.body
        const wish = await db.query('UPDATE wish SET content = $1, image_url = $2, priority = $3, is_happened = $4' + 
                                    'WHERE id = $5 RETURNING *', [content, image_url, priority, is_happened, id])
        res.json(wish.rows[0])
    }
    async deleteWish(req, res) {
        const id = req.params.id
        const wish = await db.query('DELETE FROM wish WHERE id = $1', [id])
        res.json(wish.rows[0])
    }
}

export default new WishController();