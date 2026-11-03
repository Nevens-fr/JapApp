import { expect, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Nettoyer après chaque test
afterEach(() => {
  cleanup()
})

// Mocks globaux si nécessaire
vi.mock('indexed-db', () => ({
  default: vi.fn(),
}))
