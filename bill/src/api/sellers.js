import express from 'express';
import { getSellers, createSeller, deleteSeller } from '../util/database.js';

const router = express.Router();

router.get('/', (req, res) => {
    const sellers = getSellers();
    res.json(sellers);
});

router.post('/', (req, res) => {
    const { name, contact } = req.body;
    const newSeller = createSeller(name, contact);
    res.status(201).json(newSeller);
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    deleteSeller(id);
    res.status(204).send();
});

export default router;