import socket
import json

def handle_request(data):
    cmd = data['cmd']
    if cmd == 'analyze_image':
        return {'result': 'faces_found'}
    return {'error': 'unknown_cmd'}

# Сервер для приёма запросов от Java
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 8080))
server.listen(1)

while True:
    conn, addr = server.accept()
    data = json.loads(conn.recv(1024))
    response = handle_request(data)
    conn.send(json.dumps(response).encode())
    conn.close()
