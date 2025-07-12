const {
    getAllFoodsSchema,
    getFoodByIdSchema,
    createFoodSchema,
    updateFoodSchema,
    deleteFoodSchema
} = require('../schemas/foodsSchema');

const sql = require('mssql');

async function foodRoutes(fastify, options) {
    fastify.get('/foods', { schema: getAllFoodsSchema }, async (request, reply) => {
        try {
            const pool = await fastify.mssql.pool.connect();
            const res = await pool.request().query('SELECT * FROM foods');
            return {foods: res.recordset}; //why recordset?
        } catch (err) {
            fastify.log.error(err);
            reply.code(500).send({ error: 'Database query failed' });
        }
    });

    fastify.get('/foods/:id', { schema: getFoodByIdSchema }, async (request, reply) => {
        try {
            const pool = await fastify.mssql.pool.connect();
            const { id } = request.params;
            const res = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM foods WHERE id = @id');
            
            if (res.recordset.length === 0) {
                return reply.code(404).send({ error: 'Food not found' });
            }
            return { food: res.recordset[0] };
        } catch (err) {
            fastify.log.error(err);
            reply.code(500).send({ error: 'Database query failed' });
        }
    });
}

module.exports = foodRoutes;