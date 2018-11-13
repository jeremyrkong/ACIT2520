const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	return text;
})

hbs.registerHelper('linkTo', (url) => {
	return url;
})

// app.use((request, response, next) => {
// 	var time = new Date().toString();
// 	// console.log(`${time}: ${request.method} ${request.url}`);

// 	var log = `${time}: ${request.method} ${request.url}`;
// 	fs.appendFile('server.log', log + '\n', (error) => {
// 		if (error) {
// 			console.log('Unable to log message')
// 		}
// 	})
// 	next();
// });

app.use((request, response, next) => {
	response.render('maintenance.hbs', {
		title: 'Maintenance'
	});
});

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.render('index.hbs', {
        title: 'Welcome to Lab10!',
        link: {
	        Info: '/info',
	        Try: '/empty'
	    }
	});
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		year: new Date().getFullYear(),
		welcome: 'Hello!',
		picture: 'https://i.imgur.com/NXSsQeG.jpg',
		link: {
	        Home: '/',
	        Try: '/empty'
	    }
	});
});

app.get('/empty', (request, response) => {
	response.render('empty.hbs', {
		title: 'This is empty',
		link: {
			Home: '/',
	        Info: '/info'
	    }
	});
});

app.get('/maintenance', (request, response) => {
	response.render('maintenance.hbs', {
		title: 'The site is currently down for maintenance',
		link: {
			Home: '/'
	    }
	});
});

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});