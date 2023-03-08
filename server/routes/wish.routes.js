import Router from 'express'
import wishController from '../controllers/wish.controller.js';

const router = new Router()

router.post('/wishes', wishController.createWish)
router.get('/wishes', wishController.getWishes)
router.get('/wishes/:id', wishController.getOneWish)
router.put('/wishes', wishController.updateWish)
router.delete('/wishes/:id', wishController.deleteWish)


export default router
