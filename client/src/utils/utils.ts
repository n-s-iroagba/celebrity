export const getGreeting = (): string => {
    const currentTime = new Date().getHours();
  
    if (currentTime >= 0 && currentTime < 12) {
      return 'Good morning';
    } else if (currentTime >= 12 && currentTime < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };