const asyncHandler = require("express-async-handler")
const Goal = require('../models/goalsModel')



const getGoals = asyncHandler(async(req, res)=> {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

const setGoals = asyncHandler(async(req, res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goals = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goals)
})

const updateGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.findById(req.params.id)
    if(!goals){
        res.status(400)
        throw new Error('Goal Not Found')
    }
    const updatedGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoals)
})



const deleteGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.findById(req.params.id)
    if(!goals){
        res.status(400)
        throw new Error('Goal Not Found')
    }
    await goals.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}