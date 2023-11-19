const users = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()


const registerUser = async (req, res) => {
    try {
        const { username, lastname, email, password } = req.body;

        // Validaciones de entrada
        if (username === "" || typeof username !== "string") {
            return res.status(400).json({ "message": "El username no puede estar vacío y debe ser un string" });
        }
        if (lastname === "" || typeof lastname !== "string") {
            return res.status(400).json({ "message": `lastname no puede estar vacío y debe ser un string` });
        }
        if (password === "" || typeof password !== "string") {
            return res.status(400).json({ "message": `password no puede estar vacío y debe ser un string` });
        }

        // Verificar si el correo electrónico ya está registrado
        const existingUser = await users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ "message": `El correo electrónico ya está registrado` });
        }

        // Hash de la contraseña y creación del usuario
        const hashed = await bcrypt.hash(password, 10);
        await users.create({ username, lastname, email, password: hashed });
        res.status(201).end();

    } catch (error) {
        res.status(400).json(error);
       
    }
};


const loginUser = async ( req , res ,) => {

    try {
        const  { email , password } = req.body;

        const user  = await users.findOne({
            where : {email}
        })

        if(!user){
            return res.status(400).json({
                erro : "user does not exist",
                message : "you need register before login"
            })
        }

        const isValuePassword = await bcrypt.compare(password , user.password);

        if(!isValuePassword){
            return res.status(400).json({
                erro : "password does not exist",
                message : "you need register before login"
            })
        }

        const copyUser = {...user.dataValues}
        delete copyUser.password

        const token = jwt.sign(copyUser,process.env.SECRET_JWT,{
            algorithm :"HS512",
            expiresIn : "2h"
        })

        copyUser.token =token


        res.status(200).json(copyUser)

    } catch (error) {
        res.status(400).json(error);
    }
}

const getAllUser = async (req, res) => {

    try {
        const user = await users.findAll({
            attributes : {
                exclude: ['createdAt','updatedAt']
            }
        });
        res.json(user)
    } catch (error) {
        res.status(400).json(error);
    }
};



const deletUser = async (req, res) => {

    try {
        const { id } = req.params;
         await users.destroy({
            where : {id}
         })
         res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateUser = async (req , res) => {
     try {
        const { id } = req.params;
        const datos = req.body;
        await users.update(datos , {
            where : { id }
        })
        res.status(201).json({"status": "update correct!"});
     } catch (error) {
        res.status(400).json(error)
     }
}




module.exports = {
    registerUser,
    getAllUser,
    deletUser,
    updateUser,
    loginUser
}