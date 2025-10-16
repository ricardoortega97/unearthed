import { pool } from '../config/database.js'

const getGifts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
        res.status(200).json(result.rows)
    } catch (err) {
        console.error('Error fetching gifts:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getGiftById = async (req, res) => {
    try {
        const selectQuery = `
        SELECT name, pricePoint, audience, image, description, submittedBy, submittedOn
        FROM gifts
        WHERE id = $1
        `;

        const giftID = req.params.giftId;

        const result = await pool.query(selectQuery, [giftID]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching gift by ID:');
        res.status(409).json({ error: err.message });
    }
};

export default { getGifts, getGiftById }