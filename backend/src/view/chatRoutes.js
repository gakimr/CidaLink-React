const express = require("express");
const chatController = require("../controller/chatController");

const routes = express.Router();

routes.get("/conversas", chatController.ListConversations);
routes.get("/:conversationId/mensagens", chatController.GetMessages);
routes.post("/:conversationId/mensagens", chatController.PostMessage);

module.exports = routes;