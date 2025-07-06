import * as admin from "firebase-admin";

export interface AuditLogEntry {
  action: string; // e.g., 'delete_post', 'ban_user', 'delete_comment'
  targetId: string; // e.g., postId, userId, commentId
  targetType: string; // e.g., 'post', 'user', 'comment'
  performedBy: string; // moderator/admin UID
  reason?: string;
  timestamp: FirebaseFirestore.FieldValue;
  details?: any;
}

export async function logAuditAction(entry: Omit<AuditLogEntry, 'timestamp'>) {
  const auditEntry: AuditLogEntry = {
    ...entry,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };
  await admin.firestore().collection('auditLogs').add(auditEntry);
} 