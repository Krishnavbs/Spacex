// src/app/core/models/launchpad.model.ts

export interface Launchpad {
    id: string;
    name: string;
    location: LaunchpadLocation;
    image: string;
    launches: Launches[]
  }

  export interface Launches {
    id: string;
    name: string;
    success: boolean;
    wikipedia: string;
    launchpad: string;
  }
  
  export interface LaunchpadLocation {
    name: string;
    region: string;
  }

  export interface LaunchpadResponse {
    docs: Launchpad[]; // Array of launchpads
    totalDocs: number; // Total number of documents
    totalPages: number; // Total number of pages
    page: number; // Current page
    // Add other pagination properties as needed
  }
  export interface LaunchesResponse {
    docs: Launches[]; // Array of launches
  }
  