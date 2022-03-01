const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.create = async (req, res) => {

    const { name, lastname, email, password } = req.body;

    try {
        // 1. Verificar el password & encryptar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log(hashedPassword);

        const newUser = await User.create({
            name,
            lastname,
            email,
            password: hashedPassword
        })

        console.log(newUser);

        // Gestión de JSON Web Token
        // Cuando el Usuario se registra, ya no es necesario que inicie sesión en ese momento.

        // A. Creación de payload (Datos)
        const payload = {
            user: {
                id:newUser._id
            }
        }

        // B. Creación del JSON Web Token
        jwt.sign(
            payload, // datos que acompañan
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                if(error) throw error

                res.json({
                    msg: 'Usuario creado con éxito',
                    data: token
                })
            }
        )

    } catch (error) {
        console.log(error);

        res.json({
            msg: 'Hubo un error al crear el usuario o la contraseña'
        })
    }

}
exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(400).json({
                msg: 'El usuario no fue encontrado.'
            })
        }

        const verifiedPass = await bcrypt.compare(password, foundUser.password);

        if (!verifiedPass) {
            return await res.json({
                msg: 'El usuario o la contraseña no coinciden'
            })
        }

        // Gestión del JWT
        // A. Payload
        const payload = {
            user: {
                id: foundUser._id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                if (error) throw error

                res.json({
                    msg: 'Inicio de sesión exitoso',
                    data: token
                })
            }
        )

        return

    } catch (error) {
        console.log(error);

        res.json({
			msg: "Hubo un problema con la autenticación."
		})

    }

}
exports.verifyToken = async (req, res) => {

    console.log(req.user);

    try {

        const foundUser = await User.findById(req.user.id).select("-password")

        return res.json({
            msg: 'Datos del usuario encontrados.',
            data: foundUser
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Hubo un error autorizando el usuario.'
        })
    }

}
