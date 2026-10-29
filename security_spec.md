# Security Specification — 4Me Lanka Tours CMS

## 1. Data Invariants
1. **Global Default Deny**: Any path not explicitly matched is denied for all `read` and `write` operations.
2. **Path Variable Hardening**: Every single-document target path variable (`{docId}`, `{adminUid}`) must match `^[a-zA-Z0-9_\-]+$` with length `1..128`, and `/site_content/{docId}` only permits `docId == 'main'`.
3. **Public Site Content Read (Single Document Only)**: Visitors can `get` `/site_content/main` to render live site copy, but `list` and `delete` are strictly forbidden.
4. **Admin-Only Content Mutations**: Only verified administrators (`merlinfiverr0@gmail.com` with `email_verified == true` or a user present in `/admins/$(request.auth.uid)`) can `create` or `update` `/site_content/main`.
5. **Strict Schema & Key Enforcement (`isValidSiteContent`)**:
   - `keys().hasAll(['texts', 'updatedBy', 'updatedAt'])` and `keys().hasOnly(['texts', 'updatedBy', 'updatedAt'])`.
   - `texts` must be a `map` with `texts.size() <= 500`.
   - `updatedBy` must be a `string` matching `request.auth.uid` and `isValidId(updatedBy)`.
   - `updatedAt` must equal `request.time` (server timestamp).
6. **Privilege Escalation Prevention**: `/admins/{adminUid}` cannot be self-created or modified by non-admins; `delete` is forbidden.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write to `/site_content/main`**: `{ texts: { heroTitle: "Hacked" }, updatedBy: "anon", updatedAt: SERVER_TIMESTAMP }` -> `PERMISSION_DENIED`
2. **Unverified Admin Email Spoof**: Auth `{ uid: "u1", email: "merlinfiverr0@gmail.com", email_verified: false }` writing to `/site_content/main` -> `PERMISSION_DENIED`
3. **Non-Admin Authenticated Write**: Auth `{ uid: "u2", email: "guest@example.com", email_verified: true }` writing to `/site_content/main` -> `PERMISSION_DENIED`
4. **Shadow Field Injection on Create**: Admin writing `{ texts: {}, updatedBy: "admin1", updatedAt: SERVER_TIMESTAMP, isSuperAdmin: true }` -> `PERMISSION_DENIED`
5. **Shadow Field Injection on Update**: Admin updating `/site_content/main` with extra field `hacked: true` -> `PERMISSION_DENIED`
6. **Identity Spoofing (`updatedBy` Mismatch)**: Admin `admin1` writing `{ texts: {}, updatedBy: "someone_else", updatedAt: SERVER_TIMESTAMP }` -> `PERMISSION_DENIED`
7. **Forged Client Timestamp (`updatedAt != request.time`)**: Admin writing past/future `updatedAt` timestamp -> `PERMISSION_DENIED`
8. **Type Poisoning (`texts` as String instead of Map)**: Admin writing `{ texts: "not-a-map", updatedBy: "admin1", updatedAt: SERVER_TIMESTAMP }` -> `PERMISSION_DENIED`
9. **Resource Exhaustion (Map > 500 keys)**: Admin writing `texts` map with 501 keys -> `PERMISSION_DENIED`
10. **ID Poisoning on `/site_content/{docId}`**: Admin writing to `/site_content/arbitrary_doc_id` instead of `main` -> `PERMISSION_DENIED`
11. **Self-Privilege Escalation on `/admins/{adminUid}`**: Regular user creating `/admins/u2` -> `PERMISSION_DENIED`
12. **Unauthorized Document Deletion**: Admin or user attempting `delete` on `/site_content/main` -> `PERMISSION_DENIED`
