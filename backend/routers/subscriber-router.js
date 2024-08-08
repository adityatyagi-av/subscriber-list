import express from "express";
import { addSubscriber, deleteSubscriber, editSubscriber, getSubscribers } from "../controller/subscriber-controller.js";

 const SubscriberRouter= express.Router();

 SubscriberRouter.get("/get-user",getSubscribers);
SubscriberRouter.post("/add-user",addSubscriber);

SubscriberRouter.put("/edit-user/:id",editSubscriber);
SubscriberRouter.delete("/delete-user/:id",deleteSubscriber);
export default SubscriberRouter;