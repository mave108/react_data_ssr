import express from 'express';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import path from 'path';
import fs from 'fs';
import App from './src/App';
import {posts,users,comments} from './mock-data';
import { InitialDataContext } from './src/InitialDataContext';

const app = express();

app.use(express.static('./build', { index: false }))

app.get('/app', async (req, res) => {
	const sheet = new ServerStyleSheet();
    const contextObj = { _isServerSide: true, _requests: [], _data: {} }
    renderToString(
			<InitialDataContext.Provider value={contextObj}>
				<App />
			</InitialDataContext.Provider>
	);
    //fetch data server side
    await Promise.all([...contextObj._requests]);
	contextObj._isServerSide = false;
	delete contextObj._requests;

	const reactApp = renderToString(
        sheet.collectStyles(
            <InitialDataContext.Provider value={contextObj}>
				<App />
            </InitialDataContext.Provider>
        )
	);
	const templateFile = path.resolve('./build/index.html');
	fs.readFile(templateFile, 'utf8', (err, data) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.send(
			data.replace('<div id="root"></div>', `<script>window.preloadedData = ${JSON.stringify(contextObj)};</script><div id="root">${reactApp}</div>`)
				.replace('{{ styles }}', sheet.getStyleTags())
		)
	});
});

app.get('/api/posts', (req, res) => {
    res.status(200).send(posts);
})

app.get('/api/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/api/comments', (req, res) => {
    res.status(200).send(comments);
})

app.listen(8080, () => {
	console.log('Server is listening on port 8080');
    console.log('App is accessible at http://localhost:8080/app');
});