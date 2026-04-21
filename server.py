import json
import os
import sqlite3
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
DB_PATH = DATA_DIR / "trackyourmeal.sqlite"
PORT = 4173


def init_db() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS app_state (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                payload TEXT NOT NULL,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.commit()


class Handler(SimpleHTTPRequestHandler):
    def _send_json(self, data, status=200):
        raw = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def _read_json_body(self):
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0:
            return {}
        body = self.rfile.read(length)
        try:
            return json.loads(body.decode("utf-8"))
        except Exception:
            return {}

    def do_GET(self):
        if self.path == "/api/state":
            with sqlite3.connect(DB_PATH) as conn:
                row = conn.execute("SELECT payload FROM app_state WHERE id = 1").fetchone()

            if row is None:
                return self._send_json({"state": None}, 200)

            try:
                payload = json.loads(row[0])
            except Exception:
                payload = None
            return self._send_json({"state": payload}, 200)

        return super().do_GET()

    def do_PUT(self):
        if self.path == "/api/state":
            data = self._read_json_body()
            state = data.get("state") if isinstance(data, dict) else None

            if not isinstance(state, dict):
                return self._send_json({"error": "Invalid payload"}, 400)

            with sqlite3.connect(DB_PATH) as conn:
                conn.execute(
                    """
                    INSERT INTO app_state (id, payload, updated_at)
                    VALUES (1, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(id) DO UPDATE
                    SET payload = excluded.payload,
                        updated_at = CURRENT_TIMESTAMP
                    """,
                    (json.dumps(state),),
                )
                conn.commit()

            return self._send_json({"ok": True}, 200)

        self.send_error(404)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(ROOT)
    init_db()
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Serving TrackYourMeal at http://127.0.0.1:{PORT}")
    print(f"SQLite file: {DB_PATH}")
    server.serve_forever()
