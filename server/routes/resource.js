import express from "express";
import { userResource } from '../controllers/resource.js';

const router = express.Router();

router.get("/", userResource);

export default router;