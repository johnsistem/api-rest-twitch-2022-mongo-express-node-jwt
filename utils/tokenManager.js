import jwt from "jsonwebtoken";

//Genera el token
export const generateToken = (uid) => {
    const expiresIn = 60 * 15; //tiempo para expirar

    try {
        //se genera el token:id,clave secreta y tiempo de expirar
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn };
    } catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        //genera el refreshtoken
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
            expiresIn,
        });
            //guarda el refretoken en la cookies y lo retorna
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000),
        });
    } catch (error) {
        console.log(error);
    }
};

export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "JWT formato no válido",
};
