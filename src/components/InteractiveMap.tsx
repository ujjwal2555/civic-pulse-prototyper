import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Issue } from '@/data/dummyData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface InteractiveMapProps {
  issues: Issue[];
  onIssueClick?: (issue: Issue) => void;
}

const InteractiveMap = ({ issues, onIssueClick }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-73.9851, 40.7589], // NYC coordinates
        zoom: 13,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        // Add markers for each issue
        issues.forEach((issue) => {
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.style.width = '32px';
          el.style.height = '32px';
          el.style.cursor = 'pointer';
          
          const severityColor = issue.severity === 'high' 
            ? '#ef4444' 
            : issue.severity === 'medium' 
            ? '#f97316' 
            : '#6b7280';

          el.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="${severityColor}" opacity="0.2"/>
              <circle cx="16" cy="16" r="8" fill="${severityColor}"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
            </svg>
          `;

          const marker = new mapboxgl.Marker(el)
            .setLngLat([issue.lng, issue.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div class="p-2">
                  <h3 class="font-bold text-sm mb-1">${issue.title}</h3>
                  <p class="text-xs text-gray-600 mb-1">${issue.location}</p>
                  <span class="inline-block px-2 py-1 text-xs rounded" style="background: ${severityColor}20; color: ${severityColor}">
                    ${issue.severity} severity
                  </span>
                </div>`
              )
            )
            .addTo(map.current!);

          el.addEventListener('click', () => {
            onIssueClick?.(issue);
          });

          markers.current.push(marker);
        });

        // Fit bounds to show all markers
        if (issues.length > 0) {
          const bounds = new mapboxgl.LngLatBounds();
          issues.forEach(issue => bounds.extend([issue.lng, issue.lat]));
          map.current?.fitBounds(bounds, { padding: 50, maxZoom: 15 });
        }
      });
    } catch (error) {
      console.error('Map initialization error:', error);
    }

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
    };
  }, [issues, onIssueClick, tokenSubmitted, mapboxToken]);

  if (!tokenSubmitted) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="bg-background/95 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md w-full mx-4 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-bold text-lg">Interactive Map</h3>
              <p className="text-sm text-muted-foreground">Enter your Mapbox token to view</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="font-mono text-sm"
            />
            <Button 
              onClick={() => setTokenSubmitted(true)} 
              disabled={!mapboxToken.trim()}
              className="w-full"
            >
              Load Map
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Get your free token at:</p>
            <a 
              href="https://account.mapbox.com/access-tokens/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              mapbox.com/access-tokens
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveMap;
