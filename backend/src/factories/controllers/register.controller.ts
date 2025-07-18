import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../../infrestructure/orm/models/user.model';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { user_name, password, user_secondName, email, phone_number, role } = req.body;

    const avatarUrl = req.file
        ? `/uploads/${req.file.filename}`
        : `/uploads/default-user.png`;

    //Validamos si el usuario existe en la base de datos
    const user = await User.findOne({ where: { email: email } }) // seria lo mismo que SELECT * FROM USER WHERE USER_NME = PARAMETRO


    if (user) {
        res.status(400).json({
            msg: 'La contraseña o correo ingresada es incorrecta'
        });
        return;
    }

    const hashedpassword = await bcrypt.hash(password, 10)
    if (!user_name || !user_secondName || !email || !password || !phone_number) {
        res.status(400).json({ msg: "Todos los campos son obligatorios" });
        return;
    }

    try {
        await User.create({
            user_name: user_name,
            password: hashedpassword,
            user_secondName,
            email,
            phone_number,
            role,
            avatarUrl
        })
        res.json({
            msg: `User ${user_name} created succesfully` //Para que funcione la agregacionde la vriable por ${} es obligtorio usar las comills del tipo ``
        })
    } catch (error) {
        res.status(400).json({
            msg: 'An error haas been ocurred',
            error
        })
    }
};