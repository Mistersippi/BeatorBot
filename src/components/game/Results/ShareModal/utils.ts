export async function generateShareImage(
  score: number,
  total: number,
  genre: string
): Promise<string> {
  // In a real implementation, this would generate an actual share image
  // For now, we'll return a placeholder URL
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('https://via.placeholder.com/1200x630');
    }, 500);
  });
}