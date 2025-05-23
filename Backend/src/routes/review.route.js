const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  addReview,
  updateReview,
  deleteReview,
  viewReviews,ro
} = require("../controllers/review.controller");

const router = express.Router();

router.post("/", authenticateUser, addReview);
router.put("/:id", authenticateUser, updateReview);
router.delete("/:id", authenticateUser, deleteReview);
router.get("/:propertyId", viewReviews);

module.exports = router;
