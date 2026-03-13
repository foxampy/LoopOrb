// USGS Water Data API Integration
// https://api.waterdata.usgs.gov/

const USGS_BASE_URL = 'https://api.waterdata.usgs.gov/ogcapi/v0'

export interface USGSLocation {
  id: string
  name: string
  lat: number
  lng: number
  type: string
}

export interface USGSMeasurement {
  id: string
  locationId: string
  parameter: string
  value: number
  unit: string
  timestamp: string
  status: string
}

// Parameter codes for water quality
export const USGS_PARAMS = {
  TEMPERATURE: '00010',        // Water temperature
  CONDUCTIVITY: '00095',       // Specific conductance
  PH: '00400',                 // pH
  DISSOLVED_OXYGEN: '00300',   // Dissolved oxygen
  TURBIDITY: '63680',          // Turbidity
  NITRATE: '99133',            // Nitrate
  FLOW: '00060',               // Streamflow
  GAGE_HEIGHT: '00065',        // Gage height
}

// Fetch monitoring locations
export async function fetchUSGSLocations(
  bbox?: [number, number, number, number],
  limit: number = 100
): Promise<USGSLocation[]> {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('f', 'json')
  
  if (bbox) {
    params.append('bbox', bbox.join(','))
  }

  const response = await fetch(
    `${USGS_BASE_URL}/collections/monitoring-locations/items?${params}`
  )
  
  if (!response.ok) {
    throw new Error(`USGS API error: ${response.status}`)
  }

  const data = await response.json()
  
  return data.features.map((f: any) => ({
    id: f.properties.monitoring_location_id,
    name: f.properties.monitoring_location_name,
    lat: f.geometry.coordinates[1],
    lng: f.geometry.coordinates[0],
    type: f.properties.monitoring_location_type,
  }))
}

// Fetch real-time measurements
export async function fetchUSGSMeasurements(
  locationId: string,
  parameterCode?: string
): Promise<USGSMeasurement[]> {
  const params = new URLSearchParams()
  params.append('monitoring_location_id', locationId)
  params.append('limit', '100')
  params.append('f', 'json')
  
  if (parameterCode) {
    params.append('parameter_code', parameterCode)
  }

  const response = await fetch(
    `${USGS_BASE_URL}/collections/continuous/items?${params}`
  )
  
  if (!response.ok) {
    throw new Error(`USGS API error: ${response.status}`)
  }

  const data = await response.json()
  
  return data.features.map((f: any) => ({
    id: f.id,
    locationId: f.properties.monitoring_location_id,
    parameter: f.properties.parameter_name || f.properties.parameter_code,
    value: parseFloat(f.properties.value),
    unit: f.properties.unit_of_measure,
    timestamp: f.properties.time,
    status: f.properties.approvals_status?.[0] || 'unknown',
  }))
}

// Get water quality summary for map display
export async function fetchWaterQualitySummary(
  region: 'us' | 'global' = 'us'
): Promise<any[]> {
  if (region === 'us') {
    const locations = await fetchUSGSLocations(undefined, 50)
    
    const locationsWithData = await Promise.all(
      locations.slice(0, 20).map(async (loc) => {
        try {
          const measurements = await fetchUSGSMeasurements(loc.id)
          return {
            ...loc,
            measurements: measurements.slice(0, 5),
            lastUpdated: measurements[0]?.timestamp || null,
          }
        } catch {
          return { ...loc, measurements: [], lastUpdated: null }
        }
      })
    )
    
    return locationsWithData.filter(l => l.measurements.length > 0)
  }
  
  return []
}

// Get historical data for charts
export async function fetchHistoricalData(
  locationId: string,
  parameterCode: string,
  days: number = 30
): Promise<{ date: string; value: number }[]> {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days)
  
  const params = new URLSearchParams()
  params.append('monitoring_location_id', locationId)
  params.append('parameter_code', parameterCode)
  params.append(
    'datetime',
    `${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`
  )
  params.append('limit', '1000')
  params.append('f', 'json')

  const response = await fetch(
    `${USGS_BASE_URL}/collections/daily/items?${params}`
  )
  
  if (!response.ok) {
    throw new Error(`USGS API error: ${response.status}`)
  }

  const data = await response.json()
  
  return data.features
    .map((f: any) => ({
      date: f.properties.time,
      value: parseFloat(f.properties.value),
    }))
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

// Health check
export async function checkUSGSApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${USGS_BASE_URL}/?f=json`, { 
      method: 'HEAD',
      next: { revalidate: 60 }
    })
    return response.ok
  } catch {
    return false
  }
}
