# Database Schema

## MVP Schema: Client-Side State
Since the MVP for Spin Decide operates as an offline-capable client-side single-page application (SPA), there is **no traditional relational or NoSQL database schema** required. Data is maintained entirely in memory within the React component hierarchy and potentially `localStorage` for returning visitors.

### In-Memory State Objects (React State / LocalStorage):

**`State: settings`**
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `options` | `Array<String>` | The list of choices input by the user (max 50, min 2). |
| `rotation` | `Number` | The cumulative rotational degree of the wheel (used to persist rotation between spins). |
| `isSpinning` | `Boolean` | Used to lock UI. |
| `winner` | `String` or `null` | The calculated winner after a spin concludes. |
| `theme` | `String` | (Optional) Light/Dark mode or wheel color palette. |

---

## Future Phase Schema (Server-Side)
If the application introduces Shared Group Sessions and user accounts, a lightweight database (e.g., PostgreSQL) will be introduced.

**Table: `users`**
- `id` (UUID, Primary Key)
- `created_at` (Timestamp)
- `email` (String)

**Table: `sessions` (For shared live spinning)**
- `id` (UUID, Primary Key)
- `host_user_id` (UUID, Foreign Key)
- `status` (Enum: `WAITING`, `SPINNING`, `RESOLVED`)
- `options` (JSONB)
- `created_at` (Timestamp)

**Table: `saved_lists` (For quick loading common templates)**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `list_name` (String)
- `items` (JSONB Array of strings)
