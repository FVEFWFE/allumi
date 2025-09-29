import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Configuration from environment variables
const SHIPPING_PERIOD_DAYS = parseInt(process.env.SHIPPING_PERIOD_DAYS || '5')
const EXTENSION_MESSAGE_DURATION_HOURS = parseInt(process.env.EXTENSION_MESSAGE_DURATION_HOURS || '24')

// Store the deadline in a JSON file (in production, use a database)
const DEADLINE_FILE = path.join(process.cwd(), '.shipping-deadline.json')

interface DeadlineData {
  currentDeadline: string
  lastExtended: string
  isExtended: boolean
  extensionExpiresAt?: string
}

async function getDeadlineData(): Promise<DeadlineData | null> {
  try {
    const data = await fs.readFile(DEADLINE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

async function saveDeadlineData(data: DeadlineData): Promise<void> {
  await fs.writeFile(DEADLINE_FILE, JSON.stringify(data, null, 2))
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function formatDeadlineDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

export async function GET() {
  try {
    let deadlineData = await getDeadlineData()
    const now = new Date()
    
    // Check if we need to reset the extension flag
    if (deadlineData?.extensionExpiresAt && new Date(deadlineData.extensionExpiresAt) <= now) {
      deadlineData.isExtended = false
      deadlineData.extensionExpiresAt = undefined
      await saveDeadlineData(deadlineData)
    }
    
    // If no deadline exists or the current deadline has passed
    if (!deadlineData || new Date(deadlineData.currentDeadline) <= now) {
      const newDeadline = addDays(now, SHIPPING_PERIOD_DAYS)
      // Mark as extended if we had a previous deadline that expired
      const isExtended = deadlineData !== null && new Date(deadlineData.currentDeadline) <= now
      
      deadlineData = {
        currentDeadline: newDeadline.toISOString(),
        lastExtended: now.toISOString(),
        isExtended,
        // Extension message expires after configured hours
        extensionExpiresAt: isExtended 
          ? new Date(now.getTime() + EXTENSION_MESSAGE_DURATION_HOURS * 60 * 60 * 1000).toISOString() 
          : undefined
      }
      
      await saveDeadlineData(deadlineData)
    }
    
    // Calculate time remaining
    const deadline = new Date(deadlineData.currentDeadline)
    const timeRemaining = deadline.getTime() - now.getTime()
    const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24))
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    return NextResponse.json({
      deadline: deadlineData.currentDeadline,
      formattedDeadline: formatDeadlineDate(deadline),
      daysRemaining,
      hoursRemaining,
      isExtended: deadlineData.isExtended,
      lastExtended: deadlineData.lastExtended
    })
  } catch (error) {
    console.error('Error managing shipping deadline:', error)
    return NextResponse.json(
      { error: 'Failed to get shipping deadline' },
      { status: 500 }
    )
  }
}