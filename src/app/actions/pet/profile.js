export async function fetchPetProfile(id) {
  try {
    const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/petprofile?petId=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pet profile');
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function fetchAllPetProfile(address) {
  try {
    const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/user?walletAddress=${address}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch pet profile');
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}
