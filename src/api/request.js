const url = 'https://api.github.com/graphql'
export const token = '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'

export const makeRequest = async (token, query, variables) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${token}`,
      },
      body: JSON.stringify({
        query,
        variables
      }),
    });
    const data = await res.json();
    return data;
  };