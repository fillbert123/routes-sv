const express = require('express');
const router = express.Router();

const pool = require('../config/database');

/**
 * @swagger
 * /line:
 *   get:
 *     summary: Get all lines
 *     tags: [Line]
 *     responses:
 *       200:
 *         description: Successfully retrieved lines
 *       500:
 *         description: Internal server error
 */

router.get('/', async(req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM LINE'
    );
    res.json(result.rows);
  }
  catch(error) {
    res.status(500).json({
      message: 'Failed to retrieve lines',
      error: error.message
    });
  }
})

router.get('/test', (req, res) => {
    res.json({
        message: 'Users route is working!'
    });
});

module.exports = router;
