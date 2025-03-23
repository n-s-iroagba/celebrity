export const truncateString = (message: string, maxChars: number): string => {
    if (message.length > maxChars) {
      return message.slice(0, maxChars) + '...';
    }
    return message;
  };