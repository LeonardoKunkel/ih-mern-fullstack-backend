const petModel = require('../models/petModel')

exports.getPets = async (req, res) => {

    const allPets = await petModel.find({})

    res.json({
        msg: 'Se ha obtenido con éxito el listado de mascotas',
        data: allPets
    })

}

exports.createPet = async (req, res) => {

    // Datos del formulario
    const { name, description} = req.body

    const newPet = await petModel.create({ name, description });

    res.json({
        msg: 'Se ha creado una mascota correctamente',
        data: newPet
    })

}
