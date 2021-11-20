const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');

/**
 * App Routes 
*/
router.get('/', chefController.homepage);
router.get('/orders/:status', chefController.exploreCategoriesByStatus);
router.get('/orderdetailWait/:id', chefController.exploreDetailW);
router.get('/orderdetailConf/:id', chefController.exploreDetailC);

router.get('/accecptOrder/:id', chefController.acceptO);
router.post('/accecptOrder/:id', chefController.acceptOrder);
router.get('/declineOrder/:id', chefController.decline);
router.post('/declineOrder/:id', chefController.declineOrder);
router.get('/doneOrder/:id', chefController.done);
router.post('/doneOrder/:id', chefController.doneOrder);

router.get('/menu', chefController.Menu);
router.get('/updatemenu/:id', chefController.update);
router.post('/updatemenu/:id', chefController.updateMenu);

module.exports = router;