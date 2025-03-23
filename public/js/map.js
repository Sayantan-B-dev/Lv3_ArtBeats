
maptilersdk.config.apiKey = maptilerApiKey; 

const map = new maptilersdk.Map({
    container: 'map', 
    style: maptilersdk.MapStyle.HYBRID,
    center: Art.geometry.coordinates, 
    zoom: 5
});

new maptilersdk.Marker({ color: 'rgba(255, 0, 0, 0.8)' }) // Custom marker color
    .setLngLat(Art.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25, closeButton: false, closeOnClick: true })
            .setHTML(`
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h3 style="font-size: 16px; margin-bottom: 5px; color: #e74c3c;">${Art.title}</h3>
                    
                    <p style="font-size: 12px; color: #888;">Created by: <strong>${Art.artist_name}</strong></p>
                </div>
            `)//<p style="font-size: 14px; color: #555;">${Art.location}</p>
    )
    .addTo(map);


