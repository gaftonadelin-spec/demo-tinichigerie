# Ateliero Metal & Tinichigerie — site demo

Site static (HTML/CSS/JS, fără build), gata pentru GitHub Pages.

## Structură
- `index.html` — pagina
- `css/style.css` — tokeni (light/dark) + componente
- `js/config.js` — `SITE_CONFIG`: nume, telefon, WhatsApp, email, adresă, program, endpoint API
- `js/data.js` — `SITE_DATA`: servicii, tarife, portofoliu, proces, recenzii
- `js/app.js` — randare, filtrare galerie, temă, formular (`submitQuoteForm(data)`)
- `assets/` — sprite de iconițe, favicon, ilustrații SVG de rezervă pentru imagini

## Rulare locală
Iconițele folosesc un sprite SVG extern, deci deschide site-ul printr-un server, nu prin `file://`:

```
python -m http.server 5510
```

## Trecere pe backend
În `js/config.js` setează `api.demoMode: false` și `api.baseUrl`. Formularul trimite atunci
`POST {baseUrl}/api/quote` cu JSON: `name, phone, service, city, size, when, details, consent, source, createdAt`.

## GitHub Pages
Settings → Pages → Deploy from branch → `main` / root. Toate căile sunt relative, deci merge și în sub-folder.
