const express = require('express');
const router = express.Router();
const {
  obtenerVehiculos,
  buscarVehiculosPorPatente
} = require('../services/vehiculos.service');

// GET /api/vehiculos
router.get('/', async (req, res) => {
  try {
    const data = await obtenerVehiculos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/patentes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(`${prefix}vehiculos`)
      .select('patente');

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Error al obtener patentes:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/vehiculos/buscar?patente=ABC123
router.get('/buscar', async (req, res) => {
  try {
    const data = await buscarVehiculosPorPatente(req.query.patente);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
