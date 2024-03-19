// src/app/core/services/space-x.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Launches, LaunchesResponse, Launchpad, LaunchpadResponse } from '../models/launchpad.model';

@Injectable({
  providedIn: 'root'
})
export class SpaceXService {
  private baseUrl = 'https://api.spacexdata.com/v4';
  private baseUrlV5 = 'https://api.spacexdata.com/v5';
  
  constructor(private http: HttpClient) { }

 getLaunchpads(pageIndex: number, itemsPerPage: number): Observable<{ launchpads: Launchpad[], totalItems: number, currentPage: number }> {
  const options = {
    query: {},
    options: {
      limit: itemsPerPage,
      page: pageIndex
    }
  };
  return this.http.post<LaunchpadResponse>(`${this.baseUrl}/launchpads/query`, options).pipe(
    map((response: LaunchpadResponse) => ({
      launchpads: response.docs.map(this.mapLaunchpad),
      totalItems: response.totalDocs, 
      currentPage: response.page
    }))
  );
}
  
private mapLaunchpad(data: any): Launchpad {
  const location = {
    name: data.full_name || '', // Provide a default value if full_name is missing
    region: data.region || '' // Provide a default value if region is missing
  };

  let image = ''; // Initialize image variable

  if (data.images && data.images.large && data.images.large.length > 0) {
    image = data.images.large[0]; // Assign the image URL if it exists
  }

  return {
    id: data.id,
    name: data.name,
    location: location,
    launches: data.launches || [], // Provide a default value if launches is missing
    image: image // Assign the image URL
  };
}

  getLaunches(launchpadId: string): Observable<Launches[]> {
    const url = `${this.baseUrlV5}/launches/query`;
    const options = {
      query: { 'launchpad': launchpadId },
      options: {
        limit: Number.MAX_SAFE_INTEGER
      }
    };
    return this.http.post<LaunchesResponse>(url, options).pipe(
      map((response: LaunchesResponse) =>  response.docs.map(this.mapLaunches)
      )
    );
  }

  private mapLaunches(data: any): Launches{
    return {
      id: data.id,
      name: data.name,
      success: data.success,
      wikipedia: data?.links?.wikipedia || '',
      launchpad: data.launchpad
    }
  }

  searchLaunchpads(query: string): Observable<Launchpad[]> {
    const options = {
      query: {
        $or: [
          { 'name': { $regex: query, $options: 'i' } }, 
          { 'region': { $regex: query, $options: 'i' } }
        ]
      },
      options: {
        limit: Number.MAX_SAFE_INTEGER,
      }
    };
    return this.http.post<LaunchpadResponse>(`${this.baseUrl}/launchpads/query`, options).pipe(
      map((response) => response.docs.map(this.mapLaunchpad))
    )
  }
}



