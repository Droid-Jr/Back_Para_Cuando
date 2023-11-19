const { Router } = require('express');

const { registerUser , getAllUser ,deletUser, updateUser} = require('../controllers/user.controller');

const router = Router();

router.post('/register', registerUser );
router.get('/users', getAllUser );
router.delete('/userDelet/:id', deletUser);
router.put('/updateUser/:id', updateUser);



module.exports = router;