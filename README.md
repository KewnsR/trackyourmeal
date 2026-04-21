# track your meal App

A modern, mobile-first meal tracking UI built with plain HTML, CSS, and JavaScript.

## Features

- Home screen with today’s meals in a scrollable list
- Live summary cards for calories and protein
- Add Meal screen with a minimal form and instant save flow
- Stats screen with simple weekly bars for protein and calories
- Profile screen with placeholder user details and a daily protein goal
- Add and delete meals with totals that update immediately

## Launch

Open `index.html` directly in a browser, or serve the folder with any static file server.

### SQLite save mode

If npm is not working, run the app with the built-in Python server that uses SQLite:

```bash
python server.py
```

Then open:

```text
http://127.0.0.1:4173
```

Data is saved in:

```text
data/trackyourmeal.sqlite
```

The app still keeps a localStorage backup if the server is unavailable.

For example:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.
