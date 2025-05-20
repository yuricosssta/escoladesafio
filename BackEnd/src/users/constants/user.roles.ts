export const USER_ROLES = ['admin', 'teacher', 'student'] as const;

export type UserRole = (typeof USER_ROLES)[number];
