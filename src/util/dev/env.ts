// utils/env.ts
export const getConsoleLogStatus = (): string => {
  return import.meta.env.VITE_CONSOLE_LOG;
};
