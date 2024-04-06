const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/createFile', controller.createFile);
router.get('/getFiles', controller.getFiles);
router.get('/getFile', controller.getFile);
router.put('/modifyFile', controller.modifyFile);
router.delete('/deleteFile', controller.deleteFile);

module.exports = router;
