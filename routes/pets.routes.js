const router = require('express').Router()

const petsCtrl = require('../controllers/pets.controller')

router.get('/', petsCtrl.getPets)

router.post('/create', petsCtrl.createPet)

module.exports = router
