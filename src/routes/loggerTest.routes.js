import { Router } from "express";



const router = Router();

router.get("/test", (req, res) => {
    req.logger.fatal("!Alert!");
    req.logger.error("!Alert!");
    req.logger.warning("!Alert!");
    req.logger.info("!Alert!");
    req.logger.debug("!Alert!");
    res.send({ message: "Logger test" });
});

export default router;