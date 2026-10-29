/**
 * Firestore Security Rules Test Suite — Dirty Dozen Verification
 */
export interface DirtyDozenTestCase {
  id: number;
  name: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  path: string;
  auth: { uid: string; email?: string; email_verified?: boolean } | null;
  payload?: Record<string, unknown>;
  expected: 'PERMISSION_DENIED' | 'ALLOWED';
}

export const dirtyDozenTests: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Unauthenticated write to /site_content/main',
    operation: 'create',
    path: '/site_content/main',
    auth: null,
    payload: { texts: { heroTitle: 'Hacked' }, updatedBy: 'anon', updatedAt: 'REQUEST_TIME' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Unverified admin email spoof',
    operation: 'update',
    path: '/site_content/main',
    auth: { uid: 'spoof1', email: 'merlinfiverr0@gmail.com', email_verified: false },
    payload: { texts: { heroTitle: 'Spoofed' }, updatedBy: 'spoof1', updatedAt: 'REQUEST_TIME' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Non-admin authenticated user write',
    operation: 'update',
    path: '/site_content/main',
    auth: { uid: 'guest1', email: 'guest@example.com', email_verified: true },
    payload: { texts: { heroTitle: 'Guest Edit' }, updatedBy: 'guest1', updatedAt: 'REQUEST_TIME' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Shadow field injection on create',
    operation: 'create',
    path: '/site_content/main',
    auth: { uid: 'admin1', email: 'merlinfiverr0@gmail.com', email_verified: true },
    payload: { texts: {}, updatedBy: 'admin1', updatedAt: 'REQUEST_TIME', ghostField: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Shadow field injection on update',
    operation: 'update',
    path: '/site_content/main',
    auth: { uid: 'admin1', email: 'merlinfiverr0@gmail.com', email_verified: true },
    payload: { texts: {}, updatedBy: 'admin1', updatedAt: 'REQUEST_TIME', extra: 'bad' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Identity spoofing updatedBy mismatch',
    operation: 'update',
    path: '/site_content/main',
    auth: { uid: 'admin1', email: 'merlinfiverr0@gmail.com', email_verified: true },
    payload: { texts: {}, updatedBy: 'other_uid', updatedAt: 'REQUEST_TIME' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Forged client timestamp',
    operation: 'update',
    path: '/site_content/main',
    auth: { uid: 'admin1', email: 'merlinfiverr0@gmail.com', email_verified: true },
    payload: { texts: {}, updatedBy: 'admin1', updatedAt: '2020-01-01T00:00:00Z' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Value poisoning texts field as string',
    operation: 'update',
    path: '/site_content/main',
    auth: { uid: 'admin1', email: 'merlinfiverr0@gmail.com', email_verified: true },
    payload: { texts: 'invalid-string', updatedBy: 'admin1', updatedAt: 'REQUEST_TIME' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Oversized texts map (>500 keys)',
    operation: 'update',
    path: '/site_content/main',
    auth: { uid: 'admin1', email: 'merlinfiverr0@gmail.com', email_verified: true },
    payload: { texts: { oversized: true }, updatedBy: 'admin1', updatedAt: 'REQUEST_TIME' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'ID poisoning on /site_content/{docId}',
    operation: 'create',
    path: '/site_content/rogue_doc',
    auth: { uid: 'admin1', email: 'merlinfiverr0@gmail.com', email_verified: true },
    payload: { texts: {}, updatedBy: 'admin1', updatedAt: 'REQUEST_TIME' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Self-privilege escalation in /admins/{adminUid}',
    operation: 'create',
    path: '/admins/guest1',
    auth: { uid: 'guest1', email: 'guest@example.com', email_verified: true },
    payload: { uid: 'guest1', role: 'admin', createdAt: 'REQUEST_TIME' },
    expected: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Deletion of /site_content/main',
    operation: 'delete',
    path: '/site_content/main',
    auth: { uid: 'admin1', email: 'merlinfiverr0@gmail.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
  },
];
