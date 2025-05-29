# Lector

An open-source web reader for language learning.  Read any content in your target language with context-aware translation tools.  Create and export [Anki](https://apps.ankiweb.net/) flashcards for new vocabulary learned in context.

### Screenshots

![demo](./docs/assets/demo.gif)

### Languages

- 🇩🇪 (de) Deutsch
- 🇬🇧 (en) English
- 🇺🇳 (eo) Esperanto
- 🇪🇸 (es) Español
- 🇫🇷 (fr) Français
- 🇮🇹 (it) Italiano
- 🇯🇵 (jp) 日本語
- 🇰🇷 (ko) 한국어
- 🇵🇱 (pl) Polski
- 🇷🇺 (ru) Русский
- 🇺🇦 (uk) Українська
- 🇨🇳 (zh) 中文

### Use it now

[Public demo site](https://lector.fly.dev)


## Development

Contributions are welcome.  Lector is written in SvelteKit using Svelte 5 [runes mode](https://svelte.dev/docs/svelte/what-are-runes).  It uses the excellent [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) API for translation services.  I recommend using Docker to set up a local LibreTranslate server, a PostgreSQL server, and your usual `npm` development tools.

### Prerequisites

- NodeJS
- Docker

### Setup

Checkout the source code.  In the root directory create a `.env` file that defines the following environment variables.

```
# Auth.js secrets (see https://authjs.dev/getting-started/authentication/oauth)
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# Postgres server
DATABASE_URL="postgres://postgres:password@localhost:5432/lector"

# LibreTranslate API
LIBRE_TRANSLATE_URL="http://localhost:5000"
LIBRE_TRANSLATE_API_KEY="fake-key"
```

The `AUTH_*` environment variables are used by [Auth.js](https://authjs.dev) to
configure OAuth authentication.  The `AUTH_GITHUB_*` environment variables are
secret tokens issued by GitHub used to register your app.  You can create your
own token set by logging into GitHub and clicking on your profile (in top left 
corner). Then navigate to 

`Settings > Developer settings > OAuth Apps > New OAuth App`.  

Complete the form and GitHub should issue you a `GITHUB_ID` and `GITHUB_SECRET`.

The `DATABASE_URL` and `LIBRE_TRANSLATE_URL` point to the postgres database and
libre translate API respectively.  If you are using the provided `docker-compose.yml`
file you should not need to modify these environment variables.

### Docker

```
> docker compose up
[+] Running 3/3
 ✔ Container lector-translate-1  Running                                                                                                                                         0.0s 
 ✔ Container lector-postgres-1   Running                                                                                                                                         0.0s 
 ✔ Container lector-app-1        Recreated

...

app-1        | Listening on http://0.0.0.0:3000
```

You should now be able to open Lector locally at `localhost:3000`.

### Help needed

If you are interested in contributing I am looking for help in the following areas.

- Internationalization / translation
- UI / UX design
- Improved navigation user experience

## Roadmap

- [ ] Google and Facebook OAuth login
- [ ] Vim-style block selection and keybindings
- [ ] Reactive layout for mobile screens
- [ ] Integration with a dictionary API service
- [ ] User bookmarks and links
