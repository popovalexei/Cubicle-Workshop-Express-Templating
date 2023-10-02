const router = require('express').Router();
const cubeService = require('../services/cubeService.js');

//When the user is on the home page and clicks on Add a Cube we render the create.hbs from the views
router.get('/create', (req, res) => {
  res.render('cube/create');
});

router.post('/create', async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();

  if (!cube) {
    res.redirect('/404');
    return;
  }
  res.render('cube/details', { cube });
});

module.exports = router;
