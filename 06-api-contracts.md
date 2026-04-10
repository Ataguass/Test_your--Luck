# API Contracts

## MVP Phase
The MVP of Spin Decide is fully client-side and requires **no external API contracts**. All operations take place in the browser.

---

## Future Phase (Shared Group Sessions)
For a future phase supporting synchronized shared spinning over WebSockets, the following basic WebSocket payload contracts would be established.

### 1. `session.create`
*   **Direction:** Client -> Server
*   **Payload:** `{ "host_id": "string", "initial_options": ["A", "B", "C"] }`
*   **Response:** `{ "session_id": "string", "join_code": "12345" }`

### 2. `session.join`
*   **Direction:** Client -> Server
*   **Payload:** `{ "join_code": "12345", "user_name": "string" }`
*   **Response:** `{ "session_id": "string", "current_options": [...], "status": "WAITING" }`

### 3. `session.update_options`
*   **Direction:** Host Client -> Server -> All Connected Clients
*   **Payload:** `{ "session_id": "string", "options": ["A", "B", "C", "D"] }`

### 4. `session.trigger_spin`
*   **Direction:** Host Client -> Server
*   **Payload:** `{ "session_id": "string" }`
*   **Server Processing:** Calculates the random target angle.

### 5. `session.spin_started`
*   **Direction:** Server -> All Connected Clients
*   **Payload:** 
```json
{
  "target_angle_offset": 240,
  "rotations": 5,
  "duration_ms": 4000
}
```
*   **Client Action:** Triggers the matching frontend hardware CSS animation simultaneously for everyone.
