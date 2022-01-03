const express = require('express');
const router = express.Router();

const { list, read, create, remove, videogameById, photo } = require('../controllers/videogameController');

router.get('/videogames', list);
router.get('/photo/:videogameId', photo);
router.get('/:videogameId', read);

router.post('/create', create);

router.delete('/:videogameId', remove);

router.param('videogameId', videogameById);

module.exports = router;