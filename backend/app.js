import express from "express";
import  SubscriberRouter  from "./routers/subscriber-router.js";
import cors from 'cors';
export const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api",SubscriberRouter);