import express from "express";
import LinkNormaliserController from "../controllers/linkNormaliserController";

const router = express.Router();

router.post("/", async (_req, res) => {
    const textToParse = _req.body;
    const controller = new LinkNormaliserController();
    const response = await controller.post(textToParse);
    return res.send(response);
});

export default router;
