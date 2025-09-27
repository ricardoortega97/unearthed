import { pool } from "./database.js";
import dotenv from "./dotenv.js";
import giftData from "../data/gifts.js";

const createGiftsTable = async () => {

    const createTableQuery = `
    DROP TABLE IF EXISTS gifts;

    CREATE TABLE IF NOT EXISTS gifts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        pricePoint VARCHAR(10) NOT NULL,
        audience VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        submittedBy VARCHAR(255) NOT NULL,
        submittedOn TIMESTAMP NOT NULL
    )
`
    try{
        const res = await pool.query(createTableQuery)
        console.log('🎉 gifts table created successfully')

    } catch (err) {
        console.error('⚠️ error creating gifts table', err)
    }


};

const seedGiftTable = async () => {
    try {
        await createGiftsTable();

        for (const gift of giftData) {
            const insertQuery = {
                text: 'INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)'
            };
            const values = [
                gift.name,
                gift.pricePoint,
                gift.audience,
                gift.image,
                gift.description,
                gift.submittedBy,
                gift.submittedOn
            ];

            try {
                await pool.query(insertQuery, values);
                console.log(`✅ ${gift.name} added successfully`);
            } catch (err) {
                console.error(`⚠️ Error inserting gift ${gift.name}:`, err.message);
            }
        }

        console.log('🎉 Database seeding completed');
        await pool.end(); // Close the pool connection
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        await pool.end();
        process.exit(1);
    }
};

seedGiftTable();


