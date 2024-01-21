import { body } from "express-validator";


export const wallet_validator = [
    body('wallet_address')
    .trim()
    .isLength({ min: 10, max: 50 })
    .withMessage('Wallet Address should be between 10 and 50 characters')
];