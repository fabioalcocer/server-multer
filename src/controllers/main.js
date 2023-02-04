import fs from "fs";
import path from "path";
import { __dirname } from "../utils/index.js";

export const controller = {
    index: (req, res) => {
        return res.render("form");
    },
    storeAvatar: (req, res) => {
        if (req.file) {
            const usersDBPath = path.resolve(__dirname(import.meta.url), "../data/users.json");
            let usersDB = JSON.parse(fs.readFileSync(usersDBPath));
            usersDB = [...usersDB, {
                nick: req.body.nickname,
                avatar: req.file.filename,
            }];
            fs.writeFileSync(usersDBPath, JSON.stringify(usersDB, null, 2));
            console.log(usersDB);
            return res.send("Ok se envió todo bien");
        }
        return res.send("Ey, el archivo no es válido");
    },
    storeAvatarComoApi: (req, res) => {
        console.log({
            body: req.body,
            file: req.file
        });
        return res.json({
            message: "ok",
            imageFile: `http://localhost:3000/uploads/${req.file.filename}`
        });
    }
}