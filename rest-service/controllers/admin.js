const db = require("../database/database");

module.exports.getAllNodes = async (req, res, next) => {
    try {
        let nodes = await db.getAllNodes();
        res.status(200).json(nodes);
    } catch(err) {
        next(err)
    }
}

module.exports.addNode = async (req, res, next) => {
    try {
        const { host } = req.body;
        await db.addNode(host);
        res.status(200).end();
    } catch(err) {
        next(err)
    }
}

module.exports.removeAllNodes = async (req, res, next) => {
    try {
        await db.removeAllNodes();
        res.status(200).end();
    } catch(err) {
        next(err)
    }
}

module.exports.removeNode = async (req, res, next) => {
    try {
        const { nodeID } = req.params;
        await db.removeNode(nodeID);
        res.status(200).end();
    } catch(err) {
        next(err)
    }
}