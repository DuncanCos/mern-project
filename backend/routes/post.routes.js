const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const ctrl = require('../controllers/post.controller');

router.use(auth);              // protège toutes les routes ci‑dessous
router.post('/', ctrl.create);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
