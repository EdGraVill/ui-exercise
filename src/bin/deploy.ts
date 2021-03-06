import * as ghpages from 'gh-pages';

ghpages.publish('build', {
  repo: `https://${process.env.GH_TOKEN}@github.com/EdGraVill/ui-exercise.git`,
  silent: true,
}, (err: any) => {
  if (err) {
    console.error(err);
    process.exit(err.errno || 0);
  }

  console.log('Deployed to https://edgravill.github.io/ui-exercise/');
});
