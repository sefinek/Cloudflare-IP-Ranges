import { get } from 'node:https';
import { writeFile } from 'node:fs/promises';

const urls = [
	'https://www.cloudflare.com/ips-v4',
	'https://www.cloudflare.com/ips-v6',
];

const download = url => new Promise((resolve, reject) => {
	console.log('GET', url);

	get(url, res => {
		if (res.statusCode !== 200) {
			res.resume();
			return reject(new Error(`Request failed: ${res.statusCode}`));
		}

		const chunks = [];
		res.on('data', chunk => chunks.push(chunk));
		res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8').trim()));
	}).on('error', reject);
});

const main = async () => {
	const contents = await Promise.all(urls.map(download));
	await writeFile('cloudflare_ips', contents.join('\n') + '\n');
	console.log('cloudflare_ips updated');
};

main().catch(err => {
	console.error(err);
	process.exit(1);
});