TelemetryGeo is a GIS (Geographic Information System) designed for the visualization, processing, and analysis of geospatial data from satellites.
The main goal of this application is to ingest satellite metadata and translate it quickly and continuously into a dynamic visual representation on an
interactive 2D map.

This project helps solve a common challenge in aerospace and spatial engineering: transforming large volumes of abstract, raw data into an intuitive,
visual interface for researchers and operators.

Main functionalities:
-Automated Data Mapping: Upon initialization, the system automatically fetches and parses raw metadata from a production file
(for us: productResponse.json). It interprets the spatial sensor footprints, renders the polygons dynamically with a distinct color and 
smoothly adjusts the map's view to bound the loaded data.
-Multi-Format Manual Import: Users cand unpload their own geospatial files directly from their local drive. The application features an
intelligent dual-parsing engine that automatically identifies wheter the file contians standardized WKT (Well-Known-Text) or GeoJson data,
instantly mapping the shapes into a dedicated secondary vector layer
-Geocoding: Features an integrated search bar powered by the global GeoNames API. When a user types any location, the system queries the web service
in the background, extracts the mathematical coordinates, and performs a fluid flight animation (pan&zoom) to the destination.

### Prerequisites
To run this project locally, you only need a modern web browser like Edge, Chrome, or Firefox, alongside a local development environment server such as the VS Code Live Server extension, Python's built-in http.server, or Node.js http-server.

Deoarece aplicația se conectează direct la API-uri securizate externe de pe o adresă locală, o extensie de browser pentru permisiunea CORS (Cross-Origin Resource Sharing) trebuie să fie instalată și activă în timpul dezvoltării pentru a evita blocajele de tip Preflight (OPTIONS) impuse de browser.

### Architecture & Tech Stack
-This platform is engineered to run completely client-side, avoiding heavy backend infrastructures or database lags.
-The mapping engine is built on OpenLayers v10.3.1, using a multi-layer spatial stack composed of Base OSM, Draw, Manual Vectors, Satellite Scenes, and Intersections.
-The geospatial math engine utilizes Turf.js for topology analysis and polygon intersection buffering.
-The API protocols rely on the native RESTful Fetch API using asynchronous HTTP POST requests powered by OAuth2 Bearer Tokens.
-The UI controls are managed through jQuery and Native CSS3 for asynchronous search pop-ups and custom controls.



### Step-by-Step Setup
Clone the repository locally using Git by running the command git clone https://github.com/voicanelena3/TelemetryGeo.git followed by cd TelemetryGeo.

The file structure in your workspace must contain index.html for the main interface, app.js for map initialization and UI events, and copernicus-api.js to handle OAuth2 authentication and dispatch requests to the Sentinel Hub catalog.

Launch the local server by right-clicking index.html and selecting Open with Live Server, or by starting your preferred local server on port 5500.

Initialize the map by first enabling your browser's CORS extension, then opening the developer console (F12) to verify the startup logs for the widgets.
   
