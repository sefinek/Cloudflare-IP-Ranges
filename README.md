# Cloudflare IP Ranges
A simple script to automatically download and update the list of Cloudflare IP addresses (IPv4 and IPv6).


## Lists
The lists are updated automatically every 4 hours via GitHub Actions.

### Raw
https://raw.githubusercontent.com/sefinek/Cloudflare-IP-Ranges/main/lists/cloudflare_ips_raw.txt

### Nginx
https://raw.githubusercontent.com/sefinek/Cloudflare-IP-Ranges/main/lists/cloudflare_ips_nginx.conf


## Nginx Configuration

### Download file
```bash
sudo curl -fsSL https://raw.githubusercontent.com/sefinek/Cloudflare-IP-Ranges/main/lists/cloudflare_ips_nginx.conf -o /etc/nginx/cloudflare_ips.conf
```

### Set up Cron
```bash
sudo crontab -e
0 */5 * * * curl -fsSL https://raw.githubusercontent.com/sefinek/Cloudflare-IP-Ranges/main/lists/cloudflare_ips_nginx.conf -o /etc/nginx/cloudflare_ips.conf
```

This will download the list of Cloudflare IP addresses every 5 hours.


## License
MIT