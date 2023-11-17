const express = require("express");
const authRoutes = require("../modules/auth/auth.route");
const expertRoutes = require("../modules/expert/expert.route");
const SlotsRoutes = require("../modules/Slots/Slots.route");
const bookingRoutes = require("../modules/booking/booking.route");

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/expert",
    route: expertRoutes,
  },
  {
    path: "/slots",
    route: SlotsRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

module.exports = routes;
