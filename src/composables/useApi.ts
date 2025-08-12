import axios from 'axios'
import { ref, type Ref } from 'vue'

export interface SubjectArea {
  id: number
  subject_area: string
  department_id: number
  photo?: string
  status: number
  is_popular: number
  overview?: string
  why_this?: string
  requirement?: string
  tuition_fee?: string
  created_at: string
  updated_at: string
  subject_area_department?: {
    id: number
    name: string
    status: string
    created_at: string
    updated_at: string
  }
}

export interface FutureCareer {
  id: number
  name: string
  serial_no: number
  course_department_id: number
  subject_area_id?: number
  is_popular: number
  overview?: string
  why_this?: string
  requirement?: string
  salary?: string
  image?: string
  status: number
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
}

export interface ApiResponse<T> {
  rows: PaginatedResponse<T>
}

export function useApi() {
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  const fetchSubjectAreas = async (page: number = 1): Promise<ApiResponse<SubjectArea> | null> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`https://www.ehlcrm.theskyroute.com/api/test/popular-subject-area?page=${page}`)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch subject areas'
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchSubjectAreaById = async (id: number): Promise<SubjectArea | null> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`https://www.ehlcrm.theskyroute.com/api/subject-area-details?id=${id}`)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch subject area details'
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchFutureCareers = async (page: number = 1): Promise<ApiResponse<FutureCareer> | null> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`https://www.ehlcrm.theskyroute.com/api/test/top-future-career?page=${page}`)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch future careers'
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchFutureCareerById = async (id: number): Promise<FutureCareer | null> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`https://www.ehlcrm.theskyroute.com/api/future-career-details?id=${id}`)
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch career details'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchSubjectAreas,
    fetchSubjectAreaById,
    fetchFutureCareers,
    fetchFutureCareerById
  }
}