import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import HomePage from '../pages/HomePage'
import LearningPathPage from '../pages/LearningPathPage'
import LessonPage from '../pages/LessonPage'
import ReviewPage from '../pages/ReviewPage'
import DictionaryPage from '../pages/DictionaryPage'
import StatisticsPage from '../pages/StatisticsPage'
import SettingsPage from '../pages/SettingsPage'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="learning-path" element={<LearningPathPage />} />
        <Route path="lesson/:id" element={<LessonPage />} />
        <Route path="reviews" element={<ReviewPage />} />
        <Route path="dictionary" element={<DictionaryPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default Router
