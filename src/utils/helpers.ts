/**
 * Formatte un nombre avec le séparateur français
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('fr-FR')
}

/**
 * Génère un ID unique simple
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11)
}

/**
 * Vérifie si une chaîne n'est ni vide ni uniquement des espaces
 */
export const isNotEmpty = (str: string): boolean => {
  return typeof str === 'string' && str.trim().length > 0
}
