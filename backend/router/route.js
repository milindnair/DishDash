import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import {Auth,localVariables} from '../middleware/auth.js';
import { registerMail } from '../controllers/mailer.js';
import * as postcontroller from "../controllers/postController.js";




/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app

/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/updateuser').put(Auth , controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password

router.route('/createPost').post(postcontroller.createPost); // create a post
router.route('/getPosts/:username').get(postcontroller.getPosts); // get all posts
router.route('/getFeedPosts/:username').get(postcontroller.getFeedPosts); // get all posts on feed
router.route('/addComment/:postId').post(postcontroller.addComment); // add comment to post

router.route('/likePost').put(postcontroller.likePost); // like a post
router.route('/unlikePost').put(postcontroller.unlikePost); // unlike a post




export default router;