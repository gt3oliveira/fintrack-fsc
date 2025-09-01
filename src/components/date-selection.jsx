import { useQueryClient } from '@tanstack/react-query'
import { addMonths, isValid } from 'date-fns'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

import { DatePickerWithRange } from './ui/date-picker-with-range'

const formatDateQueryParam = (date) => format(date, 'yyyy-MM-dd')

const getInitialDateState = (searchParams) => {
  const defaultDates = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  }
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  if (!from || !to) {
    return defaultDates
  }
  const datesInvalid = !isValid(new Date(from)) || !isValid(new Date(to))
  if (datesInvalid) {
    return defaultDates
  }

  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  }
}

const DateSelection = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()

  const navigate = useNavigate()
  const [date, setDate] = useState(getInitialDateState(searchParams))

  useEffect(() => {
    // early return
    if (!date?.from || !date?.to) return
    const queryParams = new URLSearchParams()
    const from = formatDateQueryParam(date.from)
    const to = formatDateQueryParam(date.to)
    queryParams.set('from', from)
    queryParams.set('to', to)
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries(['balance', user.id, from, to])
  }, [navigate, date, queryClient, user.id])

  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
