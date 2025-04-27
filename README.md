# Cloudflare IP Ranges
A simple script to automatically download and update the list of Cloudflare IP addresses (IPv4 and IPv6).

## List
https://raw.githubusercontent.com/sefinek/Cloudflare-IP-Ranges/main/cloudflare_ips

The list is updated automatically every 4 hours via GitHub Actions.

## Initialize file
```bash
sudo curl -fsSL https://raw.githubusercontent.com/sefinek/Cloudflare-IP-Ranges/main/cloudflare_ips -o /etc/nginx/cloudflare_ips
```

## Set up cron
```bash
sudo crontab -e
0 */5 * * * curl -fsSL https://raw.githubusercontent.com/sefinek/Cloudflare-IP-Ranges/main/cloudflare_ips -o /etc/nginx/cloudflare_ips
```

Downloads the list of Cloudflare IP addresses every 5 hours.

## License
MIT