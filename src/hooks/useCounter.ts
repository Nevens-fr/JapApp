import { useState, useCallback } from 'react'

export const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState<number>(initialValue)

  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const decrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])

  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

  return { count, increment, decrement, reset }
}
