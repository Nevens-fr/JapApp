import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Router from '../app/router'

describe('App', () => {
  it('should render the HomePage by default', () => {
    render(
      <MemoryRouter>
        <Router />
      </MemoryRouter>
    )
    expect(screen.getByText('Accueil temporaire')).toBeTruthy()
  })

  it('should navigate to LearningPathPage', () => {
    render(
      <MemoryRouter initialEntries={['/learning-path']}>
        <Router />
      </MemoryRouter>
    )
    expect(screen.getByText("Parcours d'apprentissage temporaire")).toBeTruthy()
  })

  it('should render the bottom navigation', () => {
    render(
      <MemoryRouter>
        <Router />
      </MemoryRouter>
    )
    expect(screen.getByText('Accueil')).toBeTruthy()
    expect(screen.getByText('Parcours')).toBeTruthy()
    expect(screen.getByText('Révisions')).toBeTruthy()
    expect(screen.getByText('Dico')).toBeTruthy()
    expect(screen.getByText('Stats')).toBeTruthy()
    expect(screen.getByText('Réglages')).toBeTruthy()
  })
})
