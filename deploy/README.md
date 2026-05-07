# Deploy

Questa configurazione crea un container unico per EZElectronics:

- builda il client React con API relative a `/ezelectronics/`;
- avvia il server Express su `3001`;
- serve anche i file statici del client;
- espone la porta solo su `127.0.0.1`, pronta per un reverse proxy nginx sul server;
- mantiene il database SQLite in un volume Docker persistente.

## Avvio

```bash
cd deploy
cp .env.example .env
docker compose up -d --build
```

L'app sarà raggiungibile dal server su `http://127.0.0.1:3001`.

## Nginx

Usa `nginx.example.conf` come base e sostituisci `example.com` con il tuo dominio.

```nginx
proxy_pass http://127.0.0.1:3001;
```

Se cambi `APP_PORT` in `.env`, aggiorna anche la porta nel file nginx.

## Comandi utili

```bash
docker compose logs -f
docker compose ps
docker compose down
```
