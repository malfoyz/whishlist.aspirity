import Router from 'express'
import wishController from '../controllers/wish.controller.js';

const router = new Router()

router.post('/wish', wishController.createWish)
router.get('/wish', wishController.getWishes)
router.get('/wish/:id', wishController.getOneWish)
router.put('/wish', wishController.updateWish)
router.delete('/wish/:id', wishController.deleteWish)


export default router
