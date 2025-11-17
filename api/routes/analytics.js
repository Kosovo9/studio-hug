const express = require('express');
const router = express.Router();

// Dashboard analytics
router.get('/dashboard/:userId', async (req, res) => {
  try {
    const analytics = {
      totalRevenue: 15000,
      totalSpaces: 4,
      totalVisitors: 45000,
      growth: 125,
      revenue: [
        { date: '2024-01-01', amount: 1000 },
        { date: '2024-01-02', amount: 1500 },
        { date: '2024-01-03', amount: 2000 },
        { date: '2024-01-04', amount: 2500 }
      ],
      visitors: [
        { date: '2024-01-01', count: 500 },
        { date: '2024-01-02', count: 750 },
        { date: '2024-01-03', count: 1000 },
        { date: '2024-01-04', count: 1250 }
      ],
      spaces: [
        { name: 'AI Chat', visitors: 12000, revenue: 5000 },
        { name: 'Image Gen', visitors: 15000, revenue: 4000 },
        { name: 'Voice AI', visitors: 10000, revenue: 3500 },
        { name: 'Code Helper', visitors: 8000, revenue: 2500 }
      ],
      revenueBySpace: [
        { name: 'AI Chat', revenue: 5000 },
        { name: 'Image Gen', revenue: 4000 },
        { name: 'Voice AI', revenue: 3500 },
        { name: 'Code Helper', revenue: 2500 }
      ]
    };
    
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

