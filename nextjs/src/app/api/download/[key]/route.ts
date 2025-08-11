import { NextRequest, NextResponse } from 'next/server'
import { get, config } from '@/lib/tigris'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params
    const decodedKey = decodeURIComponent(key)
    
    const response = await get(decodedKey, 'stream', { config })
    
    if (!response || response.error) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
    
    // Set appropriate headers
    const headers = new Headers({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${decodedKey}"`,
    })
    
    return new NextResponse(response.data, { headers })
    
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download file' }, 
      { status: 500 }
    )
  }
}