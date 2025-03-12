'use server';

export async function fetchProvider(walletAddress) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/providers?walletAddress=${walletAddress}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Server responded with ${response.status}`
      );
    }
    return await response.json();
  } catch (err) {
    return { success: false, status: 400, error: err.message };
  }
}
