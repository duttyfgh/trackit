import { weatherType } from "@/data/day-tracker-data"
import useSWR from "swr"

export type DayEntryView = {
  date: string
  moodLevel: number
  anxietyLevel: number
  temperature: number
  weather: weatherType
  overallLevel: number
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useCurrentDayEntry(email: string) {
  if (!email) {
    throw new Error("useCurrentDayEntry: email is required")
  }

  const { data, error, isValidating } = useSWR<DayEntryView>(
    `/api/day/entry?email=${encodeURIComponent(email)}`,
    fetcher,
  )

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    isValidating,
  }
}