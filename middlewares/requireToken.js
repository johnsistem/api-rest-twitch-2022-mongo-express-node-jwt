import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
    try {

        let token = req.headers?.authorization;

        if (!token) throw new Error("No Bearer");

        //obtiene solo el token dejando a beare 
        token = token.split(" ")[1];
       
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        //Asignamos el uid que sacamos del token al req.uid para que lo use el info User
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
};
