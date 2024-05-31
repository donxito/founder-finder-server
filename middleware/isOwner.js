const Ad = require("../models/Ad.model");

const isOwner = async (req, res, next) => {
    const userId = req.payload._id; 

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }


    const adId = req.params.adId; 

   
    console.log("User ID:", userId);
    console.log("Ad ID:", adId);


    try {
        if (adId) {
            const event = await Ad.findById(adId);
            if (!event) {
                return res.status(404).json({ message: "Ad not found" });
            }
            if (event.author.toString() !== userId) { 
                return res.status(403).json({ message: "Forbidden" });
            }
        }

        next(); 
    } catch (error) {
        console.error("Error in isOwner middleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { isOwner };
