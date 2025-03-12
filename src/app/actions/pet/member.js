'use server';

import { revalidatePath } from 'next/cache';

export async function fetchMembers(petID) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/member?petId=${petID}`);
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

export async function addMember(formData) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Server responded with ${response.status}`
      );
    }

    revalidatePath(`/dashboard/${formData.petId}/member`);
    return await response.json();
  } catch (err) {
    return { success: false, status: 400, error: err.message };
  }
}

export async function deleteMember(walletAddress) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(
      `${baseUrl}/api/member?walletAddress=${walletAddress}`,
      {
        method: 'DELETE',
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log(`Successfully deleted ${result.deletedCount} records`);
      return result;
    } else {
      throw new Error(result.error || 'Failed to delete records');
    }
  } catch (error) {
    console.error('Error deleting records:', error);
    throw error;
  }
}
