const express = require("express");
const shoutsModel = require("./shouts-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const data = await shoutsModel.find();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
    // https://javascript.info/async-await
    // .then((data) => res.status(200).json(data))
    // .catch((err) => next(err))
});

router.get("/:id", validateShoutId(), (req, res, next) => {
    res.status(200).json(req.shout);
});

router.post("/", (req, res, next) => {
    shoutsModel
        .add(req.body)
        .then((data) => res.status(201).json(data))
        .catch((err) => next(err));
});

router.delete("/:id", validateShoutId(), async (req, res, next) => {
    try {
        await Shouts.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

function validateShoutId() {
    return async (req, res, next) => {
        try {
            const shout = await shoutsModel;
            await findById(req.params.id);
            if (shout) {
                req.shout = shout;
                next();
            } else {
                res.status(404).json({
                    message: "Could not find shout",
                });
            }
        } catch (err) {
            next(err);
        }
    };
}

module.exports = router;
