/** Shared chip/slice/region colour cycle. Callers index with `i % length`,
 * so this superset only adds variety over any smaller subset previously
 * duplicated per-file — it never breaks existing `i % len` indexing. */
export const CHIP_COLORS = ['var(--el-blue)', 'var(--el-orange)', 'var(--el-green)', 'var(--el-purple)', 'var(--el-pink)', 'var(--el-amber)'] as const;
