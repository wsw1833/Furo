'use server';

import { revalidatePath } from 'next/cache';

export async function fetchReminder(petID) {
  try {
    const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/record?petId=${petID}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Server responded with ${response.status}`
      );
    }
    revalidatePath(`/dashboard/${petID}/record`);
    return await response.json();
  } catch (err) {
    return { success: false, status: 400, error: err.message };
  }
}

export async function addReminder(formData) {
  try {
    const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/record`, {
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

    revalidatePath(`/dashboard/${formData.petId}/record`);
    return await response.json();
  } catch (err) {
    return { success: false, status: 400, error: err.message };
  }
}
