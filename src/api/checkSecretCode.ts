export const checkSecretCode = async (secretCode: string) => {
  try {
    const res = await fetch(`/api/secretCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secretCode }),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error fetching:", err);
  }

  return null;
};
