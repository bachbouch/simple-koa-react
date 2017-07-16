const Koa = require('koa');
const app = new Koa();
const onerror = require('koa-onerror');
const config = require('./config');


// error handler
onerror(app);

const session = require('koa-session');
app.keys = ['your-session-secret'];
app.use(session({}, app));
// require('./config/bootstrap')(app, config);

// logger
const logger = require('koa-logger');
app.use(logger());

app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


if (config.env !== 'production') {
	app.use(require('koa-proxy')({
		host: 'http://localhost:1141',
		match: /^\/_assets\//}));
} else {
	app.use(require('koa-static')(__dirname + '/../../build/public'));
}

app.use(require('koa-static')(__dirname + '/../assets'));

app.use(require('koa-views')(__dirname + '/../frontend', {
	extension: 'html',
	map: {
		html: 'handlebars'
	}
}));


const router = require('./routes');
app.use(router.routes());
app.use(router.allowedMethods());

try {
	app.listen(config.port);
	console.log('process mode : ', config.env);
	console.log('Application Listen on ', config.port);
} catch (e) {
	console.log(e);
}

