async function fetchCopernicusProducts(satellite = 'SENTINEL-2', maxCloudCover = 20) {
    const baseUrl = "https://catalogue.dataspace.copernicus.eu/odata/v1/Products";
    const filter = `Collection/Name eq '${satellite}' and Attributes/OData.CSC.DoubleAttribute/any(att:att/Name eq 'cloudCover' and att/Value lt ${maxCloudCover})`;
    const url = `${baseUrl}?$filter=${encodeURIComponent(filter)}&$top=10`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) throw new Error(`Eroare HTTP: ${response.status}`);

        const result = await response.json();
        return result.value || [];
    } catch (error) {
        console.error("Eroare apel API:", error);
        return [];
    }
}