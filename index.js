import { get } from 'node:https';
import { writeFile, mkdir } from 'node:fs/promises';

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
	await mkdir('lists', { recursive: true });

	const contents = await Promise.all(urls.map(download));
	const ips = contents.join('\n').trim().split('\n').filter(Boolean);

	// Raw
	await writeFile('lists/cloudflare_ips_raw.txt', ips.join('\n') + '\n');
	console.log('✅ Updated lists/cloudflare_ips_raw.txt');

	// Nginx
	await writeFile('lists/cloudflare_ips_nginx.conf', ips.map(ip => `set_real_ip_from ${ip};`).join('\n') + '\n');
	console.log('✅ Updated lists/cloudflare_ips_nginx.conf');
};

main().catch(err => {
	console.error(err);
	process.exit(1);
});