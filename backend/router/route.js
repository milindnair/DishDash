import { Router } from "express";
const router = Router();


//Post methods
router.route('/register').post((req, res) => {res.json('register route')});

//Get methods


//Put methods

export default router;