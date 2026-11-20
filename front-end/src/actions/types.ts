export type ActionResult<T = null> =
  | { success: true; data: T }
  | { success: false; message: string };
