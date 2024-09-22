// Function to fetch the JSON file dynamically based on the current route
export async function fetchCompatibilityData(jsonFileName) {
  const jsonUrl = `https://raw.githubusercontent.com/UWUVCI-PRIME/UWUVCI-Compatibility/main/${jsonFileName}`;

  try {
    // Fetch the JSON data
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${jsonFileName}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching compatibility data:', error);
    return null;
  }
}

// Function to process and fix compatibility data
export function fixCompatibilityData(compatibilityData) {
  if (!compatibilityData || !compatibilityData.compatibility) return;

  // Fix compatibility statuses and sort by game name
  compatibilityData.compatibility.forEach((item) => {
    if (item.status == 2) {
      item.status = 'working';
    } else if (item.status == 1) {
      item.status = 'issues';
    } else if (item.status == 0) {
      item.status = 'broken';
    }
  });

  // Sort by game name
  compatibilityData.compatibility.sort((a, b) => 
    a.game_name > b.game_name ? 1 : -1
  );
}
