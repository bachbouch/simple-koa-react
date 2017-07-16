'user strict'; 
const router = require('koa-router')();
const stats = require('../../build/stats.json');

const publicPath = stats.publicPath;

let STYLE_URL;
let SCRIPT_URL_APP = publicPath + [].concat(stats.assetsByChunkName.app)[0];
if (process.env.NODE_ENV === 'production') {
	STYLE_URL = (publicPath + [].concat(stats.assetsByChunkName.app)[1] + '?' + stats.hash);
	SCRIPT_URL_APP += '?' + stats.hash;
}

// SCRIPT_URL_APP = '/public/app.min.js';

router.get('/react', async (ctx, next) => {
	await ctx.render('index', {
		version: stats.appVersion,
		commit: stats.appCommit,
		STYLE_URL: STYLE_URL,
		SCRIPT_URL: SCRIPT_URL_APP
	});
});
router.get('/bar', (ctx) => {
	ctx.body = 'this is a users/bar response';
});
module.exports = router;
