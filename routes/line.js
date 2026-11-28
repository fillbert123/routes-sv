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
    const getAllLine = await pool.query(`
      SELECT 
        l.id AS line_id,
        l.name AS line_name,
        l.code AS line_code,
        l.color AS line_color,
        l.is_active AS line_is_active,
        rg.id AS route_group_id,
        rg.name AS route_group_name,
        rg.code AS route_group_code,
        s.name_en AS route_group_terminus,
        s2.name_en AS route_group_via
      FROM LINE l
      LEFT JOIN ROUTE_GROUP rg ON rg.line_id = l.id
      LEFT JOIN ROUTE r ON r.route_group_id = rg.id
      LEFT JOIN LINE_STATION ls ON ls.id = r.start_station_id
      LEFT JOIN STATION s ON s.id = ls.station_id
      LEFT JOIN LINE_STATION ls2 ON ls2.id = r.via_station_id
      LEFT JOIN STATION s2 ON s2.id = ls2.station_id
      ORDER BY r.id ASC;
    `);
    const fetchResult = getAllLine.rows;
    const grouped = new Map();
    fetchResult.forEach((line) => {
      console.log('line', line);
      
    })
    res.json(getAllLine.rows);
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
