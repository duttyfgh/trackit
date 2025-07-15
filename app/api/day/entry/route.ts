import { getCurrentDayEntry } from "@/actions/get-current-day-entry"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.json(
      { error: "Missing email parameter" },
      { status: 400 }
    )
  }

  const data = await getCurrentDayEntry(email)
  return NextResponse.json(data)
}