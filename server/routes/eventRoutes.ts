import express from "express";
import {
  createEvent,
  getSingleEvent,
  deleteEvent,
  getPromoterEvent,
  editEvent,
  searchEvents,
  getAllEvents,
  getEventsByCategory,
  getTrendingEvents,
  getPromoterSingleEvent,
} from "../controllers/eventController";
import requireAuth from "../middleware/auth";
import multer from "multer";
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/create", requireAuth, upload.single("image"), createEvent);
router.delete("/:id", requireAuth, deleteEvent);
router.put("/:id", requireAuth, editEvent);
router.get("/my-events", requireAuth, getPromoterEvent);
router.get("/my-event/:id", requireAuth, getPromoterSingleEvent);

///public
router.get("/category", getEventsByCategory);
router.get("/trending", getTrendingEvents);
router.get("/search", searchEvents);
router.get("/:id", getSingleEvent);
router.get("/", getAllEvents);

export default router;
