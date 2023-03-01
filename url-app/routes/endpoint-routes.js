const express = require("express");
const router = express.Router();
const urlConvertAndStore = require("../controllers/create-shortlink");
const urlResolve = require("../controllers/resolve-shortlink");
const urlDelete = require("../controllers/delete-url");

router.post("", urlConvertAndStore.createUrlEntry);

router.get("/:shortlink", urlResolve.resolveUrlFromShortlink);

router.get("", urlResolve.getURLs);

router.delete("/:id", urlDelete.deleteUrl);

module.exports = router;