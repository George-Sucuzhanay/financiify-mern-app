const Recipe  = require("../models/stock")


// Create 
const createItem = async (req, res) => {
    try {
        const recipe = await new Recipe(req.body)
        await recipe.save()
        return res.status(201).json({
            recipe,
        })

    }catch(error) {
        return res.status(500).json({error: error.message})
    }
}

// Read
const getAllItems = async (req, res) => {
    try{
        const recipes = await Recipe.find()
        return res.status(200).json({recipes})
    }catch(error){
        return res.status(500).send(error.message)
    }
}

// getonebyID
const getItemById = async (req,res) => {
    try{
        const {id} = req.params
        const recipe = await Recipe.findById(id)
        if(recipe){
            return res.status(200).json({recipe})
        }
        return res.status(404).send("Recipe with the specified ID does not exist")

    }catch(error){
        return res.status(500).send(error.message)
    }
}
// rsfghgfds
// updating any item we desire
const updateItem = (req, res) => {
    try{
        const {id} = req.params
        Recipe.findByIdAndUpdate(
            id, req.body, {new: true}, (err, recipe) => {
                if(err){
                    res.status(500).send(err)
                }
                if(!recipe){
                    res.status(500).send("Recipe not found")
                }
                return res.status(200).json(recipe)
            }
        )
    }catch(error){
        return res.status(500).send(error.message)
    }
}
// deletedItem 
const deleteItem = async(req, res) => {
    try{
        const {id} = req.params
        const deleted = await Recipe.findByIdAndDelete(id)
        if(deleted){
            return res.status(200).send("Item deleted")
        }
        throw new Error("item not found")

    }catch(error){
        return res.status(500).send(error.message)
    }
}


module.exports = {
    createItem,
    getAllItems,
    getItemById, 
    updateItem,
    deleteItem
}