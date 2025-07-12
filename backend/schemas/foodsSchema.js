// schemas/foodsSchema.js

const foodBase = {
    name: { type: 'string', maxLength: 100 },
    description: { type: 'string', maxLength: 1000 },
    can_eat: { type: 'integer' }, 
    quantity: { 
        type: 'string', 
        enum: ['free', 'moderate', 'rarely', 'never'], 
        description: 'Indicates how much of the food can be given to pets' 
    }
};

module.exports = {
    getAllFoodsSchema: {
        description: 'Lists foods',
        tags: ['Food'],
        response: {
            200: {
                type: 'object',
                properties: {
                    foods: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                ...foodBase
                            }
                        }
                    }
                }
            }
        }
    },

    getFoodByIdSchema: {
        description: 'Get a food by ID',
        tags: ['Food'],
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            },
            required: ['id']
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    food: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            ...foodBase
                        }
                    }
                }
            }
        }
    },

    createFoodSchema: {
        description: 'Creates a new food',
        tags: ['Food'],
        body: {
            type: 'object',
            required: ['name', 'description', 'can_eat', 'quantity'],
            properties: foodBase
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    ...foodBase
                }
            }
        }
    },

    updateFoodSchema: {
        description: 'Updates an existing food',
        tags: ['Food'],
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            },
            required: ['id']
        },
        body: {
            type: 'object',
            properties: foodBase
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    id: { type: 'integer' },
                    ...foodBase
                }
            }
        }
    },

    deleteFoodSchema: {
        description: 'Deletes a food by ID',
        tags: ['Food'],
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            },
            required: ['id']
        },
        response: {
            204: {
                type: 'null'
            }
        }
    }
};
