#!/usr/bin/env python3
"""
Simple HTTP server to serve the portfolio locally.
Usage:
    python server.py              # serves on http://localhost:8080
    python server.py 3000         # serves on http://localhost:3000
"""

import http.server
import socketserver
import sys
import os
import webbrowser
import threading

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080


class Handler(http.server.SimpleHTTPRequestHandler):
    """Custom handler that adds no-cache headers in development."""

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, format, *args):  # noqa: A002
        print(f"  [Dexter Server] {self.address_string()} — {format % args}")


def open_browser():
    url = f"http://localhost:{PORT}"
    print(f"\n  ✦ Portfolio is live at {url}\n")
    webbrowser.open(url)


if __name__ == "__main__":
    # Change CWD to the directory this script lives in
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n  ╔══════════════════════════════════════╗")
        print(f"  ║   Dexter Portfolio Server v1.0       ║")
        print(f"  ║   http://localhost:{PORT}              ║")
        print(f"  ║   Press Ctrl+C to stop               ║")
        print(f"  ╚══════════════════════════════════════╝\n")

        # Open browser after 0.5s
        threading.Timer(0.5, open_browser).start()

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped. Goodbye! ✦\n")
