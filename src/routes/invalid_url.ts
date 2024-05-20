import express, { Request, Response } from "express";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import Router from 'express';
import { invalidUrl } from "../controllers/invalid_url";

const invalidRoute= express.Router()

invalidRoute.get("*",invalidUrl)


export default invalidRoute;